import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/orderService";
import "./Dashboard.css";
import StatCard from "./StatCard";

const OrderStatusBadge = ({ status }) => {
  const statusClasses = {
    PENDING: "status-pending",
    SHIPPED: "status-shipped",
    DELIVERED: "status-delivered",
    CANCELLED: "status-cancelled",
  };

  return (
    <span className={`status-badge ${statusClasses[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalSales, setTotalSales] = useState(0);

  const fetchOrders = async (pageNumber) => {
    setLoading(true);
    try {
      const data = await getAllOrders(pageNumber, 5, "createdAt", "DESC");
      setOrders(data?.content || []);
      setTotalPages(data?.totalPages || 1);
      const sales = data?.content?.reduce((acc, order) => {
        return acc + (order.total || 0);
      }, 0) || 0;
      setTotalSales(sales); // Update total sales state
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // If changing status of the selected order, update it as well
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Wait for animation to complete before clearing the data
    setTimeout(() => setSelectedOrder(null), 300);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div>
      <StatCard totalSales={totalSales} />
      </div>
      <div className="dashboard-header">
        <h2>Recent Orders</h2>
        <div className="dashboard-actions">
          <button className="refresh-button" onClick={() => fetchOrders(page)}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : (
        <div className="order-table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">#{order.id.substring(0, 8)}</td>
                    <td>
                      {order.recieveDetail
                        ? `${order.recieveDetail.recieverFirstName} ${order.recieveDetail.recieverLastName}`
                        : "Unknown Customer"}
                    </td>
                    <td>
                      {order.items && order.items.length > 0
                        ? `${order.items.length} item${
                            order.items.length > 1 ? "s" : ""
                          }`
                        : "No items"}
                    </td>
                    <td className="order-total">
                      ${order.total?.toFixed(2) || "0.00"}
                    </td>
                    <td>
                      {order.paymentDetails ? (
                        <span
                          className={`payment-status payment-${order.paymentStatus?.toLowerCase()}`}
                        >
                          {order.paymentDetails.paymentMethod}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <div className="status-cell">
                        <OrderStatusBadge status={order.status} />
                        <select
                          className="status-dropdown"
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          disabled={
                            order.status === "DELIVERED" ||
                            order.status === "CANCELLED"
                          }
                        >
                          <option value="PENDING">Pending</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <button
                        className="view-button"
                        onClick={() => viewOrderDetails(order)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="empty-row">
                  <td colSpan="7">
                    <div className="empty-state">
                      <span className="empty-icon">📋</span>
                      <p>No orders found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          ← Previous
        </button>
        <div className="pagination-info">
          Page <span className="page-number">{page + 1}</span> of{" "}
          <span className="page-number">{totalPages}</span>
        </div>
        <button
          className="pagination-button"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages - 1 || totalPages === 0}
        >
          Next →
        </button>
      </div>

      {isModalOpen && (
        <div
          className={`modal-overlay ${isModalOpen ? "active" : ""}`}
          onClick={closeModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details</h3>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="order-details-grid">
                <div className="order-summary">
                  <div className="detail-group">
                    <h4>Order Information</h4>
                    <div className="detail-row">
                      <span className="detail-label">Order ID:</span>
                      <span className="detail-value">#{selectedOrder.id}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value">
                        <OrderStatusBadge status={selectedOrder.status} />
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Total:</span>
                      <span className="detail-value order-total">
                        ${selectedOrder.total?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">User ID:</span>
                      <span className="detail-value">
                        {selectedOrder.userId || "Guest"}
                      </span>
                    </div>
                  </div>

                  <div className="detail-group">
                    <h4>Payment Information</h4>
                    <div className="detail-row">
                      <span className="detail-label">Method:</span>
                      <span className="detail-value">
                        {selectedOrder.paymentDetails?.paymentMethod || "N/A"}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Status:</span>
                      <span
                        className={`detail-value payment-status payment-${selectedOrder.paymentStatus?.toLowerCase()}`}
                      >
                        {selectedOrder.paymentStatus || "Unknown"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="customer-info">
                  <div className="detail-group">
                    <h4>Customer Details</h4>
                    <div className="detail-row">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">
                        {selectedOrder.recieveDetail?.recieverFirstName}{" "}
                        {selectedOrder.recieveDetail?.recieverLastName}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">
                        {selectedOrder.shippingAddress?.phone || "Not provided"}
                      </span>
                    </div>
                  </div>

                  <div className="detail-group">
                    <h4>Shipping Address</h4>
                    <div className="address-box">
                      {selectedOrder.shippingAddress ? (
                        <>
                          <p>{selectedOrder.shippingAddress.address}</p>
                          <p>
                            {selectedOrder.shippingAddress.city},{" "}
                            {selectedOrder.shippingAddress.state}{" "}
                            {selectedOrder.shippingAddress.zipCode}
                          </p>
                          <p>{selectedOrder.shippingAddress.country}</p>
                        </>
                      ) : (
                        <p>No address provided</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-items">
                <h4>Ordered Items</h4>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.productId}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price?.toFixed(2)}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="no-items">No items in this order</p>
                )}
              </div>
            </div>

            <div className="modal-footer">
              {selectedOrder.status !== "DELIVERED" &&
                selectedOrder.status !== "CANCELLED" && (
                  <div className="status-actions">
                    <label>Update Status:</label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) =>
                        handleStatusChange(selectedOrder.id, e.target.value)
                      }
                    >
                      <option value="PENDING">Pending</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                )}
              <button
                className="modal-button primary-button"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
