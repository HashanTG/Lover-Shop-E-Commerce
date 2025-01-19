import React from "react";
import { useUserDetail } from "../../context/UserDetailContext";
import "./UserDetails.css";

const UserDetails = () => {
  const { userDetail } = useUserDetail();

  if (!userDetail) {
    // Display a loading state or fallback UI
    return <p>Loading user details...</p>;
  }

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" value={userDetail.firstName || ""} readOnly />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={userDetail.lastName || ""} readOnly />
        </div>
        {/* Uncomment and ensure the context has an `email` property */}
        {/* <div className="form-group">
          <label>Email</label>
          <input type="email" value={userDetail.email || ""} readOnly />
        </div> */}
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" value={userDetail.phoneNumber || ""} readOnly />
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
