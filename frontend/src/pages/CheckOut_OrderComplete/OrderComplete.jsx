import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderProgress from "../../components/OrderProgress/OrderProgress";
import "./OrderComplete.css";

const OrderComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve order data from navigation state or local storage
  const [orderData, setOrderData] = useState(
    location.state?.orderData || JSON.parse(sessionStorage.getItem("orderData"))
  );

  // Save to local storage if coming from navigate (to persist on refresh)
  useEffect(() => {
    if (location.state?.orderData) {
      sessionStorage.setItem("orderData", JSON.stringify(location.state.orderData));
    }
  }, [location.state]);

  // Redirect if no order data found
  useEffect(() => {
    if (!orderData) {
      navigate("/cart"); // Redirect back to cart if no order data available
    }
  }, [orderData, navigate]);

  if (!orderData) return null; // Prevent rendering if no order data

  return (
    <div className="order-complete-wrapper">
      <OrderProgress step={3} />
      <div className="order-card">
        <div className="order-header">
          <h2>Thank you, {orderData.recieveDetail.recieverFirstName}! 🎉</h2>
          <h3>Your order has been received</h3>
        </div>

        <div className="order-details">
          <div className="detail-row">
            <span className="label">Order code:</span>
            <span className="value">#{orderData.id}</span>
          </div>
          <div className="detail-row">
            <span className="label">Date:</span>
            <span className="value">{new Date(orderData.createdAt).toDateString()}</span>
          </div>
          <div className="detail-row">
            <span className="label">Total:</span>
            <span className="value">Rs. {orderData.total.toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span className="label">Payment method:</span>
            <span className="value">
              {orderData.paymentDetails.paymentMethod === "cod" ? "Cash on Delivery" : "Credit Card"}
            </span>
          </div>
          {orderData.paymentDetails.paymentMethod === "credit_card" && (
            <div className="detail-row">
              <span className="label">Card Last 4 Digits:</span>
              <span className="value">**** **** **** {orderData.paymentDetails.cardLast4Digits}</span>
            </div>
          )}
        </div>

        <div className="shipping-info">
          <h3>Shipping Information</h3>
          <div className="detail-row">
            <span className="label">Address:</span>
            <span className="value">{orderData.shippingAddress.address}, {orderData.shippingAddress.city}</span>
          </div>
          <div className="detail-row">
            <span className="label">Country:</span>
            <span className="value">{orderData.shippingAddress.country.toUpperCase()}</span>
          </div>
          <div className="detail-row">
            <span className="label">Phone:</span>
            <span className="value">{orderData.shippingAddress.phone}</span>
          </div>
        </div>

        <button className="history-button" onClick={() => navigate("/")}>
          OK
        </button>
      </div>
    </div>
  );
};

export default OrderComplete;
