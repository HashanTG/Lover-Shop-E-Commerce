import React from 'react';
import './UserDetails.css';


const UserDetails = () => {
  // Dummy user data (replace with actual user data or state management)
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '+1234567890',
  };

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input type="text" value={user.firstName} readOnly />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" value={user.lastName} readOnly />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={user.email} readOnly />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" value={user.phoneNumber} readOnly />
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
