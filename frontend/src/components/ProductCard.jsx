import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useAlert } from "../context/GlobalAlertContext";
import Spinner from "./Spinner/Spinner";

const ProductCard = ({ product }) => {
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();
  const {showAlert} = useAlert();
  const [isLoadingWhislist, setIsLoadingWhislist] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  const handleWishlistClick = async () => {
    setIsLoadingWhislist(true)
    const response = await addToWishlist(product.id);
    setIsLoadingWhislist(false)
    if (response.success) {
      showAlert("Irem Added To wishlist")
      console.log("Item added to wishlist:", response.data);
    } else {
      showAlert("Failed to add item to wishlist.");
    }
  };

  const handleAddtoCartClick = async () => {
    setIsLoadingCart(true)
    const response  =await addToCart(product.id, 1);
    setIsLoadingCart(false);
    if (response.success) {
      showAlert("Item Added To Cart")
      console.log("Item added to Cart:");
    } else {
      showAlert("Failed to add item to Cart.");
    }
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
        {isLoadingWhislist ? <Spinner size="14px" /> : "Whishlist"}
      </button>
      <button className="add-to-cart" onClick={handleAddtoCartClick}>

        {isLoadingCart ? <Spinner size="14px" /> : "Add To Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
