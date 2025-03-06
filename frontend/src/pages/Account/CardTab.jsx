import React, { useState } from "react";
import "./Addresses.css";
import { useUserDetail } from "../../context/UserDetailContext";
// Stripe Imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_51Qz9QKR5S1kTqIU94IEEBgnxwtoGGqL1321lJJPVARjTslkOmTjpJpr5Ex51lPlHUGTxQA3MfwTv8d1gmzUouFKW00OvNxc9sl");

const CardDetailsInner = () => {
  const { userDetail, updateUserDetail } = useUserDetail();
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newCard, setNewCard] = useState({
    cardHolderName: "",
    primary: false,
  });
  const [loading, setLoading] = useState(false);

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  // Handle input changes for new card
  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save new card with Stripe
  const handleNewSaveClick = async () => {
    if (!stripe || !elements) {
      alert("Stripe is not loaded yet. Please try again.");
      return;
    }

    setLoading(true);

    try {
      // Create PaymentMethod with Stripe
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: { name: newCard.cardHolderName },
      });

      if (error) {
        console.error("Stripe error:", error);
        alert(error.message);
        setLoading(false);
        return;
      }

      // Update local state without sending to backend
      const updatedCards = userDetail.cardDetails ? [...userDetail.cardDetails] : [];

      if (newCard.primary) {
        updatedCards.forEach((card) => (card.primary = false));
      }

      updatedCards.push({
        paymentMethodId: paymentMethod.id,
        last4: paymentMethod.card.last4,
        cardHolderName: newCard.cardHolderName,
        expirationDate: `${paymentMethod.card.exp_month}/${paymentMethod.card.exp_year % 100}`,
        brand: paymentMethod.card.brand,
        primary: newCard.primary,
      });

      await updateUserDetail({ cardDetails: updatedCards });
      setIsAdding(false);
      setNewCard({ cardHolderName: "", primary: false });
    } catch (error) {
      console.error("Failed to add new card:", error);
      alert("Failed to save card. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setNewCard({
      cardHolderName: userDetail.cardDetails[index].cardHolderName,
      primary: userDetail.cardDetails[index].primary,
    });
  };

  const handleSaveEdit = async (index) => {
    const updatedCards = [...userDetail.cardDetails];

    if (newCard.primary) {
      updatedCards.forEach((card) => (card.primary = false));
    }

    updatedCards[index] = {
      ...updatedCards[index],
      cardHolderName: newCard.cardHolderName,
      primary: newCard.primary,
    };

    await updateUserDetail({ cardDetails: updatedCards });
    setEditingIndex(null);
  };

  const handleSetPrimary = async (index) => {
    const updatedCards = userDetail.cardDetails.map((card, i) => ({
      ...card,
      primary: i === index,
    }));
    await updateUserDetail({ cardDetails: updatedCards });
  };

  return (
    <div className="cards">
      <h2>Card Details</h2>
      <div className="card-list">
        {userDetail.cardDetails && userDetail.cardDetails.length > 0 ? (
          userDetail.cardDetails.map((card, index) => (
            <div key={index} className={`card-item ${card.primary ? "primary-card" : ""}`}>
              {editingIndex === index ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="cardHolderName"
                    value={newCard.cardHolderName}
                    onChange={handleNewInputChange}
                    placeholder="Cardholder Name"
                    autoComplete="off"
                  />
                  <button onClick={() => handleSaveEdit(index)} className="save-btn">
                    Save
                  </button>
                  <button onClick={() => setEditingIndex(null)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h3>{card.primary ? "Primary Card" : "Card Information"}</h3>
                  <div className="card-details">
                    <p>Card Number: **** **** **** {card.last4}</p>
                    <p>Cardholder Name: {card.cardHolderName || "N/A"}</p>
                    <p>Expiry Date: {card.expirationDate || "N/A"}</p>
                    <p>Brand: {card.brand || "N/A"}</p>
                  </div>
                  <button onClick={() => handleEditClick(index)} className="edit-btn">Edit</button>
                  {!card.primary && (
                    <button onClick={() => handleSetPrimary(index)} className="primary-btn">Set as Primary</button>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p>No cards available</p>
        )}
        <div className="card-item">
          <h3>Add New Card</h3>
          {isAdding ? (
            <div className="edit-form">
              <input
                type="text"
                name="cardHolderName"
                value={newCard.cardHolderName}
                onChange={handleNewInputChange}
                placeholder="Cardholder Name"
                autoComplete="off"
              />
              <CardElement />
              <button onClick={handleNewSaveClick} className="save-btn" disabled={loading}>
                {loading ? "Saving..." : "Save New Card"}
              </button>
              <button onClick={() => setIsAdding(false)} className="cancel-btn" disabled={loading}>
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setIsAdding(true)} className="add-btn">
              Add New Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const CardDetails = () => (
  <Elements stripe={stripePromise}>
    <CardDetailsInner />
  </Elements>
);

export default CardDetails;
