import React, { useState } from "react";
import "./OrderCard.css";

const orders = [
  {
    id: 1,
    productName: "Women Zip-Front Relaxed Fit Jacket x 3 M",
    description: "High-quality jacket, perfect for cold weather.",
    items: 1,
    price: 1532,
    method: "COD",
    payment: "Pending",
    date: "1/7/2025",
    status: "Order Placed",
  },
  {
    id: 2,
    productName: "Men Slim-Fit Jeans x 2 L",
    description: "Comfortable and stylish slim-fit jeans.",
    items: 2,
    price: 2100,
    method: "Online Payment",
    payment: "Completed",
    date: "1/8/2025",
    status: "Processing",
  },
];

const OrderCard = () => {
  const [orderStatus, setOrderStatus] = useState(
    orders.map((order) => ({
      id: order.id,
      status: order.status,
      confirm: false,
    }))
  );

  const handleStatusChange = (id, newStatus) => {
    setOrderStatus((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus, confirm: true } : order
      )
    );
  };

  const handleConfirm = (id, confirm) => {
    setOrderStatus((prev) =>
      prev.map((order) => (order.id === id ? { ...order, confirm } : order))
    );
  };

  return (
    <div>
      <div className="orders">
        <h3>Orders</h3>
        <div className="order-container">
          {orders.map((order) => {
            const currentStatus = orderStatus.find((o) => o.id === order.id);
            return (
              <div key={order.id} className="order-card">
                <div className="order-image">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Product"
                    className="product-image"
                  />
                </div>
                <div className="order-details">
                  <h3>{order.productName}</h3>
                  <p>{order.description}</p>
                  <p>Items: {order.items}</p>
                  <p>Method: {order.method}</p>
                  <p>Payment: {order.payment}</p>
                  <p>Date: {order.date}</p>
                </div>
                <div className="order-actions">
                  <p>₹{order.price}</p>
                  <select
                    value={currentStatus?.status || order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="order-dropdown"
                  >
                    <option>Order Placed</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                  {currentStatus?.confirm && (
                    <div className="status-actions">
                      <button
                        onClick={() => handleConfirm(order.id, false)}
                        className="confirm-btn"
                      >
                        ✅
                      </button>
                      <button
                        onClick={() => handleConfirm(order.id, false)}
                        className="cancel-btn"
                      >
                        ❌
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
