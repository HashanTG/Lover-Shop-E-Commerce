import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/orderService";
import "./OrderCard.css";

// Separate constants for better maintainability
const ORDER_STATUSES = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};

const ITEMS_PER_PAGE = 5;

// Extracted to a separate component for better organization
const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;
  
  const { 
    id, 
    userId, 
    items, 
    total, 
    status, 
    paymentDetails, 
    paymentStatus, 
    receiveDetail, // Fixed typo from "recieveDetail" 
    shippingAddress 
  } = order;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> {id}</p>
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>Products:</strong></p>
        <ul className="order-items-list">
          {items.map((item, index) => (
            <li key={index}>
              Product ID: {item.productId}, Quantity: {item.quantity}, Price: Rs {item.price.toLocaleString()}
            </li>
          ))}
        </ul>
        <p><strong>Total:</strong> Rs {total.toLocaleString()}</p>
        <p><strong>Status:</strong> <span className={`status-badge ${status.toLowerCase()}`}>{status}</span></p>
        <p><strong>Payment Method:</strong> {paymentDetails?.paymentMethod || "N/A"}</p>
        <p><strong>Payment Status:</strong> {paymentStatus}</p>
        <p><strong>Receiver:</strong> {receiveDetail?.receiverFirstName} {receiveDetail?.receiverLastName}</p>
        <p><strong>Shipping Address:</strong></p>
        <p className="address-details">
          {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state}, 
          {shippingAddress.zipCode}, {shippingAddress.country}
        </p>
        <p><strong>Phone:</strong> {shippingAddress.phone}</p>
        <button className="close-modal-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const OrderRow = ({ order, handleStatusChange, setSelectedOrder }) => {
  const { 
    id, 
    items, 
    total, 
    paymentStatus, 
    paymentDetails, 
    status 
  } = order;

  return (
    <div className="ocard-row">
      <div className="ocard-cell ocard-id">{id}</div>
      <div className="ocard-cell ocard-items">
        {items.map((item, index) => (
          <div key={index} className="ocard-item">
            <span className="product-id">{item.productId}</span> 
            <span className="product-details">({item.quantity} × Rs {item.price.toLocaleString()})</span>
          </div>
        ))}
      </div>
      <div className="ocard-cell ocard-total">Rs {total.toLocaleString()}</div>
      <div className="ocard-cell ocard-payment">
        <div>{paymentDetails?.paymentMethod || "N/A"}</div>
        <span className={`payment-status ${paymentStatus.toLowerCase()}`}>
          {paymentStatus}
        </span>
      </div>
      <div className="ocard-cell ocard-status">
        <select
          className={`ocard-status-dropdown status-${status.toLowerCase()}`}
          value={status}
          onChange={(e) => handleStatusChange(id, e.target.value)}
        >
          {Object.values(ORDER_STATUSES).map(statusOption => (
            <option key={statusOption} value={statusOption}>{statusOption}</option>
          ))}
        </select>
      </div>
      <div className="ocard-cell ocard-actions">
        <button className="view-details-btn" onClick={() => setSelectedOrder(order)}>
          View
        </button>
      </div>
    </div>
  );
};

const EmptyOrdersRow = () => (
  <div className="ocard-row no-orders">
    <div className="ocard-cell empty-message" colSpan="6">No orders found</div>
  </div>
);

const PaginationControls = ({ currentPage, totalPages, onPrevious, onNext }) => (
  <div className="ocard-pagination-controls">
    <button 
      onClick={onPrevious} 
      disabled={currentPage === 0} 
      className="ocard-pagination-btn prev-btn"
    >
      Previous
    </button>
    <span className="page-indicator">Page {currentPage + 1} of {Math.max(1, totalPages)}</span>
    <button 
      onClick={onNext} 
      disabled={currentPage + 1 >= totalPages} 
      className="ocard-pagination-btn next-btn"
    >
      Next
    </button>
  </div>
);

const OrderCard = () => {
  const [orders, setOrders] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders(currPage);
  }, [currPage]);

  const fetchOrders = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllOrders(page, ITEMS_PER_PAGE);
      setOrders(response.content || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again later.");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await updateOrderStatus(orderId, newStatus);
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        
        // Update the selected order if it's the one being modified
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const handlePrevPage = () => {
    if (currPage > 0) setCurrPage(currPage - 1);
  };

  const handleNextPage = () => {
    if (currPage < totalPages - 1) setCurrPage(currPage + 1);
  };

  const handleRefresh = () => {
    fetchOrders(currPage);
  };

  return (
    <div className="ocard-dashboard">
      <main className="ocard-main-content">
        <div className="ocard-orders-section">
          <div className="ocard-header">
            <div className="ocard-title-area">
              <h3>Orders</h3>
              <button className="refresh-btn" onClick={handleRefresh} disabled={isLoading}>
                {isLoading ? "Loading..." : "Refresh"}
              </button>
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="ocard-orders-list">
            <div className="ocard-row header-row">
              <div className="ocard-cell">Order ID</div>
              <div className="ocard-cell">Products</div>
              <div className="ocard-cell">Total</div>
              <div className="ocard-cell">Payment Info</div>
              <div className="ocard-cell">Status</div>
              <div className="ocard-cell">Actions</div>
            </div>
            
            {isLoading ? (
              <div className="loading-indicator">Loading orders...</div>
            ) : orders.length > 0 ? (
              orders.map((order, index) => (
                <OrderRow 
                  key={order.id || index} 
                  order={order} 
                  handleStatusChange={handleStatusChange} 
                  setSelectedOrder={setSelectedOrder}
                />
              ))
            ) : (
              <EmptyOrdersRow />
            )}
          </div>

          <PaginationControls
            currentPage={currPage}
            totalPages={totalPages}
            onPrevious={handlePrevPage}
            onNext={handleNextPage}
          />
        </div>
      </main>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default OrderCard;