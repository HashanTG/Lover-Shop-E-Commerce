import axios from 'axios';


const API_URL = 'http://localhost:8080/api/wishlist'; // Replace with your backend API URL 

export const getWishList = async () => {
    try {
        const response = await axios.get(`${API_URL}/detail`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }
}