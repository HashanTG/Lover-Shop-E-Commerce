import React, { useState, useEffect } from 'react';
import { getAllReviews,replyReview } from '../../api/reviewService';
import axios from 'axios';
import './ReviewList.css'; // Import the CSS file

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Fetch reviews from your backend API when the component mounts
  useEffect(() => {
    getAllReviews()
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  // Handler to initialize replying or editing for a review
  const handleEditReply = (review) => {
    setEditingReplyId(review.id);
    setReplyText(review.adminReply || ''); // Pre-fill the text if already replied
  };

  // Handler for saving the reply
  const handleSaveReply = (reviewId) => {
    replyReview(reviewId, replyText)
    .then(response => {
      // Update the review in the list with the new reply
      setReviews(reviews.map(review => 
        review.id === reviewId ? response : review
      ));
      setEditingReplyId(null);
      setReplyText('');
    })
    .catch(error => console.error('Error saving reply:', error));
  };

  // Cancel the reply editing
  const handleCancel = () => {
    setEditingReplyId(null);
    setReplyText('');
  };

  return (
    <div className="reviews-container">
      <h1 className="reviews-title">Reviews</h1>
      
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews found</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="review-tab">
            <div className="review-header">
              <span className="review-product">Product: {review.productId}</span>
              <span className="review-rating">Rating: {review.rating} / 5</span>
            </div>
            <div className="review-details">
              <p><span className="label">User:</span> {review.userId}</p>
              <p><span className="label">Comment:</span> {review.comment}</p>
              <p>
                <span className="label">Created At:</span> {new Date(review.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="label">Status:</span> {review.adminReply ? 'Replied' : 'Not Replied'}
              </p>
            </div>
            
            {editingReplyId === review.id ? (
              <div className="reply-editor">
                <textarea
                  className="reply-textarea"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Enter reply here..."
                  rows="2"
                />
                <div className="reply-buttons">
                  <button className="btn btn-save" onClick={() => handleSaveReply(review.id)}>Save</button>
                  <button className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="reply-section">
                {review.adminReply ? (
                  <div className="existing-reply">
                    <p><span className="label">Admin Reply:</span> {review.adminReply}</p>
                    <button className="btn btn-edit" onClick={() => handleEditReply(review)}>Edit</button>
                  </div>
                ) : (
                  <button className="btn btn-reply" onClick={() => handleEditReply(review)}>Reply</button>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsList;
