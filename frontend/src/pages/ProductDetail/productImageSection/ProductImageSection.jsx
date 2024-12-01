import React, { useState } from "react";
import "./imagesection.css"

import arrowLeft from "../../../assets/ProductDetail/arrow-left.svg";
import arrowRight from "../../../assets/ProductDetail/arrow-right.svg";
const ProductImageSection = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageNavigation = (direction) => {
    if (direction === "prev") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    } else if (direction === "next") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="product-image-section">
      <div className="badge-container">
        <span className="badge-new">NEW</span>
        {product.previousPrice > product.price && (
          <span className="badge-sale">
            -{Math.round(((product.previousPrice - product.price) / product.previousPrice) * 100)}%
          </span>
        )}
      </div>
      <img
        className="product-image"
        src={product.images[currentImageIndex]} // Dynamically show the current image
        alt={product.name}
      />
      <div className="image-navigation">
        <button className="nav-button" onClick={() => handleImageNavigation("prev")}><img src={arrowLeft} className="arrows" /></button>
        <button className="nav-button" onClick={() => handleImageNavigation("next")}><img src={arrowRight} lassName="arrows"/></button>
      </div>
    </div>
  );
};

export default ProductImageSection;
