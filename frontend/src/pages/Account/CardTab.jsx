import React, { useState } from 'react';
import './Addresses.css';
import { useUserDetail } from '../../context/UserDetailContext';

const CardDetails = () => {
  const { userDetail, updateUserDetail } = useUserDetail();
  const [isAdding, setIsAdding] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
    primary: false,
  });

  // Handle input changes for new card
  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate card number and expiry date
  const isValidCard = () => {
    const cardRegex = /^[0-9]{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return (
      cardRegex.test(newCard.cardNumber) &&
      expiryRegex.test(newCard.expirationDate)
    );
  };

  // Mask card number except last 4 digits
  const maskCardNumber = (cardNumber) => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  // Save new card
  const handleNewSaveClick = () => {
    if (!isValidCard()) {
      alert('Invalid card details! Please enter a valid card number and expiry date.');
      return;
    }

    const updatedCards = userDetail.cardDetails ? [...userDetail.cardDetails] : [];
    
    // If setting as primary, remove primary flag from other cards
    if (newCard.primary) {
      updatedCards.forEach(card => (card.primary = false));
    }

    updatedCards.push(newCard);
    
    updateUserDetail({ cardDetails: updatedCards }).then(() => {
      setIsAdding(false);
      setNewCard({ cardNumber: '', cardHolderName: '', expirationDate: '', cvv: '', primary: false });
    }).catch(error => console.error('Failed to add new card:', error));
  };

  // Remove card
  const handleRemove = (index) => {
    const updatedCards = userDetail.cardDetails.filter((_, i) => i !== index);
    updateUserDetail({ cardDetails: updatedCards }).catch(error => console.error('Failed to remove card:', error));
  };

  // Set a card as primary
  const handleSetPrimary = (index) => {
    const updatedCards = userDetail.cardDetails.map((card, i) => ({
      ...card,
      primary: i === index, // Only set primary for the selected card
    }));

    updateUserDetail({ cardDetails: updatedCards }).catch(error => console.error('Failed to set primary card:', error));
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
            <div key={index} className={`card-item ${card.primary ? 'primary-card' : ''}`}>
              <h3>{card.primary ? 'Primary Card' : 'Card Information'}</h3>
              <div className="card-details">
                <p>Card Number: {maskCardNumber(card.cardNumber)}</p>
                <p>Cardholder Name: {card.cardHolderName || 'N/A'}</p>
                <p>Expiry Date: {card.expirationDate || 'N/A'}</p>
                <button onClick={() => handleRemove(index)} className="remove-button">
                  Remove
                </button>
                {!card.primary && (
                  <button onClick={() => handleSetPrimary(index)} className="primary-button">
                    Set as Primary
                  </button>
                )}
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
                value={newCard.cardNumber}
                onChange={handleNewInputChange}
                placeholder="Card Number (16 digits)"
                autoComplete="off"
                maxLength={16}
              />
              <input
                type="text"
                name="cardHolderName"
                value={newCard.cardHolderName}
                onChange={handleNewInputChange}
                placeholder="Cardholder Name"
                autoComplete="off"
              />
              <input
                type="text"
                name="expirationDate"
                value={newCard.expirationDate}
                onChange={handleNewInputChange}
                placeholder="Expiry Date (MM/YY)"
                autoComplete="off"
                maxLength={5}
              />
              <input
                type="text"
                name="cvv"
                value={newCard.cvv}
                onChange={handleNewInputChange}
                placeholder="CVV"
                autoComplete="off"
                maxLength={3}
              />
              <label>
                <input
                  type="checkbox"
                  checked={newCard.primary}
                  onChange={(e) => setNewCard({ ...newCard, primary: e.target.checked })}
                />
                Set as Primary
              </label>
              <button onClick={handleNewSaveClick} className="save-button">
                Save New Card
              </button>
              <button onClick={() => setIsAdding(false)} className="cancel-button">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={() => setIsAdding(true)} className="add-button">
              Add New Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
