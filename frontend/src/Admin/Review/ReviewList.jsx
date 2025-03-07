import React, { useState, useEffect } from "react";
import { getAllReviews, replyReview } from "../../api/reviewService";
import "./ReviewList.css";

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={index < rating ? "star filled" : "star"}>
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reviews with pagination
  const fetchReviews = async (page = 0, size = 5) => {
    setIsLoading(true);
    try {
      const response = await getAllReviews(page, size);
      setReviews(response.content);
      setCurrPage(response.pageable.pageNumber);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(); // Initial fetch for the first page
  }, []);

  const handleEditReply = (review) => {
    setEditingReplyId(review.id);
    setReplyText(review.adminReply || "");
  };

  const handleSaveReply = (reviewId) => {
    replyReview(reviewId, replyText)
      .then((response) => {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === reviewId ? response : review
          )
        );
        setEditingReplyId(null);
        setReplyText("");
      })
      .catch((error) => console.error("Error saving reply:", error));
  };

  const handleCancel = () => {
    setEditingReplyId(null);
    setReplyText("");
  };

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h1 className="reviews-title">Customer Reviews</h1>
        <div className="reviews-stats">
          {reviews.length > 0 && (
            <div className="avg-rating">
              <div className="avg-rating-stars">
                <StarRating
                  rating={
                    reviews.reduce((acc, rev) => acc + rev.rating, 0) /
                    reviews.length
                  }
                />
              </div>
              <span className="avg-rating-text">
                {(
                  reviews.reduce((acc, rev) => acc + rev.rating, 0) /
                  reviews.length
                ).toFixed(1)}{" "}
                / 5
              </span>
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="no-reviews">
          <i className="review-icon">📋</i>
          <p>No reviews found</p>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card-header">
                <div className="review-user-info">
                  <div className="review-user-avatar">
                    {(review.userId || "A").charAt(0).toUpperCase()}
                  </div>
                  <div className="review-user-details">
                    <h3 className="review-username">
                      {review.userId || "Anonymous"}
                    </h3>
                    <span className="review-date">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
                <div className="review-rating-container">
                  <span className="review-product-id">
                    Product: {review.productId}
                  </span>
                  <div className="review-rating">
                    <StarRating rating={review.rating} />
                  </div>
                </div>
              </div>

              <div className="review-content">
                <p className="review-comment">{review.comment}</p>
              </div>

              <div className="review-reply-container">
                {editingReplyId === review.id ? (
                  <div className="reply-editor">
                    <label
                      htmlFor={`reply-${review.id}`}
                      className="reply-label"
                    >
                      Your Response:
                    </label>
                    <textarea
                      id={`reply-${review.id}`}
                      className="reply-textarea"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Enter your reply to this review..."
                      rows="3"
                    />
                    <div className="reply-buttons">
                      <button
                        className="btn btn-save"
                        onClick={() => handleSaveReply(review.id)}
                      >
                        <i className="btn-icon">✓</i> Save Reply
                      </button>
                      <button className="btn btn-cancel" onClick={handleCancel}>
                        <i className="btn-icon">✕</i> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`reply-section ${
                      review.adminReply ? "has-reply" : ""
                    }`}
                  >
                    {review.adminReply ? (
                      <div className="existing-reply">
                        <div className="reply-header">
                          <i className="reply-icon">💬</i>
                          <h4 className="reply-title">Admin Response</h4>
                        </div>
                        <p className="reply-text">{review.adminReply}</p>
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEditReply(review)}
                        >
                          <i className="btn-icon">✎</i> Edit Response
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn btn-reply"
                        onClick={() => handleEditReply(review)}
                      >
                        <i className="btn-icon">✉</i> Respond to Review
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="review-status">
                <span
                  className={`status-badge ${
                    review.adminReply ? "status-replied" : "status-pending"
                  }`}
                >
                  {review.adminReply ? "Replied" : "Awaiting Response"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!isLoading && reviews.length > 0 && (
        <div className="pagination">
          <button
            className="pagination-btn prev"
            disabled={currPage === 0}
            onClick={() => fetchReviews(currPage - 1)}
          >
            <i className="pagination-icon">←</i> Previous
          </button>
          <div className="pagination-info">
            <span className="current-page">Page {currPage + 1}</span>
            <span className="page-divider">of</span>
            <span className="total-pages">{totalPages}</span>
          </div>
          <button
            className="pagination-btn next"
            disabled={currPage + 1 >= totalPages}
            onClick={() => fetchReviews(currPage + 1)}
          >
            Next <i className="pagination-icon">→</i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
