import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useAlert } from "../../context/GlobalAlertContext";
import OrderProgress from "../../components/OrderProgress/OrderProgress";
import Spinner from "../../components/Spinner/Spinner";
import "./cart.css"; // Ensure this CSS file reflects the grid-based styling

const Cart = () => {
  // Local state for cart and shipping
  const [cart, setCart] = useState({ items: [] });
  const [shipping, setShipping] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  //Context states
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
  const { showAlert } = useAlert();
  //Navigate Object
  const navigate = useNavigate();

  //Loading States for removing 
  const [removingItemId, setRemovingItemId] = useState(null);


  // Effect to update local state when cartItems from CartContext change
  useEffect(() => {
    setCart({ items: cartItems });
  }, [cartItems]);

  
  //Calculate Part
  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart?.items.reduce((total, item) => {
      return total + item.quantity * (item.productDetails.price || 0);
    }, 0);
  };

  const handleShippingChange = (cost) => {
    setShipping(cost);
  };


  useEffect(() => {
    const newSubtotal = calculateSubtotal(cart); // Recalculate subtotal
    setSubtotal(newSubtotal);

    // Recalculate total (e.g., subtotal + shipping/taxes)
    setTotal(newSubtotal + shipping);
  }, [cart, calculateSubtotal]); // Dependencies




  
//Handling the Quantity Change
// Handling Quantity Change with API Call and Loading State
const handleQuantityChange = async (productId, delta,variation) => {
  setCart((prevCart) => {
    const updatedItems = prevCart.items.map((item) =>
      item.productId === productId
        ? { ...item, loading: true, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    return { ...prevCart, items: updatedItems };
  });

  try {
    await addToCart(productId, delta,variation);
  } catch (error) {
    console.error("Failed to update cart:", error);
    showAlert("Failed to update item quantity.");
  }

  // Update UI after API call
  setCart((prevCart) => {
    const updatedItems = prevCart.items.map((item) =>
      item.productId === productId
        ? { ...item, loading: false } // Remove loading state
        : item
    );
    return { ...prevCart, items: updatedItems };
  });
};


  //Removing a Item from a Cart
  const handleRemoveItem = async (removeKey,productId,variation) => {

    setRemovingItemId(removeKey);
    try {
      const result = await removeFromCart(productId,variation); //Use Context function to remove
      if (result.success) {
        showAlert("Item Removed Successfully");
      }
    } catch (error) {
      console.error("Failed to remove item from cart", error);
      showAlert("An error occurred while removing the item from the cart.");
    }
    finally{
      setRemovingItemId(null);
    }
  };

  //Proceed to Payment Step

  const proceedToPay = () => {
    
    if(cart.items.length == 0 ){
      showAlert("No Items In the Cart");
      return;
    }

    const fee = {
      shipping: shipping,
      subtotal: subtotal,
      total: total,
    };
    // Save the fee details in localStorage
    localStorage.setItem("feeDetails", JSON.stringify(fee));
    // Navigate to the checkout page
    navigate("/checkout");
  };


  return (
    <div className="cart-container">
      {/* Progress Bar */}
      <OrderProgress step={1} />

      <div className="grid-wrapper">
        {/* Cart Section */}
        <div className="cart-grid">
          {/* Cart Items */}
          <div className="cart-item">
            <div className="grid-headings">Product</div>
            <div className="grid-headings">Quantity</div>
            <div className="grid-headings">Unit Price</div>
            <div className="grid-headings">Sub Total</div>
          </div>
          {cart.items.length > 0 ? (
  cart.items.map((item,index) => {


    return (
      <div className="cart-item" key={index}>
        {/* Item Info */}
        <div className="cart-item-info">
          <img
            src={item.productDetails.images[0]}
            alt={item.productDetails.name}
            className="cart-item-image"
          />
          <div className="cart-item-details">
            <h4>{item.productDetails.name}</h4>
            <p>Category: {item.productDetails.category}</p>
            <p>
  Variation:{" "}
  {item.variation && Object.keys(item.variation).length > 0 
    ? Object.entries(item.variation)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')
    : 'N/A'}
</p>
            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(index,item.productId, item.variation)}
              disabled={removingItemId === index} 
            >
              {removingItemId === index ? (
                <Spinner size="14px" />
              ) : (
                "Remove"
              )}
            </button>
          </div>
        </div>

        {/* Quantity Actions */}
        <div className="cart-item-actions">
          <div className="cart-item-quantity">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.productId, -1, item.variation)}
              disabled={item.loading || item.quantity === 1}
            >
              {item.loading && item.changeType === -1 ? (
                <Spinner size="14px" />
              ) : (
                "-"
              )}
            </button>
            <span>{item.quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.productId, 1, item.variation)}
              disabled={item.loading}
            >
              {item.loading && item.changeType === 1 ? (
                <Spinner size="14px" />
              ) : (
                "+"
              )}
            </button>
          </div>
        </div>

        {/* Item Price */}
        <div className="cart-item-price">
          <span>Unit Price: Rs. {item.productDetails.price.toFixed(2)}</span>
        </div>
        <div className="cart-item-price">
          <span>
            Total: Rs. {(item.productDetails.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    );
  })
) : (
  <p className="empty-cart-message">No items in the cart.</p>
)}

        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Cart summary</h3>
          <div className="shipping-options">
            <label>
              <span className="shipping-options-inside">
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 0}
                  onChange={() => handleShippingChange(0)}
                  className="shipping-radio"
                />
                <span >Free shipping</span>
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
          <button className="checkout-btn" onClick={() => proceedToPay()}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
