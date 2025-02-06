import React, { useState, useEffect } from 'react';
import { getAllReviews, replyReview } from '../../api/reviewService';
import './ReviewList.css'; 

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Fetch reviews with pagination
  const fetchReviews = async (page = 0, size = 5) => {
    try {
      const response = await getAllReviews(page, size);
      setReviews(response.content);
      setCurrPage(response.pageable.pageNumber);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews(); // Initial fetch for the first page
  }, []);

  const handleEditReply = (review) => {
    setEditingReplyId(review.id);
    setReplyText(review.adminReply || '');
  };

  const handleSaveReply = (reviewId) => {
    replyReview(reviewId, replyText)
      .then((response) => {
        setReviews((prevReviews) =>
          prevReviews.map((review) => (review.id === reviewId ? response : review))
        );
        setEditingReplyId(null);
        setReplyText('');
      })
      .catch((error) => console.error('Error saving reply:', error));
  };

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
        reviews.map((review) => (
          <div key={review.id} className="review-tab">
            <div className="review-header">
              <span className="review-product">Product: {review.productId}</span>
              <span className="review-rating">Rating: {review.rating} / 5</span>
            </div>
            <div className="review-details">
              <p><span className="label">User:</span> {review.userId || 'Anonymous'}</p>
              <p><span className="label">Comment:</span> {review.comment}</p>
              <p>
                <span className="label">Created At:</span> {review.createdAt ? new Date(review.createdAt).toLocaleString() : 'N/A'}
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

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          disabled={currPage === 0}
          onClick={() => fetchReviews(currPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currPage + 1} of {totalPages}
        </span>
        <button
          disabled={currPage + 1 >= totalPages}
          onClick={() => fetchReviews(currPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewsList;
