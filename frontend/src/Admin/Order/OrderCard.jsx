import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderCard.css";

const OrderCard = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/orders", {
          withCredentials: true,
        });
        console.log(response.data); // Log the API response to check structure
        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data); // Ensure it's an array
          // Initialize `orderStatus` based on fetched orders
          setOrderStatus(
            response.data.map((order) => ({
              id: order.id,
              status: order.status,
              confirm: false,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setOrderStatus((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus, confirm: true } : order
      )
    );
  };

  // Handle confirmation or cancellation of status change
  const handleConfirm = (id, confirm) => {
    if (confirm) {
      console.log(`Order ${id} status confirmed`);
    } else {
      console.log(`Order ${id} status change cancelled`);
    }
    // Reset confirm state after action
    setOrderStatus((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, confirm: false } : order
      )
    );
  };

  return (
    <div>
      <div className="orders">
        <h3>Orders</h3>
        <div className="order-container">
          {orders.length > 0 ? (
            orders.map((order) => {
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
                    <h3>{order.productName || "Unknown Product"}</h3>
                    <p>{order.description || "No description available"}</p>
                    <p>Items: {order.items.length}</p>
                    <p>Method: {order.method || "N/A"}</p>
                    <p>Payment: {order.paymentStatus || "Pending"}</p>
                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="order-actions">
                    <p>₹{order.total.toFixed(2)}</p>
                    <select
                      value={currentStatus?.status || order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="order-dropdown"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    {currentStatus?.confirm && (
                      <div className="status-actions">
                        <button
                          onClick={() => handleConfirm(order.id, true)}
                          className="confirm-btn"
                        >
                          ✅ Confirm
                        </button>
                        <button
                          onClick={() => handleConfirm(order.id, false)}
                          className="cancel-btn"
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No orders found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
