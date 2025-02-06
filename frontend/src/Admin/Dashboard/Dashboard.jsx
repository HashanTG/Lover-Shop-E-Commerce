import { React, useState, useEffect } from "react";
import { getAllOrders, updateOrderStatus } from "../../api/orderService";
import "./Dashboard.css";

const OrderRow = ({ order, handleStatusChange }) => {
  const { id, items, total, paymentStatus, shippingAddress, paymentDetails, recieveDetail, status } = order;

  const itemList = items.map((item, index) => (
    <div key={index} className="order-item-details">
      <div>{item.productId}</div>
      <div>{item.quantity}</div>
      <div>Rs {item.price}</div>
    </div>
  ));

  return (
    <tr className="order-row">
      <td>{id}</td>
      <td>{itemList}</td>
      <td>{total}</td>
      <td className="payment-status">{paymentStatus}</td>
      <td>
        <select className="status-dropdown" value={status} onChange={(e) => handleStatusChange(id, e.target.value)}>
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </td>
      <td className="shipping-receiver-info">
        <div><span>City: </span>{shippingAddress.city}</div>
        <div><span>State: </span>{shippingAddress.state}</div>
        <div><span>Receiver: </span>{`${recieveDetail.recieverFirstName} ${recieveDetail.recieverLastName}`}</div>
        <div><span>Payment Method: </span>{paymentDetails.paymentMethod}</div>
      </td>
    </tr>
  );
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (currentPage = 0) => {
    try {
      const response = await getAllOrders(currentPage, 5, "createdAt", "DESC");
      setOrders(response.content);  // Assuming response contains `content`
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

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

  return (
    <div className="dashboard-wrapper">
      <main className="main-content">
        <div className="orders-container">
          <div className="orders-header">
            <h3>Recent Orders</h3>
          </div>
          <div className="orders-list">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment Status</th>
                  <th>Status</th>
                  <th>Shipping & Receiver Info</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <OrderRow key={index} order={order} handleStatusChange={handleStatusChange} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination-controls">
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
              Previous
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
