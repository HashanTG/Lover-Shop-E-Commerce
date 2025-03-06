import axios from "axios";
import { config } from "../config";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe instance
const stripe = await loadStripe(
  "pk_test_51Qz9QKR5S1kTqIU94IEEBgnxwtoGGqL1321lJJPVARjTslkOmTjpJpr5Ex51lPlHUGTxQA3MfwTv8d1gmzUouFKW00OvNxc9sl"
); // Replace with your actual publishable key

const API_URL = `${config.apiUrl}/api/payment`;
export const paymentWithStripe = async (paymentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/create-payment-intent`,
      paymentData,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    console.log(response.data);
    return response.data; // Handle success (response should include clientSecret)
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error; // Handle error in UI
  }
};


