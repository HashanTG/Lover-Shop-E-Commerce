import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import CartIndicatorCard from "../../components/shared/CartIndicator/CartIndicatorCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const [menu, setMenu] = useState("home");


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

      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/" onClick={()=> setMenu("home")} className={menu== "home"?"active":""}>Home</Link></li>
          <li><Link to="/products" onClick={()=> setMenu("products")} className={menu== "products"?"active":""} >Product</Link></li>
          <li><Link to="/contactus" onClick={()=> setMenu("contactus")} className={menu== "contactus"?"active":""}>Contact US</Link></li>
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
                    <li><Link to="/account">Account</Link></li>
                    <li><a href="#help-center">Help Center</a></li>
                  </ul>
                </>
              ) : (
                <>
                  <button className="profile-menu-btn" onClick={hadleLogin}>
                    Log In
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
