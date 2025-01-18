import React, { createContext, useState, useEffect, useContext } from "react";

// Create the UserDetailContext
const UserDetailContext = createContext();

// UserDetailProvider component to wrap your app
export const UserDetailProvider = ({ children }) => {
    const [userDetail, setUserDetail] = useState(null);

    // Function to fetch user details from backend
    useEffect(() => {
        const fetchUserDetail = async () => {
            // Assuming you have an API call to get the user details
            const detail = await getUserDetailFromAPI(); 
            setUserDetail(detail);
        };

        fetchUserDetail();
    }, []);

    // Function to update user details
    const updateUserDetail = async (updatedDetail) => {
        const updated = await updateUserDetailOnAPI(updatedDetail);
        setUserDetail(updated);
    };

    return (
        <UserDetailContext.Provider value={{ userDetail, updateUserDetail }}>
            {children}
        </UserDetailContext.Provider>
    );
};

// Hook for consuming the UserDetailContext
export const useUserDetail = () => useContext(UserDetailContext);
