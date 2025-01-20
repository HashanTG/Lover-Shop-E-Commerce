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

export const removeFromWishlistAPI = async (itemId) => {
    try {
        const response = await axios.delete(`${API_URL}/remove?productId=${itemId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error removing item from wishlist:', error);
        throw error;
    }

} 

export const addToWishlistAPI = async (productId) => {
    try {
        const response = await axios.post(`${API_URL}/add?productId=${productId}`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error adding item to wishlist:', error);
        throw error;
    }
}