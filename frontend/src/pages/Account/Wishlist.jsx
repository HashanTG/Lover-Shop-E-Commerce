import React, { useState } from 'react';
import './Whishlist.css';
import Spinner from '../../components/Spinner/Spinner';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useAlert } from '../../context/GlobalAlertContext';
import { useAuth } from '../../context/AuthContext';

const Wishlist = () => {
  const [loadingItems, setLoadingItems] = useState({}); // Track loading state per item

  const { wishlistItems = [], removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { showAlert } = useAlert();
  const { addToCart } = useCart();

  // Add item to cart
  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      showAlert("Please log in to add items to the cart.");
      return;
    }

    setLoadingItems((prev) => ({ ...prev, [productId]: true })); // Set loading for this item

    try {
      const result = await addToCart(productId, 1);

      if (result.success) {
        showAlert("Item added to cart successfully");
      } else {
        showAlert("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      showAlert("An error occurred while adding the item to the cart.");
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false })); // Reset loading for this item
    }
  };

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item?.id} className="wishlist-item">
              <div className="item-image">
                <img src={item?.images?.[0]} alt={item?.name} />
              </div>
              <div className="item-details">
                <h3>{item?.name}</h3>
                <p className="item-id">Item ID: {item?.id}</p>
                <p className="category">{item?.category}</p>
                <div className="price-actions">
                  <span className="price">{item?.price}</span>
                  <button className="add-to-bag" onClick={() => removeFromWishlist(item?.id)}>
                    Remove
                  </button>
                  <button 
                    className="add-to-bag" 
                    onClick={() => handleAddToCart(item?.id)}
                    disabled={loadingItems[item?.id]} // Disable while loading
                  >
                    {loadingItems[item?.id] ? <Spinner size="14px" /> : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
