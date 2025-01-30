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
