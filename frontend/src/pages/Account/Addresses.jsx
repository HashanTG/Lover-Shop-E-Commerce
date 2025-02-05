import React, { useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useUserDetail } from "../../context/UserDetailContext";

const Addresses = () => {
  const { userDetail, updateUserDetail } = useUserDetail();
  const [isLoading,setIsLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedAddress, setEditedAddress] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    primary: false,
  });

  // Handle editing an address
  const handleEditClick = (index, address) => {
    setEditingIndex(index);
    setEditedAddress({ ...address });
  };

  // Handle input change for edited address
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save edited address
  const handleSaveClick = async (index) => {
    const updatedAddresses = [...userDetail.addresses];
    updatedAddresses[index] = editedAddress;

    try {
      await updateUserDetail({ addresses: updatedAddresses });
      setEditingIndex(null);
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  // Cancel editing
  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditedAddress({});
  };

  // Handle adding a new address
  const handleAddClick = () => {
    setIsAdding(true);
  };

  // Handle input changes for new address
  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save new address
  const handleNewSaveClick = async () => {
    const updatedAddresses = [...(userDetail.addresses || []), newAddress];

    try {
      await updateUserDetail({ addresses: updatedAddresses });
      setIsAdding(false);
      setNewAddress({
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
        primary: false,
      });
    } catch (error) {
      console.error("Failed to add new address:", error);
    }
  };

  // Cancel adding new address
  const handleNewCancelClick = () => {
    setIsAdding(false);
    setNewAddress({
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      primary: false,
    });
  };

  // Remove an address
  const handleRemove = async (index) => {
    const updatedAddresses = userDetail.addresses.filter((_, i) => i !== index);

    try {
      await updateUserDetail({ addresses: updatedAddresses });
    } catch (error) {
      console.error("Failed to remove address:", error);
    }
  };

  // Set primary address
  const handleSetPrimary = async (index) => {
    setIsLoading(true);
    const updatedAddresses = userDetail.addresses.map((addr, i) => ({
      ...addr,
      primary: i === index,
    }));

    try {
      await updateUserDetail({ addresses: updatedAddresses });
    } catch (error) {
      console.error("Failed to set primary address:", error);
    }
    finally{
      setIsLoading(false);
    }
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
            <div key={index} className={`address-card ${address.primary ? "primary" : ""}`}>
              <h3>Shipping Address</h3>
              {editingIndex === index ? (
                <div className="edit-form">
                  <input type="text" name="address" value={editedAddress.address} onChange={handleInputChange} placeholder="Address" />
                  <input type="text" name="city" value={editedAddress.city} onChange={handleInputChange} placeholder="City" />
                  <input type="text" name="state" value={editedAddress.state} onChange={handleInputChange} placeholder="State" />
                  <input type="text" name="zipCode" value={editedAddress.zipCode} onChange={handleInputChange} placeholder="Zip Code" />
                  <input type="text" name="country" value={editedAddress.country} onChange={handleInputChange} placeholder="Country" />
                  <input type="text" name="phone" value={editedAddress.phone} onChange={handleInputChange} placeholder="Phone" />
                  <button onClick={() => handleSaveClick(index)} className="save-btn">Save</button>
                  <button onClick={handleCancelClick} className="cancel-btn">Cancel</button>
                </div>
              ) : (
                <div className="address-details">
                  <p>{address.address || "Not set"}</p>
                  <p>{address.city || "Not set"}, {address.state || "Not set"}, {address.zipCode || "Not set"}</p>
                  <p>{address.country || "Not set"}</p>
                  <p>{address.phone || "Not set"}</p>
                  <p className="primary-text">{address.primary ? "Primary Address" : ""}</p>
                  <button onClick={() => handleEditClick(index, address)} className="edit-btn">Edit</button>
                  <button onClick={() => handleRemove(index)} className="remove-btn">Remove</button>
                  {!address.primary && (
      <button 
        onClick={() => handleSetPrimary(index)} 
        className="primary-btn"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? (
          <Spinner size="16px" color="#ffffff" /> 
        ) : (
          'Set as Primary'
        )}
      </button>)}
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
              <input type="text" name="address" value={newAddress.address} onChange={handleNewInputChange} placeholder="Address" />
              <input type="text" name="city" value={newAddress.city} onChange={handleNewInputChange} placeholder="City" />
              <input type="text" name="state" value={newAddress.state} onChange={handleNewInputChange} placeholder="State" />
              <input type="text" name="zipCode" value={newAddress.zipCode} onChange={handleNewInputChange} placeholder="Zip Code" />
              <input type="text" name="country" value={newAddress.country} onChange={handleNewInputChange} placeholder="Country" />
              <input type="text" name="phone" value={newAddress.phone} onChange={handleNewInputChange} placeholder="Phone" />
              <button onClick={handleNewSaveClick} className="save-btn">Save New Address</button>
              <button onClick={handleNewCancelClick} className="cancel-btn">Cancel</button>
            </div>
          ) : (
            <button onClick={handleAddClick} className="add-btn">Add New Address</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addresses;
