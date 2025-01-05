import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import ProductImageSection from "./productImageSection/ProductImageSection";
import "./ProductDetailComponent.css";
import CustomAlert from "../../components/CustomAlert";

// API endpoint to fetch product by ID
const PRODUCT_API_ENDPOINT = "http://localhost:8080/api/products";

const ProductDetail = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null); // State for the product data
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]); // Wishlist state
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showAlert, setShowAlert] = useState(false);
  
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useAuth();

  const userId = "user123"; // Hardcoded user ID for now

  // Add item to cart
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setShowAlert(true);
      return;
    }
  
    setIsLoading(true); // Start loading
    try {
      const result = await addToCart(productId, quantity); // Use the quantity state
  
      if (result.success) {
        console.log("Item added to cart successfully");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("An error occurred while adding the item to the cart.");
    } finally {
      setIsLoading(false); // End loading
    }
  };
  
  // Fetch product details by ID
  const fetchProductDetails = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${PRODUCT_API_ENDPOINT}/${id}`);
      setProduct(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch product details.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productId) fetchProductDetails(productId);
  }, [productId]);

  // Initialize variations and stock based on product data
  const initializeVariations = (product) => {
    return product.variations.reduce((acc, variation) => {
      acc[variation.type] = variation.options[0].value; // Default to the first option
      return acc;
    }, {});
  };

  const initializeStock = (product) => {
    return product.variations.reduce((stk, variation) => {
      variation.options.forEach((option) => {
        stk[option.value] = option.stock; // Map option value to its stock
      });
      return stk;
    }, {});
  };

  const [selectedVariations, setSelectedVariations] = useState({});
  const [selectedStock, setSelectedStock] = useState({});

  useEffect(() => {
    if (product) {
      setSelectedVariations(initializeVariations(product));
      setSelectedStock(initializeStock(product));
    }
  }, [product]);

  // Check if the product is in the wishlist
  const isInWishlist = wishlist.some(
    (item) => item.productId === productId && item.userId === userId
  );

  // Toggle the wishlist status
  const toggleWishlist = () => {
    setWishlist((prevWishlist) => {
      if (isInWishlist) {
        return prevWishlist.filter(
          (item) => item.productId !== productId || item.userId !== userId
        );
      } else {
        return [...prevWishlist, { userId, productId }];
      }
    });
  };

  const handleQuantityChange = (type) => {
    const selectedStockValue = Object.values(selectedVariations).reduce(
      (minStock, selectedOption) =>
        Math.min(minStock, selectedStock[selectedOption]),
      product.stock
    );

    if (type === "increment" && quantity < selectedStockValue) {
      setQuantity(quantity + 1);
    }
    if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleVariationChange = (type, value) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    product && (
      <div className="product-detail-container">
        <ProductImageSection product={product} />
        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <div className="price-section">
            <span className="current-price">Rs {product.price}</span>
            <span className="original-price">Rs {product.previousPrice}</span>
          </div>
          <hr />

          {product.variations.map((variation) => (
            <div key={variation.type} className="variation-section">
              <h3>Choose {variation.type}</h3>
              <select
                className="variation-dropdown"
                value={selectedVariations[variation.type]}
                onChange={(e) =>
                  handleVariationChange(variation.type, e.target.value)
                }
              >
                {variation.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value} ({option.stock} in stock)
                  </option>
                ))}
              </select>
            </div>
          ))}

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
            <button
              className="wishlist-button"
              style={{ color: isInWishlist ? "red" : "black" }}
              onClick={toggleWishlist}
            >
              {isInWishlist ? "♥ In Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>

          <div className="action-buttons">
          <button
  className="add-to-cart-button"
  onClick={handleAddToCart}
  disabled={isLoading}
>
  {isLoading ? "Loading..." : "Add to Cart"}
</button>

          </div>
          <hr />
          <div className="product-meta">
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>SKU:</strong> {product.id}
            </p>
          </div>
        </div>
        {showAlert && (
  <CustomAlert 
    message="Please log in to add items to the cart."
    onClose={() => setShowAlert(false)}
    duration={2000}
  />
)}
      </div>
    )
  );
};

export default ProductDetail;
