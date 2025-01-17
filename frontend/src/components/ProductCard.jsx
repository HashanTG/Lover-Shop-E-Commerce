import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <img src={product.images?.[0] || "/images/image2.png"} alt={product.name} />
      <div className="tag">New</div>
      {product.previousPrice > product.price && (
        <div className="discount-tag">
          {Math.round((1 - product.price / product.previousPrice) * 100)}% OFF
        </div>
      )}
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: Rs. {product.price.toFixed(2)}</p>
      <button className="add-to-cart">Add to Cart</button>
      <button className="Whishlist">Wishlist</button>
      </Link>
  );
};

export default ProductCard;