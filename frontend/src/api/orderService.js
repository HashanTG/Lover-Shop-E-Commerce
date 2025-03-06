import axios from 'axios';
import { config } from '../config';
import { paymentWithStripe } from './paymentService';

const API_URL = `${config.apiUrl}/api/orders`; 
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Qz9QKR5S1kTqIU94IEEBgnxwtoGGqL1321lJJPVARjTslkOmTjpJpr5Ex51lPlHUGTxQA3MfwTv8d1gmzUouFKW00OvNxc9sl');  // Replace with your Stripe public key

export const placeOrder = async (cartItems, totalAmount, address, payment, receiver) => {

  let paymentIntentId = null;
  let status  = "PENDING";

  // Step 1: Create PaymentIntent (Backend call)
  if (payment.paymentMethod === 'card') {
    const paymentData = {
      amount: totalAmount,
      currency: 'usd',
      paymentMethodId: payment.paymentMethodId, // ID from the frontend (Stripe)
    };

    try {
      const paymentIntent = await paymentWithStripe(paymentData);  // Get paymentIntent from backend

      // Store the paymentIntentId from the response
      console.log(paymentIntent);
      paymentIntentId = paymentIntent.clientSecret;      ;

      // Optionally, you can store payment status or other relevant info in paymentDetails
      payment.paymentIntentId = paymentIntentId;

  

      if (paymentIntent.status === "succeeded") {
        console.log("Payment successful!");

        status = "PAID";
        // Proceed to create the order now that payment is confirmed
        const orderResponse = await createOrder(cartItems, totalAmount, address, payment, receiver,status);
        return orderResponse;  // Order placed successfully
      } else {
        console.log("throwing the error")
        throw new Error('Payment was not successful');
      }

    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;  // Handle error in UI
    }
  }
  else {
    // Proceed to create the order now that payment is confirmed
    const orderResponse = await createOrder(cartItems, totalAmount, address, payment, receiver,status);
    return orderResponse;  // Order placed successfully
  }
};

// Function to place the order
const createOrder = async (cartItems, totalAmount, address, payment, receiver,status) => {
  const orderPayload = {
    userId: null,  // User ID (dynamically set)
    items: cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.productDetails.price,
      variation: item.variation,
    })),
    total: totalAmount,
    status: 'PENDING',  // Default order status
    paymentStatus: status,  // Set payment status as successful
    createdAt: new Date().toISOString(),
    lastUpdatedAt: new Date().toISOString(),
    confirmedByUser: false,
    updatedBy: null,
    shippingAddress: address,
    paymentDetails: payment,
    recieveDetail: receiver,
  };


  try {
    const response = await axios.post(`${API_URL}`, orderPayload, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;  // Return order response
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;  // Handle error in UI
  }
};

// Get User Orders
export const getOrder = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      withCredentials: true, // If using authentication
    });
    console.log("response");
    console.log(response);
    return response.data; // Handle success
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Handle error in UI
  }
}

export const confirmOrder = async (orderId) => {
  try {
    console.log(orderId);
    const response = await axios.put(`${API_URL}/${orderId}/confirm`, {}, {
      withCredentials: true, // If using authentication
    });

    return response.data; // Handle success
  } catch (error) {
    console.error('Error confirming order:', error);
    throw error; // Handle error in UI
  }
}

// ADMIN PART

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
