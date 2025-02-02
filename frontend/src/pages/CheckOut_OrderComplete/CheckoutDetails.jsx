import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutDetails.css";
//Component
import OrderProgress from "../../components/OrderProgress/OrderProgress";
import Spinner from "../../components/Spinner/Spinner";
//Context
import { CartContext } from "../../context/CartContext";
import { useUserDetail } from "../../context/UserDetailContext";
//Api Service
import { placeOrder } from "../../api/orderService";

const CheckoutDetails = () => {
  //Navigation
  const navigate = useNavigate();
  //Context API
  const { cartItems } = useContext(CartContext);
  const { userDetail } = useUserDetail();
  //Loading States
  const [loading, setLoading] = useState(false);

  // Extract fee details from local storage
  const [fee, setFee] = useState(() => {
    const savedFee = localStorage.getItem("feeDetails");
    return savedFee ? JSON.parse(savedFee) : null;
  });

  // Extract primary address & card
  const primaryAddress =
    userDetail?.addresses?.find((addr) => addr.primary) ||
    userDetail?.addresses?.[0];
  const primaryCard =
    userDetail?.cardDetails?.find((card) => card.primary) ||
    userDetail?.cardDetails?.[0];

  const [selectedAddress, setSelectedAddress] = useState(primaryAddress);
  const [selectedCard, setSelectedCard] = useState(primaryCard);

  // Form state. Load user details if available
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
    cardNumber: primaryCard?.cardNumber || "",
    expiryDate: primaryCard?.expirationDate || "",
    cvv: primaryCard?.cvv || "",
    paymentMethod: "credit",
  });
  //Update the Selected Address
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
  //Update Selected Card
  useEffect(() => {
    if (selectedCard) {
      setFormData((prev) => ({
        ...prev,
        cardNumber: selectedCard.cardNumber,
        expiryDate: selectedCard.expirationDate,
        cvv: selectedCard.cvv,
      }));
    }
  }, [selectedCard]);

  //Set the Form Data State
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Handle the submitting
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payment = {
        paymentMethod:
          formData.paymentMethod === "credit" ? "credit_card" : "cod",
        cardLast4Digits:
          formData.paymentMethod === "credit"
            ? selectedCard.cardNumber.slice(-4) // Extract last 4 digits
            : null,
        cardExpiry:
          formData.paymentMethod === "credit"
            ? selectedCard.expirationDate
            : null, // Use MM/YY format
      };

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
      }
      const orderData = await placeOrder(
        cartItems,
        fee?.total,
        reciverAdrress,
        payment,
        reciever
      );
      navigate("/order-complete", { state: { orderData } });
    } catch (error) {
      console.error("Order placement failed:", error);
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

            {/* Address Details Inputs */}

  <div className="address-details">
    <label>Street Address</label>
    <input
      type="text"
      name="streetAddress"
      value={formData.streetAddress || ""}
      onChange={handleInputChange}
    />

    <label>Country</label>
    <input
      type="text"
      name="country"
      value={formData.country || ""}
      onChange={handleInputChange}
    />

    <label>State</label>
    <input
      type="text"
      name="state"
      value={formData.state || ""}
      onChange={handleInputChange}
    />

    <label>City</label>
    <input
      type="text"
      name="city"
      value={formData.city || ""}
      onChange={handleInputChange}
    />

    <label>Zip Code</label>
    <input
      type="text"
      name="zipCode"
      value={formData.zipCode || ""}
      onChange={handleInputChange}
    />
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
                <select
                  onChange={(e) =>
                    setSelectedCard(
                      userDetail?.cardDetails?.find(
                        (card) => card.cardNumber === e.target.value
                      )
                    )
                  }
                >
                  {userDetail?.cardDetails?.map((card, index) => (
                    <option key={index} value={card.cardNumber}>
                      **** **** **** {card.cardNumber.slice(-4)}
                    </option>
                  ))}
                </select>
{/* 
                <div className="card-details">
                  <div className="input-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="input-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div> */}
              </>
            )}
          </section>

          <button type="submit" className="place-order-btn">
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

export default CheckoutDetails;
