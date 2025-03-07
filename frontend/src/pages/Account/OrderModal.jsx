import React, { useEffect, useState } from 'react';
import { confirmOrder } from '../../api/orderService';
import { addReview } from '../../api/reviewService';

import { useAlert } from '../../context/GlobalAlertContext';
import './OrderModal.css';

const OrderModal = ({ order, onClose, refreshOrders }) => {
  //Alert
  const { showAlert } = useAlert();

  const [switchReview, setSwitchReview] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(order?.confirmedByUser || false);
  const [reviews, setReviews] = useState(
    order.items.reduce((acc, item) => {
      acc[item.productId] = { rating: 0, comment: '' };
      return acc;
    }, {})
  );

  useEffect(() => {
    console.log(order);
    setIsConfirmed(order?.confirmedByUser || false);
  }, [order]);

  const handleConfirm = async () => {
    if (isConfirmed) {
      setSwitchReview(true);
      return;
    }

    try {
      await confirmOrder(order.id);
      showAlert("Order confirmed successfully!");
      setSwitchReview(true);
      refreshOrders(); // Refresh orders list in parent component
    } catch (error) {
      showAlert("Failed to confirm order. Please try again.", "error");
      console.error("Order confirmation failed:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleRatingChange = (productId, newRating) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [productId]: { ...prevReviews[productId], rating: newRating },
    }));
  };

  const handleCommentChange = (productId, newComment) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [productId]: { ...prevReviews[productId], comment: newComment },
    }));
  };

  const handleReviewSubmit = async (productId) => { // Added 'async'
    const reviewData = reviews[productId];
  
    if (!reviewData || reviewData.rating === 0 || !reviewData.comment.trim()) {
      showAlert('Please provide a rating and a comment.');
      return;
    }
  
    const review = {
      productId,
      orderId: order.id,
      rating: reviewData.rating,
      comment: reviewData.comment,
    };
  
    try {
      await addReview(review); // Ensure this is an async function
      showAlert('Review added successfully!');
      
      // Reset review fields after successful submission
      setReviews((prevReviews) => ({
        ...prevReviews,
        [productId]: { rating: 0, comment: '' },
      }));
    } catch (error) {
      showAlert('Failed to add review. Please try again.', 'error');
      console.error('Review addition failed:', error);
    }
  };
  

  return (
    <div className="order-modal">
      <div className="modal-content">
        {!switchReview ? (
          <>
            <h2>Order Details</h2>
            <div className="order-detail">
              <div><strong>Order ID:</strong> {order.id}</div>
              <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
              <div><strong>Status:</strong> {order.status}</div>
              <div><strong>Payment Status:</strong> {order.paymentStatus}</div>
            </div>

            {/* Shipping & Receiver Details */}
            <h3>Shipping Address</h3>
            <div className="order-section">
              <div><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}, {order.shippingAddress.country}</div>
              <div><strong>Phone:</strong> {order.shippingAddress.phone}</div>
            </div>

            <h3>Receiver Details</h3>
            <div className="order-section">
              <div><strong>Name:</strong> {order.recieveDetail.recieverFirstName} {order.recieveDetail.recieverLastName}</div>
            </div>

            {/* Payment Details */}
            <h3>Payment Details</h3>
            <div className="order-section">
              <div><strong>Payment Method:</strong> {order.paymentDetails.paymentMethod}</div>
              <div><strong>Card Last 4 Digits:</strong> **** **** **** {order.paymentDetails.cardLast4Digits}</div>
              <div><strong>Card Expiry:</strong> {order.paymentDetails.cardExpiry}</div>
            </div>

            {/* Ordered Products */}
            <h3>Products Ordered</h3>
            <div className="product-list">
              {order.items.map((item, index) => (
                <div key={index} className="product-item">
                  <div><strong>Product ID:</strong> {item.productId}</div>
                  <div><strong>Quantity:</strong> {item.quantity}</div>
                  <div><strong>Price:</strong> ${item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>

            <h3>Total Price: ${order.total.toFixed(2)}</h3>

            {(order.status === 'DELIVERED' || order.status === 'CONFIRMED') && (
  <button className="confirm-btn" onClick={handleConfirm}>
    {isConfirmed ? "Review" : "Confirm Order"}
  </button>
)}
            <button className="ok-btn" onClick={handleClose}>OK</button>
          </>
        ) : (
<>
            <h2>Review Your Items</h2>
            {order.items.map((item) => (
              <div key={item.productId} className="review-item">
                <h4>Product ID: {item.productId}</h4>
                <div className="rating">
                  <span>Rate this product:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${reviews[item.productId].rating >= star ? 'filled' : ''}`}
                      onClick={() => handleRatingChange(item.productId, star)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
                <textarea
                  placeholder="Write your review here..."
                  rows="2"
                  value={reviews[item.productId].comment}
                  onChange={(e) => handleCommentChange(item.productId, e.target.value)}
                />
                <button className="submit-review-btn" onClick={() => handleReviewSubmit(item.productId)}>
                  Submit Review
                </button>
              </div>
            ))}
            <button className="ok-btn" onClick={handleClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
