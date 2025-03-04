import axios from 'axios';
import { config } from '../config';

const API_URL = `${config.apiUrl}/api/orders`; // Replace with your backend API URL

export const placeOrder = async (cartItems, totalAmount,address,payment,reciever) => {
  try {
    const orderPayload = {
      userId:null,
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.productDetails.price,
      })),
      total: totalAmount,
      status: 'PENDING', // Default order status
      paymentStatus: 'PENDING', // Default payment status
      createdAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      confirmedByUser: false,
      updatedBy: null,
      shippingAddress:address,
      paymentDetails:payment,
      recieveDetail:reciever
    };

    const response = await axios.post(`${API_URL}`, orderPayload, {
      withCredentials: true, // If using authentication
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data; // Handle success (e.g., navigate to confirmation page)
  } catch (error) {
    console.error('Error placing order:', error);
    throw error; // Handle error in UI
  }
};

//Get User Orders
export const getOrder = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      withCredentials: true, // If using authentication
    });
    console.log("response")
    console.log(response);
    return response.data; // Handle success
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Handle error in UI
  }
}


export const confirmOrder = async (orderId) => {
  try {
    console.log(orderId)
    const response = await axios.put(`${API_URL}/${orderId}/confirm`,{}, {
      withCredentials: true, // If using authentication
    });

    return response.data; // Handle success
  } catch (error) {
    console.error('Error confirming order:', error);
    throw error; // Handle error in UI
  }
}

//ADMIN PART

export const getAllOrders = async (page = 0, size = 5, sortBy = 'createdAt', sortDir = 'DESC') => {
  try {
    
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`, {
      withCredentials: true, // If using authentication
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data; // Handle success
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Handle error in UI
  }
};


export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}/status?status=${newStatus}`, {}, {
      withCredentials: true, // If using authentication
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data; // Handle success
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error; // Handle error in UI
  }
}