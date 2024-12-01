import React, { useContext, useState } from "react";
import "./cart.css"; // Import your CSS styles

const Cart = () => {
  const [shippingOption, setShippingOption] = useState("free");
  
  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: "Butterfly Chain",
      color: "Black",
      quantity: 2,
      price: 350,
    },
    {
      id: 2,
      name: "Customized Mug",
      color: "Red",
      quantity: 2,
      price: 500,
    },
    {
      id: 3,
      name: "Teddy Bear",
      color: "Gold",
      quantity: 1,
      price: 2500,
    },
  ];

  // Calculate subtotal and total
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = shippingOption === "express" ? 245 : shippingOption === "pickup" ? 21 : 0;
  const total = subtotal + shippingCost;

  // Handle quantity change
  const handleQuantityChange = (id, change) => {
    // Update quantity logic
  };

  // Handle remove item
  const handleRemoveItem = (id) => {
    // Remove item logic
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart-content">
        {/* Cart Items List */}
        <div className="cart-items">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <p>{item.name}</p>
                    <small>Color: {item.color}</small>
                  </td>
                  <td>
                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </td>
                  <td>Rs. {item.price}</td>
                  <td>Rs. {item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <div className="shipping-options">
            <label>
              <input
                type="radio"
                value="free"
                checked={shippingOption === "free"}
                onChange={() => setShippingOption("free")}
              />
              Free shipping (Rs. 0)
            </label>
            <label>
              <input
                type="radio"
                value="express"
                checked={shippingOption === "express"}
                onChange={() => setShippingOption("express")}
              />
              Express shipping (+Rs. 245)
            </label>
            <label>
              <input
                type="radio"
                value="pickup"
                checked={shippingOption === "pickup"}
                onChange={() => setShippingOption("pickup")}
              />
              Pick Up (+Rs. 21)
            </label>
          </div>
          <div className="summary-totals">
            <p>Subtotal: Rs. {subtotal}</p>
            <p>Total: Rs. {total}</p>
          </div>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
