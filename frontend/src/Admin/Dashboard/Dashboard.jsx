import {React,useState,useEffect} from "react";
import axios from "axios";
import "./Dashboard.css";

const Row = ({ order }) => {
  console.log(order.id);
  return (
    <div className="table-row">
      <div>{order.id}</div>
      <div>{order.product}</div>
      <div>{order.customer}</div>
      <div>{order.total}</div>
      <div>{order.payment}</div>
      <div className={`status ${order.status.toLowerCase()}`}>
        {order.status}
      </div>
    </div>
  );
};

const Dashboard = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/orders", {
          withCredentials: true,
        });
        console.log(response.data);  // Log the API response to check structure
        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);  // Ensure it's an array
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);

  

  return (
    <div className="dashboard-container">
      {/* Main Content */}
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

        {/* Recent Orders */}
        <div className="orders-section">
          <div className="orders-header">
            <h3>Recent Orders</h3>
            <span>+2 Orders</span>
          </div>
          <div className="orders-table">
            <div className="table-header">
              <div>Order ID</div>
              <div>Product</div>
              <div>Customer</div>
              <div>Total</div>
              <div>Payment</div>
              <div>Status</div>
            </div>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => <Row key={index} order={order} />)
            ) : (
              <div>No orders found</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
