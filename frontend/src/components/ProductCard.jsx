import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: Rs. {product.price}</p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
};

export default ProductCard;