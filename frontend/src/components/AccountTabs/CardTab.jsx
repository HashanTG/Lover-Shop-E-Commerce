import React, { useState } from 'react';
import './Addresses.css';
import { useUserDetail } from '../../context/UserDetailContext';

const CardDetails = () => {
  const { userDetail, updateUserDetail } = useUserDetail();
  const [isAdding, setIsAdding] = useState(false); // To track if we're adding a new card
  const [newCard, setNewCard] = useState({}); // State for new card inputs
  

  // Handle adding a new card
  const handleAddClick = () => {
    setIsAdding(true);
  };

  // Handle input changes for new card
  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save the new card
  const handleNewSaveClick = () => {
    const updatedCardDetails = [...userDetail.cardDetails, newCard];
    console.log(updatedCardDetails);

    const updatedCardJson = { cardDetails: updatedCardDetails }; // Create JSON object for updated cards

    updateUserDetail(updatedCardJson)
      .then(() => {
        setIsAdding(false);
        setNewCard({});
      })
      .catch((error) => {
        console.error('Failed to add new card:', error);
      });
  };

  // Cancel adding a new card
  const handleNewCancelClick = () => {
    setIsAdding(false);
    setNewCard({});
  };

  // Remove a card from the list
  const handleRemove = (index) => {
    const updatedCardDetails = userDetail.cardDetails.filter((_, i) => i !== index);
    const updatedCardJson = { cardDetails: updatedCardDetails };

    updateUserDetail(updatedCardJson)
      .then(() => {
        console.log('Card removed successfully');
      })
      .catch((error) => {
        console.error('Failed to remove card:', error);
      });
  };

  if (!userDetail) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="cards">
      <h2>Card Details</h2>
      <div className="card-list">
        {userDetail.cardDetails && userDetail.cardDetails.length > 0 ? (
          userDetail.cardDetails.map((card, index) => (
            <div key={index} className="card-item">
              <h3>Card Information</h3>
              <div className="card-details">
                <p>Card Number: {card.cardNumber || 'N/A'}</p>
                <p>Cardholder Name: {card.cardHolderName || 'N/A'}</p>
                <p>Expiry Date: {card.expirationDate || 'N/A'}</p>
                <button onClick={() => handleRemove(index)} className="remove-button">
                  Remove
                </button>
              </div>
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
                name="cardNumber"
                value={newCard.cardNumber || ''}
                onChange={handleNewInputChange}
                placeholder="Card Number"
                autoComplete="off"
              />
              <input
                type="text"
                name="cardHolderName"
                value={newCard.cardHolderName || ''}
                onChange={handleNewInputChange}
                placeholder="Cardholder Name"
                autoComplete="off"
              />
              <input
                type="text"
                name="expirationDate"
                value={newCard.expirationDate || ''}
                onChange={handleNewInputChange}
                placeholder="Expiry Date (MM/YY)"
                autoComplete="off"
              />
              <input
                type="text"
                name="cvv"
                value={newCard.cvv || ''}
                onChange={handleNewInputChange}
                placeholder="CVV"
                autoComplete="off"
              />
              <button onClick={handleNewSaveClick} className="save-button">
                Save New Card
              </button>
              <button onClick={handleNewCancelClick} className="cancel-button">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleAddClick} className="add-button">
              Add New Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
