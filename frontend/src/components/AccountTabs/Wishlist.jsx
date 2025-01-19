// components/Wishlist.jsx
import React from 'react';
import './Whishlist.css';
import { useWishlist } from '../../context/WishlistContext';

const Wishlist = () => {

  const { wishlistItems } = useWishlist();
  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-item">
            <div className="item-image">
              <img src={item.images[0]} alt={item.name} />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-id">Item ID: {item.id}</p>
              <p className="category">{item.category}</p>
              <div className="price-actions">
                <span className="price">{item.price}</span>
                <button className="add-to-bag">Add to Bag</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
