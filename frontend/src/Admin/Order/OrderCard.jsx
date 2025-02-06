import React, { useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/orderService";
import './OrderCard.css'

const OrderRow = ({ order, handleStatusChange }) => {
  const { id, items, total, paymentStatus, shippingAddress, paymentDetails, recieveDetail, status } = order;

  const itemList = items.map((item, index) => (
    <div key={index} className="ocard-item">
      <div>{item.productId}</div>
      <div>{item.quantity}</div>
      <div>Rs {item.price}</div>
    </div>
  ));

  return (
    <div className="ocard-row">
      <div className="ocard-cell">{id}</div>
      <div className="ocard-cell">{itemList}</div>
      <div className="ocard-cell">{total}</div>
      <div className="ocard-cell ocard-payment-status">{paymentStatus}</div>
      <div className="ocard-cell">
        <select
          className="ocard-status-dropdown"
          value={status}
          onChange={(e) => handleStatusChange(id, e.target.value)}
        >
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
      <div className="ocard-cell ocard-shipping-info">
        <div><span>City: </span>{shippingAddress.city}</div>
        <div><span>State: </span>{shippingAddress.state}</div>
        <div><span>Receiver: </span>{`${recieveDetail.recieverFirstName} ${recieveDetail.recieverLastName}`}</div>
        <div><span>Payment Method: </span>{paymentDetails.paymentMethod}</div>
      </div>
    </div>
  );
};

const OrderCard = () => {
  const [orders, setOrders] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchOrders(currPage);
  }, [currPage]);

  const fetchOrders = async (page) => {
    try {
      const response = await getAllOrders(page, 5);  // Fetch 5 orders per page
      setOrders(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
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
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handlePrevPage = () => {
    if (currPage > 0) setCurrPage(currPage - 1);
  };

  const handleNextPage = () => {
    if (currPage < totalPages - 1) setCurrPage(currPage + 1);
  };

  return (
    <div className="ocard-dashboard">
      <main className="ocard-main-content">
        <div className="ocard-orders-section">
          <div className="ocard-header">
            <h3>Orders</h3>
            <span>{`Page ${currPage + 1} of ${totalPages}`}</span>
          </div>
          <div className="ocard-orders-list">
            <div className="ocard-row header-row">
              <div className="ocard-cell">Order ID</div>
              <div className="ocard-cell">Items</div>
              <div className="ocard-cell">Total</div>
              <div className="ocard-cell">Payment Status</div>
              <div className="ocard-cell">Status</div>
              <div className="ocard-cell">Shipping Info</div>
            </div>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <OrderRow key={index} order={order} handleStatusChange={handleStatusChange} />
              ))
            ) : (
              <div className="ocard-row no-orders">
                <div className="ocard-cell" colSpan="6">No orders found</div>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="ocard-pagination-controls">
            <button onClick={handlePrevPage} disabled={currPage === 0} className="ocard-pagination-btn">
              Previous
            </button>
            <button onClick={handleNextPage} disabled={currPage + 1 >= totalPages} className="ocard-pagination-btn">
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderCard;
