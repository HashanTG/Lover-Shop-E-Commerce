import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OrderModal from "./OrderModal"; // Make sure the path is correct

import { getOrder } from "../../api/orderService";
import "./Orders.css"; // Add styles for table and pagination

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;

  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await getOrder();
      setOrders(response.content || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
    fetchOrders(); // Fetch updated orders after modal closes
  };

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Created Date</th>
            <th>Status</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td className="order_id">{order.id.slice(0, 10)}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>{order.paymentStatus}</td>
              <td>
                <button onClick={() => handleViewClick(order)}>
                  {order.status === "DELIVERED"
                    ? order?.confirmedByUser
                      ? "REVIEW"
                      : "CONFIRM ORDER"
                    : order.status === "CONFIRMED"
                    ? "REVIEW"
                    : "MORE DETAIL"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {showModal && (
  <OrderModal order={selectedOrder} onClose={handleCloseModal} refreshOrders={fetchOrders} />
)}

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
