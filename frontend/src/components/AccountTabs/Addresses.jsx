import React, { useState } from 'react';
import './Addresses.css';
import { useUserDetail } from '../../context/UserDetailContext';

const Addresses = () => {
  const { userDetail, updateUserDetail } = useUserDetail();
  
  const [editingIndex, setEditingIndex] = useState(null); //State for kepp Editing address
  const [editedAddress, setEditedAddress] = useState({});//State for Keep Edited address detail
  const [isAdding, setIsAdding] = useState(false); // To track if we're adding a new address
  const [newAddress, setNewAddress] = useState({}); // State for new address inputs

//Handle Editing a address when Click on Edit Button
  const handleEditClick = (index, address) => {
    setEditingIndex(index);
    setEditedAddress({ ...address });
  };

  //Handle Input Change for Edited Address
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Handle Save Click for Edited Address

  const handleSaveClick = (index) => {
    const updatedAddresses = [...userDetail.addresses];
    updatedAddresses[index] = editedAddress;
  
    console.log(updatedAddresses);
    const updatedAddressJson = {"addresses":updatedAddresses}

    updateUserDetail(updatedAddressJson)
      .then(() => {
        setEditingIndex(null);
      })
      .catch((error) => {
        console.error("Failed to update address:", error);
      });
  };

  //Handle Cancel Click for Edited Address
  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditedAddress({});
  };

  //Handling Add New Address
  const handleAddClick = () => {
    setIsAdding(true);
  };
//Handle input changes for new Address
  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Add new Address
  const handleNewSaveClick = () => {
    const updatedAddresses = [...userDetail.addresses, newAddress];
  
   console.log(updatedAddresses);
    const updatedAddressJson = {"addresses":updatedAddresses}//Create Json object for updated address to be passed to request

    updateUserDetail(updatedAddressJson)
      .then(() => {
        setIsAdding(false);
        setNewAddress({});
      })
      .catch((error) => {
        console.error("Failed to add new address:", error);
      });
  };

//Cancel New Address Adding
  const handleNewCancelClick = () => {
    setIsAdding(false);
    setNewAddress({});
  };


  //Remove a Address from the list
  const handleRemove = (index) => {
    const updatedAddresses = userDetail.addresses.filter((_, i) => i !== index); // Filter out the item at the given index
    const updatedAddressJson = { addresses: updatedAddresses }; // Create JSON object for updated addresses to be passed to the request
  
    updateUserDetail(updatedAddressJson)
      .then(() => {
        setEditingIndex(null);
      })
      .catch((error) => {
        console.error("Failed to update address:", error);
      });
  };
  

  if (!userDetail) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="addresses">
      <h2>Address</h2>
      <div className="address-cards">
        {userDetail.addresses && userDetail.addresses.length > 0 ? (
          userDetail.addresses.map((address, index) => (
            <div key={index} className="address-card">
              <h3>Shipping Address</h3>
              {editingIndex === index ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="address"
                    value={editedAddress.address || ""}
                    onChange={handleInputChange}
                    placeholder="Address"
                  />
                  <input
                    type="text"
                    name="city"
                    value={editedAddress.city || ""}
                    onChange={handleInputChange}
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="state"
                    value={editedAddress.state || ""}
                    onChange={handleInputChange}
                    placeholder="State"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    value={editedAddress.zipCode || ""}
                    onChange={handleInputChange}
                    placeholder="Zip Code"
                  />
                  <input
                    type="text"
                    name="country"
                    value={editedAddress.country || ""}
                    onChange={handleInputChange}
                    placeholder="Country"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editedAddress.phone || ""}
                    onChange={handleInputChange}
                    placeholder="Phone"
                  />
                  <button onClick={() => handleSaveClick(index)} className="save-button">
                    Save
                  </button>
                  <button onClick={handleCancelClick} className="cancel-button">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="address-details">
                  <p>{address.address || ""}</p>
                  <p>
                    {address.city || ""}, {address.state || ""}, {address.zipCode || ""}
                  </p>
                  <p>{address.country || ""}</p>
                  <p>{address.phone || ""}</p>
                  <button onClick={() => handleEditClick(index, address)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleRemove(index)} className="remove-button">
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No addresses available</p>
        )}
        <div className="address-card">
          <h3>Add New Address</h3>
          {isAdding ? (
            <div className="edit-form">
              <input
                type="text"
                name="address"
                value={newAddress.address || ""}
                onChange={handleNewInputChange}
                placeholder="Address"
              />
              <input
                type="text"
                name="city"
                value={newAddress.city || ""}
                onChange={handleNewInputChange}
                placeholder="City"
              />
              <input
                type="text"
                name="state"
                value={newAddress.state || ""}
                onChange={handleNewInputChange}
                placeholder="State"
              />
              <input
                type="text"
                name="zipCode"
                value={newAddress.zipCode || ""}
                onChange={handleNewInputChange}
                placeholder="Zip Code"
              />
              <input
                type="text"
                name="country"
                value={newAddress.country || ""}
                onChange={handleNewInputChange}
                placeholder="Country"
              />
              <input
                type="text"
                name="phone"
                value={newAddress.phone || ""}
                onChange={handleNewInputChange}
                placeholder="Phone"
              />
              <button onClick={handleNewSaveClick} className="save-button">
                Save New Address
              </button>
              <button onClick={handleNewCancelClick} className="cancel-button">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleAddClick} className="add-button">
              Add New Address
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addresses;
