import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import "./header.css";
import CartIndicatorCard from "../../components/shared/CartIndicator/CartIndicatorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [shopDropdown, setShopDropdown] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const navigate = useNavigate();

  const profileMenuRef = useRef(null); // Ref for the profile menu
  const { isAuthenticated, login, logout } = useAuth(); // Auth context values

  // Toggle profile menu
  const toggleProfileMenu = () => {
    setProfileMenuVisible((prev) => !prev);
  };

  // Close the profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  const hadleLogin = () => {
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="nav-logo" onClick={handleLogout}>
        <span className="pointer">ROSA <span className="color-lover">LOVER.</span></span>
        {/* <img src="/Adora.png" alt="Rosa Lover"/> */}
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li
            className="dropdown"
            onMouseEnter={() => setShopDropdown(true)}
            onMouseLeave={() => setShopDropdown(false)}
          >
            {/* <a href="#shop">Shop <span>&#9662;</span></a>
            {shopDropdown && (
              <ul className="dropdown-menu">
                <li><a href="#shop-category1">Category 1</a></li>
                <li><a href="#shop-category2">Category 2</a></li>
                <li><a href="#shop-category3">Category 3</a></li>
              </ul>
            )} */}
          </li>
          <li><Link to="/products">Product</Link></li>
          <li><Link to="/contactus">Contact US</Link></li>
        </ul>
      </nav>
      <div className="icons">
      {/* <input type="text" placeholder="Search..." /> */}
        {/* <a href="#search" className="icon">
          <FontAwesomeIcon icon={faSearch} />
        </a> */}
        <div
          className="icon user-icon"
          onClick={toggleProfileMenu}
          ref={profileMenuRef}
        >
          <FontAwesomeIcon icon={faUserCircle} />
          {profileMenuVisible && (
            <div className="profile-menu">
              {isAuthenticated ? (
                <>
                  <button className="profile-menu-btn" onClick={handleLogout}>
                    Log Out
                  </button>
                  <hr />
                  <ul>
                    <li><a href="#my-orders">My Orders</a></li>
                    <li><a href="#wishlist">Wish List</a></li>
                    <li><a href="#settings">Settings</a></li>
                    <li><a href="#help-center">Help Center</a></li>
                  </ul>
                </>
              ) : (
                <>
                  <button className="profile-menu-btn" onClick={hadleLogin}>
                    Log In
                  </button>
                  <button className="profile-menu-btn">
                    <Link to="/register">Register</Link>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <CartIndicatorCard />
      </div>
    </header>
  );
};

export default Header;
