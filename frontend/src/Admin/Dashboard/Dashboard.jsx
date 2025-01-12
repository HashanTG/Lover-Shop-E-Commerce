import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Row = ({ order }) => {
  return (
    <div className="table-row">
      <div>{order.id}</div>
      <div>{order.product}</div>
      <div>{order.customer}</div>
      <div>{order.total}</div>
      <div>{order.payment}</div>
      <div className={`status ${order.status.toLowerCase()}`}>{order.status}</div>
    </div>
  );
};

const Dashboard = () => {
  const orders = [
    {
      id: "#302012",
      product: "Handmade Pouch",
      customer: "John Bushmill",
      total: "Rs 121.00",
      payment: "Mastercard",
      status: "Processing",
    },
    {
      id: "#302011",
      product: "Smartwatch E2",
      customer: "Ilham Budi A",
      total: "Rs 590.00",
      payment: "Visa",
      status: "Processing",
    },
    {
      id: "#302002",
      product: "Smartwatch E1",
      customer: "Mohammad Karim",
      total: "Rs 125.00",
      payment: "Transfer",
      status: "Shipped",
    },
    // Add more rows as needed
  ];

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
            {orders.map((order, index) => (
              <Row key={index} order={order} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
