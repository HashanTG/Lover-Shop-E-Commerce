import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useAlert } from "../context/GlobalAlertContext";
import CustomAlert from "./CustomAlert";
import Spinner from "./Spinner/Spinner";

const ProductCard = ({ product }) => {
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const {showAlert} = useAlert();
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlistClick = async () => {
    setIsLoading(true)
    const response = await addToWishlist(product.id);
    setIsLoading(false)
    if (response.success) {
      showAlert("Irem Added To wishlist")
      console.log("Item added to wishlist:", response.data);
    } else {
      showAlert("Failed to add item to wishlist.");
    }
  };

  const handleAddtoCartClick = () => {
    addToCart(product.id, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images?.[0] || "/images/image2.png"}
          alt={product.name}
        />
        <div className="tag">New</div>
        {product.previousPrice > product.price && (
          <div className="discount-tag">
            {Math.round((1 - product.price / product.previousPrice) * 100)}% OFF
          </div>
        )}
        <h3>{product.name}</h3>

        <p>Price: Rs. {product.price.toFixed(2)}</p>
      </Link>
      <button className="Whishlist" onClick={handleWishlistClick}>
        {isLoading ? <Spinner size="14px" /> : "Whishlist"}
      </button>
      <button className="add-to-cart" onClick={handleAddtoCartClick}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
