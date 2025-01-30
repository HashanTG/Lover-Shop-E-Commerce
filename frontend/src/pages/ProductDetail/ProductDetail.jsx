import React, { useEffect, useState, useContext } from "react";
//CSS Import
import "./ProductDetailComponent.css";
//Context Imports
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/GlobalAlertContext";
import { useWishlist } from "../../context/WishlistContext";
//Component Import
import ProductImageSection from "./productImageSection/ProductImageSection";
import Review from "./Reviews/Review";
import Loading from "../../components/shared/Loading/Loading";
import Spinner from "../../components/Spinner/Spinner";

//Api Services Import
import { GetProductDetailById } from "../../api/productService";
import { getRreviews } from "../../api/reviewService";

const ProductDetail = () => {
  const { productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null); // State for the product data
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState({}); //Saving currently Selected Variation (eg : color:brown )
  const [variationState, setVariationState] = useState({});//Variation Object

  //Other States
  const [reviews, setReviews] = useState([]); //Reviews
  const [isInWishlist,setIsinWhislist] =useState(false);
  const [isInCart,setIsInCart] = useState(false);

  //Loading And Alert States
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isLoadingWhislist, setIsLoadingWhislist] = useState(false); //Loading wjile Wishlist Adding
  const [isLoadingCart, setIsLoadingCart] = useState(false); //Loading While Cart Adding
  const [error, setError] = useState(null); // Error state

  const { showAlert } = useAlert(); //For Alerts

  //Context Import
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { wishlistItems,addToWishlist } = useWishlist();


  //Fetching Product Details On Component Mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (productId) {
          // Fetch product details and reviews concurrently
          await Promise.all([fetchProductDetails(productId), fetchReviews(productId)]);
          
          // Check if the product is in the wishlist
         
          const wishlistStatus = wishlistItems.some((item) => item.id === productId);
          setIsinWhislist(wishlistStatus);
        }
      } catch (error) {
        console.error("Error fetching product or reviews:", error);
        
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [productId, wishlistItems]);
  

  //
  useEffect(() => {
    if (product) {
      setSelectedVariations(initializeVariations(product)); //Variation Intialization
      setVariationState(initializeStock(product)); //Intialize the stocks from product Object (variations)
    }
  }, [product]);

  // Fetch product details by ID
  const fetchProductDetails = async (id) => {
    try {
      setIsLoading(true);
      const response = await GetProductDetailById(id);
      setProduct(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch product details.");
      setIsLoading(false);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const reviews = await getRreviews(productId);
      console.log(reviews);
      setReviews(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

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

  //Functions

  // Add item to cart
  const handleAddToCart = async () => {
    // Showing Alert If not Authenticated
    if (!isAuthenticated) {
      showAlert("Please log in to add items to the cart.");
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const result = await addToCart(productId, quantity); // Use the quantity state

      if (result.success) {
        showAlert("Item added to cart successfully");
      } else {
        showAlert("Failed to Add to Cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      showAlert("An error occurred while adding the item to the cart.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  //Other Functionalities

  //Change Quantity Upon changing the variation

  useEffect(() => {
    setQuantity(1);
  }, [selectedVariations]);

  //Handle thw Changing the quanity Finctionality
  //Use for limit for stock
  const handleQuantityChange = (type) => {
    const selectedStockValue = Object.values(selectedVariations).reduce(
      (maxStock, selectedOption) =>
        Math.max(maxStock, variationState[selectedOption]),
      product.stock
    );

    if (type === "increment" && quantity < selectedStockValue) {
      setQuantity(quantity + 1);
    }
    if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //Change the state for the variation ( eg:color:"red" )
  const handleVariationChange = (type, value) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  //Wishlist Functionalities


  const handleWishlist = async () => {
    try {
      setIsLoadingWhislist(true);
      const response = await addToWishlist(productId);
      setIsLoadingWhislist(false);
  
      if (response.success) {
        showAlert("Item added to Wishlist!");
        setIsinWhislist(true)
        console.log("Item added to wishlist:", response.data);
      } else {
        showAlert("Failed to add item to Wishlist.");
      }
    } catch (error) {
      setIsLoadingWhislist(false);
      console.error("Error adding item to wishlist:", error);
      showAlert("An error occurred. Please try again.");
    }
  };
  
  // Toggle the wishlist status
  const toggleWishlist = () => {
    if (isInWishlist) {
      showAlert("Item already in Wishlist.");
    } else {
      handleWishlist();
    }
  };
  

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {product && (
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
        </div>
      )}

<div className="review-list">
  <h2>Reviews</h2>
  {reviews.length > 0 ? (
    reviews.map((review) => <Review key={review.id} review={review} />)
  ) : (
    <p className="no-reviews">No reviews available for this product.</p>
  )}
</div>

    </>
  );
};

export default ProductDetail;
