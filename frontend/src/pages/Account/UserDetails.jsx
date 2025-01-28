import React, { useState } from "react";
import { useUserDetail } from "../../context/UserDetailContext";
import { useAlert } from "../../context/GlobalAlertContext";
import "./UserDetails.css";

const UserDetails = () => {
  const { userDetail, updateUserDetail } = useUserDetail();
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({ ...userDetail });

  const {showAlert} = useAlert();//For showing alerts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedCardJson = { cardDetails: editableUser };
      await updateUserDetail(updatedCardJson); // Call the update function from context
      showAlert("User Updated Successfully")
      setIsEditing(false);

    } catch (error) {
      console.error("Failed to update user details:", error);
      showAlert("Failed to update user details. Please try again.");
    }
  };

  const handleCancel = () => {
    // Revert to original userDetail values and exit edit mode
    setEditableUser({ ...userDetail });
    setIsEditing(false);
  };

  if (!userDetail) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={editableUser.firstName || "Not Set"}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={editableUser.lastName || "Not Set"}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={editableUser.phoneNumber || "Not Set"}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-group">
          {!isEditing ? (
            <button
              type="button"
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                className="save-button"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
