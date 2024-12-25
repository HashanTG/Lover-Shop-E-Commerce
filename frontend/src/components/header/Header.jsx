import React, { useState } from "react";
import "./header.css";
import CartIndicatorCard from "../../components/shared/CartIndicator/CartIndicatorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [shopDropdown, setShopDropdown] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuVisible(!profileMenuVisible);
  };

  return (
    <header className="header">
      <div className="nav-logo">
        <span>ROSA LOVER</span>
        <img src="https://via.placeholder.com/150" alt="Rosa Lover" />
      </div>
      <nav className="nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li
            className="dropdown"
            onMouseEnter={() => setShopDropdown(true)}
            onMouseLeave={() => setShopDropdown(false)}
          >
            <a href="#shop">Shop <span>&#9662;</span></a>
            {shopDropdown && (
              <ul className="dropdown-menu">
                <li><a href="#shop-category1">Category 1</a></li>
                <li><a href="#shop-category2">Category 2</a></li>
                <li><a href="#shop-category3">Category 3</a></li>
              </ul>
            )}
          </li>
          <li
            className="dropdown"
            onMouseEnter={() => setProductDropdown(true)}
            onMouseLeave={() => setProductDropdown(false)}
          >
            <a href="#product">Product <span>&#9662;</span></a>
            {productDropdown && (
              <ul className="dropdown-menu">
                <li><a href="/products/teddy">Teddy</a></li>
                <li><a href="/products/jewelry">Jewelry</a></li>
                <li><a href="/products/flowers">Flowers</a></li>
              </ul>
            )}
          </li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </nav>
      <div className="icons">
        <a href="#search" className="icon">
          <FontAwesomeIcon icon={faSearch} />
        </a>
        <div className="icon user-icon" onClick={toggleProfileMenu}>
          <FontAwesomeIcon icon={faUserCircle} />
          {profileMenuVisible && (
            <div className="profile-menu">
              <button className="profile-menu-btn">Sign In</button>
              <button className="profile-menu-btn">Register</button>
              <hr />
              <ul>
                <li><a href="#my-orders">My Orders</a></li>
                <li><a href="#wishlist">Wish List</a></li>
                <li><a href="#settings">Settings</a></li>
                <li><a href="#help-center">Help Center</a></li>
              </ul>
            </div>
          )}
        </div>
        <CartIndicatorCard />
      </div>
    </header>
  );
};

export default Header;
