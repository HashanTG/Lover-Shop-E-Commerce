import React, { createContext, useState, useContext } from "react";
import { getUserDetailFromAPI } from "../api/UserDetailService";

// Create the UserDetailContext
const UserDetailContext = createContext();

// UserDetailProvider component to wrap your app
export const UserDetailProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState(null);

  // Function to fetch user details from backend

  const fetchUserDetail = async () => {
    // Assuming you have an API call to get the user details
    const detail = await getUserDetailFromAPI();
    setUserDetail(detail);
  };

  // Function to update user details
//   const updateUserDetail = async (updatedDetail) => {
//     const updated = await updateUserDetailOnAPI(updatedDetail);
//     setUserDetail(updated);
//   };

  return (
    <UserDetailContext.Provider value={{ userDetail,setUserDetail,fetchUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
};

// Hook for consuming the UserDetailContext
export const useUserDetail = () => useContext(UserDetailContext);
