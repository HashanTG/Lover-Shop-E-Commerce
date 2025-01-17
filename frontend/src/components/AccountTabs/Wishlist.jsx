// components/Wishlist.jsx
import React from 'react';

const Wishlist = () => {
  const wishlistItems = [
    { id: 1, name: 'Printed Mug', price: 'Rs 500.00', image: 'mug.jpg' },
    { id: 2, name: 'Teddy', price: 'Rs 950.00', image: 'teddy.jpg' },
    { id: 3, name: 'Necklace', price: 'Rs 600.00', image: 'necklace.jpg' }
  ];

  return (
    <div className="wishlist">
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-item">
            <button className="remove-button">×</button>
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
            <button className="add-to-cart">Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
