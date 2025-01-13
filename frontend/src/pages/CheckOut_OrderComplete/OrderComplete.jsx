import React from 'react';
import './OrderComplete.css';

const OrderComplete = () => {
  return (
    <div className="order-complete-wrapper">
      <div className="order-card">
        <div className="order-header">
          <h2>Thank you! 🎉</h2>
          <h3>Your order has been received</h3>
        </div>

        <div className="order-details">
          <div className="detail-row">
            <span className="label">Order code:</span>
            <span className="value">#0123_45678</span>
          </div>
          <div className="detail-row">
            <span className="label">Date:</span>
            <span className="value">October 19, 2023</span>
          </div>
          <div className="detail-row">
            <span className="label">Total:</span>
            <span className="value">Rs.6945.00</span>
          </div>
          <div className="detail-row">
            <span className="label">Payment method:</span>
            <span className="value">Credit Card</span>
          </div>
        </div>

        <button className="history-button">
          Purchase history
        </button>
      </div>
    </div>
  );
};

export default OrderComplete;
