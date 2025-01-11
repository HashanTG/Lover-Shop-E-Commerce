// AccountPage.jsx
import React, { useState } from 'react';
import UserDetails from './UserDetails';
import Addresses from './Addresses';
import Orders from './Orders';
import Wishlist from './Wishlist';
import './AccountPage.css';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('details');

  const renderContent = () => {
    switch (activeTab) {
      case 'details':
        return <UserDetails />;
      case 'addresses':
        return <Addresses />;
      case 'orders':
        return <Orders />;
      case 'wishlist':
        return <Wishlist />;
      default:
        return <UserDetails />;
    }
  };

  return (
    <div className="account-container">
      <h1>My Account</h1>
      <div className="tabs">
        <button 
          className={activeTab === 'details' ? 'active' : ''} 
          onClick={() => setActiveTab('details')}
        >
          Account
        </button>
        <button 
          className={activeTab === 'addresses' ? 'active' : ''} 
          onClick={() => setActiveTab('addresses')}
        >
          Addresses
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''} 
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={activeTab === 'wishlist' ? 'active' : ''} 
          onClick={() => setActiveTab('wishlist')}
        >
          Wishlist
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default AccountPage;
