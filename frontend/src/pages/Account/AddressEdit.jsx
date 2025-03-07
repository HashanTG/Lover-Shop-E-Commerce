// components/UserDetails.jsx
import React from 'react';
import './address.css'

const UserDetails = () => {
  return (
    <div className="user-details">
      <h2>Address</h2>
      <form>
        <div className="form-group">
          <label>FULL NAME</label>
          <input type="text" placeholder="Full Name" />
        </div>
        <div className="form-group">
          <label>ADDRESS</label>
          <input type="text" placeholder="Address" />
        </div>
        <div className="form-group">
          <label>CITY</label>
          <input type="text" placeholder="City" />
        </div>
        <div className="form-group">
          <label>STATE/PROVINCE/REGION</label>
          <input type="text" placeholder="State/Province/Region" />
        </div>
        <div className="form-group">
          <label>ZIP/POSTAL CODE</label>
          <input type="text" placeholder="Zip/Postal Code" />
        </div>
        <div className="form-group">
          <label>COUNTRY</label>
          <input type="text" placeholder="Country" />
        </div>
        <button className="save-button">Save changes</button>
      </form>
    </div>
  );
};

export default UserDetails;
