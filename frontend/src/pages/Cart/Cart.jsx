import React, { useState } from "react";
import "./cart.css"; // Ensure this CSS file reflects the grid-based styling

const Cart = () => {
  // Hardcoded cart and product data

  const initialCart = {
    _id: "cartId",
    userId: "userId",
    items: [
      { productId: "productId1", quantity: 2 }, // Butterfly Chain
      { productId: "productId2", quantity: 1 }, // Customized Mug
      { productId: "productId4", quantity: 1 }, // Leather Wallet
      { productId: "productId5", quantity: 3 }, // Wooden Photo Frame
    ],
  };

  const products = [
    {
      _id: "productId1",
      name: "Butterfly Chain",
      price: 350,
      images: ["butterfly-chain.jpg"],
      variations: [{ type: "Color", options: [{ value: "Black" }] }],
    },
    {
      _id: "productId2",
      name: "Customized Mug",
      price: 500,
      images: ["custom-mug.jpg"],
      variations: [{ type: "Color", options: [{ value: "Red" }] }],
    },
    {
      _id: "productId3",
      name: "Rose Gold Ring",
      price: 1200,
      images: ["rose-gold-ring.jpg"],
      variations: [
        {
          type: "Size",
          options: [{ value: "6" }, { value: "7" }, { value: "8" }],
        },
      ],
    },
    {
      _id: "productId4",
      name: "Leather Wallet",
      price: 800,
      images: ["leather-wallet.jpg"],
      variations: [
        { type: "Color", options: [{ value: "Brown" }, { value: "Black" }] },
      ],
    },
    {
      _id: "productId5",
      name: "Wooden Photo Frame",
      price: 600,
      images: ["wooden-photo-frame.jpg"],
      variations: [
        { type: "Size", options: [{ value: "4x6" }, { value: "5x7" }] },
      ],
    },
    {
      _id: "productId6",
      name: "Personalized Keychain",
      price: 250,
      images: ["personalized-keychain.jpg"],
      variations: [
        {
          type: "Material",
          options: [{ value: "Metal" }, { value: "Plastic" }],
        },
      ],
    },
  ];

  // Local state
  const [cart, setCart] = useState(initialCart);
  const [shipping, setShipping] = useState(0);

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => {
      const product = products.find((p) => p._id === item.productId);
      return total + item.quantity * (product?.price || 0);
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

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.productId !== productId),
    }));
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
            <div className="grid-headings">price</div>
            <div className="grid-headings">Sub Total</div>
          </div>
          {cart.items.map((item) => {
            const product = products.find((p) => p._id === item.productId);
            return (
              <div className="cart-item" key={item.productId}>
                <div className="cart-item-info">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4>{product.name}</h4>
                    <p>Color: {product.variations[0].options[0].value}</p>
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
                  Rs.{product.price.toFixed(2)}
                </div>

                <div className="cart-item-price">
                  Rs. {(product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
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
              <span className="price">Rs.0.00</span>

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
                <span >Express shipping</span>
              </span>

              <span className="price">+Rs.245.00</span>
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
              <span className="price">+Rs.21.00</span>
            </label>
          </div>
          <div className="summary-totals">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>Rs.{subtotal.toFixed(2)}</span>
            </div>
            <div className="total">
              <span>Total:</span>
              <span>Rs.{total.toFixed(2)}</span>
            </div>
          </div>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
