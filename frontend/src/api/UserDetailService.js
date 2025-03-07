import axios from 'axios';
import { config } from '../config';

const URL = `${config.apiUrl}/api/users`;

//Get User Info
export const getUserDetailFromAPI = async () => {
    try {
        const response = await axios.get(`${URL}/details`, { withCredentials: true });

        return response.data; // Return user detail data
    } catch (error) {
        console.error("Error fetching user details:", error);
        return null; // Return null if the request fails
    }
}

//Update User Info
export const updateUserDetailToAPI = async (userDetail) => {
    try {
        const response = await axios.put(`${URL}/details`, userDetail, { withCredentials: true });

        return response.data; // Return updated user detail data
    } catch (error) {
        console.error("Error updating user details:", error);
        return null; // Return null if the request fails
    }
}
