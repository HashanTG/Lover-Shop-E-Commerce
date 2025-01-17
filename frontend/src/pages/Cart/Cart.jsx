import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import "./cart.css"; // Ensure this CSS file reflects the grid-based styling

const Cart = () => {
  // Local state for cart and shipping
  const [cart, setCart] = useState({ items: [] });
  const [shipping, setShipping] = useState(0);
  const { cartItems, removeFromCart, fetchCart } = useContext(CartContext);


  // Consume CartContext to get the cartItems


  // Effect to update local state when cartItems from CartContext change
  useEffect(() => {
    setCart({ items: cartItems });
  }, [cartItems]);

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * (item.productDetails.price || 0);
    }, 0);
  };

  const handleQuantityChange = (productId, delta) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
      return { ...prevCart, items: updatedItems };
    });
  };

  const handleRemoveItem = async (productId) => {
    try {
      const result = await removeFromCart(productId);
      if (!result.success) {
        alert(result.message);
      }
    } catch (error) {
      console.error("Failed to remove item from cart", error);
      alert("An error occurred while removing the item from the cart.");
    }
  };

  const handleShippingChange = (cost) => {
    setShipping(cost);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal + shipping;

  return (
    <div className="cart-container">
      {/* Progress Bar */}
      <div className="cart-progress">
        <div className="step active">1 Shopping cart</div>
        <div className="step">2 Checkout details</div>
        <div className="step">3 Order complete</div>
      </div>

      <div className="grid-wrapper">
        {/* Cart Section */}
        <div className="cart-grid">
          {/* Cart Items */}
          <div className="cart-item">
            <div className="grid-headings">Product</div>
            <div className="grid-headings">Quantity</div>
            <div className="grid-headings">Price</div>
            <div className="grid-headings">Sub Total</div>
          </div>
          {cart.items.map((item) => (
            <div className="cart-item" key={item.productId}>
              <div className="cart-item-info">
                <img
                  src={item.productDetails.images[0]}
                  alt={item.productDetails.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{item.productDetails.name}</h4>
                  <p>Category: {item.productDetails.category}</p>
                  <p>Color: {item.productDetails.variations[0].options[0].value}</p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <div className="cart-item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.productId, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.productId, 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-price">
                Rs. {item.productDetails.price.toFixed(2)}
              </div>

              <div className="cart-item-price">
                Rs. {(item.productDetails.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Cart summary</h3>
          <div className="shipping-options">
            <label>
              <span>
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 0}
                  onChange={() => handleShippingChange(0)}
                  className="shipping-radio"
                />
                <span>Free shipping</span>
              </span>
              <span className="price">Rs. 0.00</span>
            </label>
            <label>
              <span>
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 245}
                  onChange={() => handleShippingChange(245)}
                  className="shipping-radio"
                />
                <span>Express shipping</span>
              </span>
              <span className="price">+Rs. 245.00</span>
            </label>
            <label>
              <span>
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 21}
                  onChange={() => handleShippingChange(21)}
                  className="shipping-radio"
                />
                <span>Pick Up</span>
              </span>
              <span className="price">+Rs. 21.00</span>
            </label>
          </div>
          <div className="summary-totals">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>
            <hr />
            <div className="total">
              <span>Total:</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
          </div>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
