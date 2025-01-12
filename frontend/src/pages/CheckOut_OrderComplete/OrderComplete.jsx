import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderComplete.css';

const OrderComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData } = location.state || {};

  return (
    <div className="order-complete-container">
      <div className="checkout-progress">
        <div className="step completed">Shopping cart</div>
        <div className="step completed">Checkout details</div>
        <div className="step active">Order complete</div>
      </div>

      <div className="order-confirmation">
        <h2>Thank you! 🎉</h2>
        <h3>Your order has been received</h3>

        <div className="order-info">
          <div className="order-items">
            {orderData?.items.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.image} alt={item.name} />
                <span className="item-quantity">{item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="order-details">
            <div className="detail-row">
              <span>Order total:</span>
              <span>Rs. {orderData?.totalAmount}</span>
            </div>
            <div className="detail-row">
              <span>Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="detail-row">
              <span>Payment method:</span>
              <span>{orderData?.paymentMethod}</span>
            </div>
          </div>

          <button 
            className="purchase-history-btn"
            onClick={() => navigate('/purchase-history')}
          >
            Purchase history
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
