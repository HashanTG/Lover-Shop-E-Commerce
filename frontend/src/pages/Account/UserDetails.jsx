import React, { useState, useEffect } from "react";
import { useUserDetail } from "../../context/UserDetailContext";
import { useAlert } from "../../context/GlobalAlertContext";
import Spinner from "../../components/Spinner/Spinner";
import "./UserDetails.css";

const UserDetails = () => {
  const { showAlert } = useAlert(); //For showing alerts

  const { userDetail, updateUserDetail } = useUserDetail();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
  });

  // Initialize `editableUser` with `userDetail` properties
  useEffect(() => {
    if (userDetail) {
      setEditableUser({
        firstName: userDetail.firstName || "",
        lastName: userDetail.lastName || "",
        phoneNo: userDetail.phoneNo || "",
      });
    }
  }, [userDetail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedCardJson = { ...editableUser };
      await updateUserDetail(updatedCardJson);
      showAlert("User Updated Successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user details:", error);
      showAlert("Failed to update user details. Please try again.");
    }
    finally{
      setIsLoading(false);
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
            value={editableUser.firstName}
            placeholder="Not Set"
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={editableUser.lastName}
            placeholder="Not Set"
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNo"
            value={editableUser.phoneNumber}
            placeholder="Not Set"
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-group">
          {!isEditing ? (
            <button
              type="button"
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                className="save-btn"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? <Spinner size="16px" color="#ffffff" /> : "Save"}
              </button>
              <button
                type="button"
                className="cancel-btn"
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
