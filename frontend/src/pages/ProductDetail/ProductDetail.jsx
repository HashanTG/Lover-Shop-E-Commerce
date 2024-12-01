import React, { useState } from "react";
import "./ProductDetailComponent.css"; // Add custom styles for this component
import product from "../../assets/ProductDetail/productDetail.png"

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  // Handle quantity increment and decrement
  const handleQuantityChange = (type) => {
    if (type === "increment") setQuantity(quantity + 1);
    if (type === "decrement" && quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="product-detail-container">
      <div className="product-image-section">
        <div className="badge-container">
          <span className="badge-new">NEW</span>
          <span className="badge-sale">-50%</span>
        </div>
        <img
          className="product-image"
          src={product} 
          alt="Teddy Bear"
        />
        <div className="image-navigation">
          <button className="nav-button">{"<"}</button>
          <button className="nav-button">{">"}</button>
        </div>
      </div>

      <div className="product-info-section">
        <h1 className="product-title">Teddy Bear</h1>
        <p className="product-description">
          Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with a removable tray top, handy for serving snacks.
        </p>

        <div className="price-section">
          <span className="current-price">Rs5500</span>
          <span className="original-price">Rs11000</span>
        </div>

        <div className="measurements">
          <h3>Measurements</h3>
          <p>17 1/2 × 20 5/8 "</p>
        </div>

        <div className="color-section">
          <h3>Choose Color</h3>
          <p>Black</p>
        </div>

        <div className="quantity-section">
          <button
            className="quantity-button"
            onClick={() => handleQuantityChange("decrement")}
          >
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button
            className="quantity-button"
            onClick={() => handleQuantityChange("increment")}
          >
            +
          </button>
        </div>

        <div className="action-buttons">
          <button className="wishlist-button">♡ Wishlist</button>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>

        <div className="product-meta">
          <p>
            <strong>SKU:</strong> 1117
          </p>
          <p>
            <strong>Category:</strong> Birthday, Teddy
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
