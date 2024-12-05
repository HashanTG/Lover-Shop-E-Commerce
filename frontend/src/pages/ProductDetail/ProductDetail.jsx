import React, { useState } from "react";
import "./ProductDetailComponent.css";

import ProductImageSection from "./productImageSection/ProductImageSection";

import product1 from "../../assets/ProductDetail/product1.jpg";
import product2 from "../../assets/ProductDetail/product2.png";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  // Hardcoded product data
  const product = {
    _id: "productId",
    name: "Gift Box",
    category: "Gifts",
    price: 25.99,
    previousPrice: 1000,
    stock: 100,
    description: "A perfect gift for loved ones.",
    images: [product1, product2],
    createdAt: "2024-11-19T12:00:00Z",
    variations: [
      {
        type: "Color",
        options: [
          { value: "Red", stock: 20 },
          { value: "Blue", stock: 30 },
        ],
      },
      {
        type: "Size",
        options: [
          { value: "Small", stock: 50 },
          { value: "Large", stock: 50 },
        ],
      },
    ],
  };

  // State to track selected variation options
  const [selectedVariations, setSelectedVariations] = useState(
    product.variations.reduce((acc, variation) => {
      acc[variation.type] = variation.options[0].value; // Default to the first option
      return acc;
    }, {})
  );

  // Handle quantity increment and decrement
  const handleQuantityChange = (type) => {
    if (type === "increment") setQuantity(quantity + 1);
    if (type === "decrement" && quantity > 1) setQuantity(quantity - 1);
  };

  // Handle variation change
  const handleVariationChange = (type, value) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="product-detail-container">
      {/* Image Section */}

      <ProductImageSection product={product} />

      {/* Product Info Section */}
      <div className="product-info-section">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>

        <div className="price-section">
          <span className="current-price">Rs {product.price}</span>
          <span className="original-price">Rs {product.previousPrice}</span>
        </div>
    <hr />
        {/* Variations */}
        {product.variations.map((variation) => (
          <div key={variation.type} className="variation-section">
            <h3>Choose {variation.type}</h3>
            <select
              className="variation-dropdown"
              value={selectedVariations[variation.type]}
              onChange={(e) => handleVariationChange(variation.type, e.target.value)}
            >
              {variation.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value} ({option.stock} in stock)
                </option>
              ))}
            </select>
          </div>
        ))}
  
        {/* Quantity Selector */}
        <div className="quantity-wrapper">
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
        <button className="wishlist-button">♡ Wishlist</button></div>


        {/* Action Buttons */}
        <div className="action-buttons">
          
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
       <hr />
        {/* Product Metadata */}
        <div className="product-meta">
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>SKU:</strong> {product._id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
