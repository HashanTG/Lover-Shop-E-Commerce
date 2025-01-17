import React, { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Product from "../Products/ProductList";
import "./Pannel.css";
import OrderCard from "../Order/OrderCard";

function Pannel() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleNavClick = (component) => {
    setActiveComponent(component);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="pannel-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Main Menu</h2>
        <nav>
          <ul>
            <li onClick={() => handleNavClick("Dashboard")}>Dashboard</li>

            <li onClick={toggleDropdown} className="has-submenu">
              Product
            </li>
            {isDropdownVisible && (
                <ul className="sub-menu">
                  <li onClick={() => handleNavClick("Product List")}>
                    Product List
                  </li>
                  <li onClick={() => handleNavClick("Categories")}>Categories</li>
                </ul>
              )}

            <li onClick={() => handleNavClick("Orders")}>Orders</li>
            <li onClick={() => handleNavClick("Customers")}>Customers</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeComponent === "Dashboard" && <Dashboard />}
        {activeComponent === "Product List" && <Product />}
        {activeComponent === "Orders" && <OrderCard />}
        
      </main>
    </div>
  );
}

export default Pannel;
