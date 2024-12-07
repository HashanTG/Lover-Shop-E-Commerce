import React from "react";
import "./ShopCollection.css";

const ShopCollection = () => {
  return (
    <div className="shop-collection">
      <h2>Shop Collection</h2>
      <div className="collection-grid">
        {/* Left side: Large item */}
        <div className="collection-item large">
          <img
            src="https://via.placeholder.com/400x400"
            alt="Customized Mug"
            className="collection-image"
          />
          <div className="collection-text">
            <h3>Customized Mug</h3>
            <a href="#mug">Collection →</a>
          </div>
        </div>

        {/* Right side: Two smaller items */}
        <div className="collection-item small">
          {/* Small Content Wrapper */}
          
          <div className="small-container">
            <div className="collection-text">
              <h3>Teddy</h3>
              <a href="#tshirt">Collection →</a>
            </div>
            <img
              src="https://via.placeholder.com/200x200"
              alt="Teddy"
              className="collection-image"
            />
          </div>
          <div className="small-container">
            <div className="collection-text">
              <h3>Teddy</h3>
              <a href="#tshirt">Collection →</a>
            </div>
            <img
              src="https://via.placeholder.com/200x200"
              alt="Teddy"
              className="collection-image"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShopCollection;
