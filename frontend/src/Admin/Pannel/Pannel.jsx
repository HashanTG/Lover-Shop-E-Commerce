import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Products/ProductList";
import ReviewsList from "../Review/ReviewList";
import "./Pannel.css";
import OrderCard from "../Order/OrderCard";

function Pannel() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const handleNavClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="pannel-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Main Menu</h2>
        <nav>
          <ul>
            <li onClick={() => handleNavClick("Dashboard")}>Dashboard</li>

            <li onClick={() => handleNavClick("Product List")} className="has-submenu">
              Product
            </li>
  

            <li onClick={() => handleNavClick("Orders")}>Orders</li>
            <li onClick={() => handleNavClick("Review")}>Review</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeComponent === "Dashboard" && <Dashboard />}
        {activeComponent === "Product List" && <Product />}
        {activeComponent === "Orders" && <OrderCard />}
        {activeComponent === "Review" && <ReviewsList />}
        
      </main>
    </div>
  );
}

export default Pannel;
