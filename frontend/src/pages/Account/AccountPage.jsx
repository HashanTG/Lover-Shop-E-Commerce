import React, { useState } from "react";
import UserDetails from "./UserDetails";
import Addresses from "./Addresses";
import Orders from "./Orders";
import Wishlist from "./Wishlist";
import CardTab from "./CardTab";
import "./AccountPage.css";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("details");

  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return <UserDetails />;
      case "addresses":
        return <Addresses />;
      case "orders":
        return <Orders />;
      case "Cards":
        return <CardTab />;
      case "wishlist":
        return <Wishlist />;
      default:
        return <UserDetails />;
    }
  };

  return (
    <div className="account-container">
      <h1 className="name">My Account</h1>
      <div className="account-content">
        <div className="tabs">
          <button
            className={activeTab === "details" ? "active" : ""}
            onClick={() => setActiveTab("details")}
          >
            Account
          </button>
          <button
            className={activeTab === "addresses" ? "active" : ""}
            onClick={() => setActiveTab("addresses")}
          >
            Addresses
          </button>
          <button
            className={activeTab === "Cards" ? "active" : ""}
            onClick={() => setActiveTab("Cards")}
          >
            Cards
          </button>
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={activeTab === "wishlist" ? "active" : ""}
            onClick={() => setActiveTab("wishlist")}
          >
            Wishlist
          </button>
        </div>
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AccountPage;
