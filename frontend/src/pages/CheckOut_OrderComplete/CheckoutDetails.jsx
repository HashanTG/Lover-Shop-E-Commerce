import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutDetails.css";
// Stripe Imports
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// Components
import OrderProgress from "../../components/OrderProgress/OrderProgress";
import Spinner from "../../components/Spinner/Spinner";
// Context
import { CartContext } from "../../context/CartContext";
import { useUserDetail } from "../../context/UserDetailContext";
// API Service
import { placeOrder } from "../../api/orderService";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51Qz9QKR5S1kTqIU94IEEBgnxwtoGGqL1321lJJPVARjTslkOmTjpJpr5Ex51lPlHUGTxQA3MfwTv8d1gmzUouFKW00OvNxc9sl"
); // Replace with your Stripe publishable key

const CheckoutDetails = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { userDetail } = useUserDetail();
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const validateFirstName = (firstName) => {
    if (!firstName) return "First name is required";
    return "";
  };

  const validateLastName = (lastName) => {
    if (!lastName) return "Last name is required";
    return "";
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "Phone number is required";
    if (!/^\d{10}$/.test(phoneNumber)) return "Phone number is invalid"; // Example: 10 digits
    return "";
  };

  const validateStreetAddress = (streetAddress) => {
    if (!streetAddress) return "Street address is required";
    return "";
  };

  const validateCountry = (country) => {
    if (!country) return "Country is required";
    return "";
  };

  const validateState = (state) => {
    if (!state) return "State is required";
    return "";
  };

  const validateCity = (city) => {
    if (!city) return "City is required";
    return "";
  };

  const validateZipCode = (zipCode) => {
    if (!zipCode) return "Zip code is required";
    if (!/^\d{5}$/.test(zipCode)) return "Zip code is invalid"; // Example: 5 digits
    return "";
  };

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  // Fee details from local storage
  const [fee, setFee] = useState(() => {
    const savedFee = localStorage.getItem("feeDetails");
    return savedFee ? JSON.parse(savedFee) : null;
  });

  // Primary address & card
  const primaryAddress =
    userDetail?.addresses?.find((addr) => addr.primary) ||
    userDetail?.addresses?.[0];
  const primaryCard =
    userDetail?.cardDetails?.find((card) => card.primary) ||
    userDetail?.cardDetails?.[0];

  const [selectedAddress, setSelectedAddress] = useState(primaryAddress);
  const [selectedCardId, setSelectedCardId] = useState(
    primaryCard?.paymentMethodId || "new"
  ); // Default to primary card
  const [useNewCard, setUseNewCard] = useState(!primaryCard); // Only true if no primary card exists

  // Form state
  const [formData, setFormData] = useState({
    firstName: userDetail?.firstName || "",
    lastName: userDetail?.lastName || "",
    phoneNumber: userDetail?.phoneNo || "",
    email: "",
    streetAddress: primaryAddress?.address || "",
    country: primaryAddress?.country || "",
    state: primaryAddress?.state || "",
    city: primaryAddress?.city || "",
    zipCode: primaryAddress?.zipCode || "",
    paymentMethod: "credit", // Default to credit
  });

  // Update selected address
  useEffect(() => {
    if (selectedAddress) {
      setFormData((prev) => ({
        ...prev,
        streetAddress: selectedAddress.address,
        city: selectedAddress.city,
        state: selectedAddress.state,
        zipCode: selectedAddress.zipCode,
        country: selectedAddress.country,
        phoneNumber: selectedAddress.phone,
      }));
    }
  }, [selectedAddress]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate and update errors
    let errorMessage = "";
    switch (name) {
      case "firstName":
        errorMessage = validateFirstName(value);
        break;
      case "lastName":
        errorMessage = validateLastName(value);
        break;
      case "phoneNumber":
        errorMessage = validatePhoneNumber(value);
        break;
      case "streetAddress":
        errorMessage = validateStreetAddress(value);
        break;
      case "country":
        errorMessage = validateCountry(value);
        break;
      case "state":
        errorMessage = validateState(value);
        break;
      case "city":
        errorMessage = validateCity(value);
        break;
      case "zipCode":
        errorMessage = validateZipCode(value);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  // Handle card selection
  const handleCardChange = (e) => {
    const value = e.target.value;
    setSelectedCardId(value);
    setUseNewCard(value === "new");
  };

  // Handle form submission with Stripe
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const firstNameError = validateFirstName(formData.firstName);
    const lastNameError = validateLastName(formData.lastName);
    const phoneNumberError = validatePhoneNumber(formData.phoneNumber);
    const streetAddressError = validateStreetAddress(formData.streetAddress);
    const countryError = validateCountry(formData.country);
    const stateError = validateState(formData.state);
    const cityError = validateCity(formData.city);
    const zipCodeError = validateZipCode(formData.zipCode);

    try {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        phoneNumber: phoneNumberError,
        streetAddress: streetAddressError,
        country: countryError,
        state: stateError,
        city: cityError,
        zipCode: zipCodeError,
      });

      // If there are errors, stop the submission
      if (
        firstNameError ||
        lastNameError ||
        phoneNumberError ||
        streetAddressError ||
        countryError ||
        stateError ||
        cityError ||
        zipCodeError
      ) {
        return;
      }
      let paymentData;

      if (formData.paymentMethod === "credit") {
        if (!stripe || !elements) {
          setLoading(false);
          return; // Stripe.js hasn’t loaded
        }

        if (useNewCard) {
          // Create new PaymentMethod with Stripe
          const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
          });

          if (error) {
            console.error("Stripe error:", error);
            alert(error.message);
            setLoading(false);
            return;
          }

          paymentData = {
            paymentMethodId: paymentMethod.id,
            paymentMethod: "card",
          };
        } else {
          // Use selected saved card
          paymentData = {
            paymentMethodId: selectedCardId,
            paymentMethod: "card",
          };
        }
      } else {
        paymentData = { paymentMethod: "cod" }; // Cash on Delivery
      }

      const reciever = {
        recieverFirstName: formData.firstName,
        recieverLastName: formData.lastName,
      };

      const reciverAdrress = {
        address: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phoneNumber,
      };

      const orderData = await placeOrder(
        cartItems,
        fee?.total,
        reciverAdrress,
        paymentData,
        reciever
      );

      for (const item of cartItems) {
        await removeFromCart(item.productId, item.variation);
      }
      console.log("Order placed successfully:", orderData);
      navigate("/order-complete", { state: { orderData } });
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <OrderProgress step={2} />
      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
          {/* Contact Information */}
          <section className="contact-information">
            <h3>Contact Information</h3>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                {errors.firstName && (
                  <p className="error-message">{errors.firstName}</p>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                {errors.lastName && (
                  <p className="error-message">{errors.lastName}</p>
                )}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              {errors.phoneNumber && (
                <p className="error-message">{errors.phoneNumber}</p>
              )}
            </div>
          </section>

          {/* Shipping Address Selection */}
          <section className="shipping-address">
            <h3>Shipping Address</h3>
            <select
              onChange={(e) =>
                setSelectedAddress(
                  userDetail?.addresses?.find(
                    (addr) => addr.address === e.target.value
                  )
                )
              }
            >
              {userDetail?.addresses?.map((addr, index) => (
                <option key={index} value={addr.address}>
                  {addr.address}, {addr.city}, {addr.state}
                </option>
              ))}
            </select>

            <div className="address-details">
              <label>Street Address</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress || ""}
                onChange={handleInputChange}
              />
              {errors.streetAddress && (
                <p className="error-message">{errors.streetAddress}</p>
              )}
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country || ""}
                onChange={handleInputChange}
              />
              {errors.country && (
                <p className="error-message">{errors.country}</p>
              )}
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state || ""}
                onChange={handleInputChange}
              />
              {errors.state && <p className="error-message">{errors.state}</p>}
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city || ""}
                onChange={handleInputChange}
              />
              {errors.city && <p className="error-message">{errors.city}</p>}
              <label>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode || ""}
                onChange={handleInputChange}
              />
              {errors.zipCode && (
                <p className="error-message">{errors.zipCode}</p>
              )}
            </div>
          </section>

          {/* Payment Method */}
          <section className="payment-method">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === "credit"}
                  onChange={handleInputChange}
                />
                <span className="radio-label">Credit Card</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleInputChange}
                />
                <span className="radio-label">Cash on Delivery</span>
              </label>
            </div>

            {formData.paymentMethod === "credit" && (
              <>
                <h4>Select Card</h4>
                <select value={selectedCardId} onChange={handleCardChange}>
                  {userDetail?.cardDetails?.map((card, index) => (
                    <option key={index} value={card.paymentMethodId}>
                      {card.brand.toUpperCase()} **** **** ****{" "}
                      {card.last4 || "N/A"} (Expires:{" "}
                      {card.expirationDate || "N/A"})
                      {card.isPrimary ? " (Primary)" : ""}
                    </option>
                  ))}
                  <option value="new">Add New Card</option>
                </select>

                {!useNewCard && (
                  <div className="card-preview">
                    <p>
                      Selected Card:{" "}
                      {userDetail?.cardDetails
                        ?.find(
                          (card) => card.paymentMethodId === selectedCardId
                        )
                        ?.brand.toUpperCase() || "N/A"}{" "}
                      **** **** ****{" "}
                      {userDetail?.cardDetails?.find(
                        (card) => card.paymentMethodId === selectedCardId
                      )?.last4 || "N/A"}
                    </p>
                    <p>
                      Expires:{" "}
                      {userDetail?.cardDetails?.find(
                        (card) => card.paymentMethodId === selectedCardId
                      )?.expirationDate || "N/A"}
                    </p>
                    <p>
                      Cardholder:{" "}
                      {userDetail?.cardDetails?.find(
                        (card) => card.paymentMethodId === selectedCardId
                      )?.cardHolderName || "N/A"}
                    </p>
                  </div>
                )}

                {useNewCard && (
                  <div className="card-details">
                    <h4>Enter New Card Details</h4>
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": { color: "#aab7c4" },
                          },
                          invalid: { color: "#9e2146" },
                        },
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </section>

          <button
            type="submit"
            className="place-order-btn"
            disabled={loading || !stripe}
          >
            {loading ? <Spinner size="20px" /> : "Place Order"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="summary-item">
                <img
                  src={item.productDetails.images[0]}
                  alt={item.productDetails.name}
                />
                <div className="item-details">
                  <h4>{item.productDetails.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p className="item-price">
                    Rs. {(item.productDetails.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>Rs. {fee?.subtotal}</span>
            </div>
            <div className="shipping">
              <span>Shipping</span>
              <span>{fee?.shipping}</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>Rs. {fee?.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the component with Stripe Elements
const CheckoutDetailsWithStripe = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutDetails {...props} />
  </Elements>
);

export default CheckoutDetailsWithStripe;
