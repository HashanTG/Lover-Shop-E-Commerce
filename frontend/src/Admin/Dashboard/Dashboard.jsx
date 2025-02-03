import { React, useState, useEffect } from "react";
import { getAllOrders,updateOrderStatus} from "../../api/orderService";
import "./Dashboard.css";

const Row = ({ order, handleStatusChange }) => {
  const { id, items, total, paymentStatus, shippingAddress, paymentDetails, recieveDetail, status } = order;

  // Format item list
  const itemList = items.map((item, index) => (
    <div key={index} className="order-item">
      <div>{item.productId}</div>
      <div>{item.quantity}</div>
      <div>Rs {item.price}</div>
    </div>
  ));

  return (
    <tr className="table-row">
      <td>{id}</td>
      <td>{itemList}</td>
      <td>{total}</td>
      <td>{paymentStatus}</td>
      <td>
        {/* Status dropdown */}
        <select 
          value={status}
          onChange={(e) => handleStatusChange(id, e.target.value)} // Trigger function when status changes
        >
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </td>
      <td>{shippingAddress.city}, {shippingAddress.state}</td>
      <td>{paymentDetails.paymentMethod}</td>
      <td>{paymentDetails.cardLast4Digits}</td>
      <td>{recieveDetail.recieverFirstName} {recieveDetail.recieverLastName}</td>
    </tr>
  );
};

const Dashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        console.log(response.data);  // Log the API response to check structure
        if (response.content && Array.isArray(response.content)) {
          setOrders(response.content);  // Ensure it's an array
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {

    console.log(`Order ID: ${orderId} - Status changed to: ${newStatus}`);
    
    try {
      const response = await updateOrderStatus(orderId, newStatus);
      console.log(response);  // Log the API response to check structure
      if (response.status === 200) {
        
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    }
    catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <main className="main-content">
        {/* Summary Row */}
        <div className="summary-row">
          <div className="card">
            <h3>Total Revenue</h3>
            <p>Rs 75,500</p>
            <span>+10%</span>
          </div>
          <div className="card">
            <h3>Total Sales</h3>
            <p>5300</p>
            <span>+15%</span>
          </div>
          <div className="card">
            <h3>Product SKU</h3>
            <p>247</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="orders-section">
          <div className="orders-header">
            <h3>Recent Orders</h3>
            <span>+2 Orders</span>
          </div>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment Status</th>
                  <th>Status</th>
                  <th>Shipping Address</th>
                  <th>Payment Method</th>
                  <th>Card Last 4</th>
                  <th>Receiver</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.length > 0 ? (
                  orders.map((order, index) => (
                    <Row key={index} order={order} handleStatusChange={handleStatusChange} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
