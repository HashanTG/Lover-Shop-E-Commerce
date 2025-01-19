import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/users";

export const getUserDetailFromAPI = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/details`, { withCredentials: true });
        console.log(response.data);
        return response.data; // Return user detail data
    } catch (error) {
        console.error("Error fetching user details:", error);
        return null; // Return null if the request fails
    }
}

export const updateUserDetailToAPI = async (userDetail) => {
    try {
        const response = await axios.put(`${BASE_URL}/details`, userDetail, { withCredentials: true });
        console.log(response.data);
        return response.data; // Return updated user detail data
    } catch (error) {
        console.error("Error updating user details:", error);
        return null; // Return null if the request fails
    }
}
