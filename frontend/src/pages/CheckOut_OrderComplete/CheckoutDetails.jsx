// CheckoutDetails.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderProgress from '../../components/OrderProgress/OrderProgress';
import { CartContext } from '../../context/CartContext';
import './CheckoutDetails.css';

const CheckoutDetails = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    streetAddress: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paypalEmail: '',
    useAsBilling: false,
    paymentMethod: 'credit'
  });

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0);
    const shipping = 245.00;
    return (subtotal + shipping).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shippingDetails: formData,
          orderItems: cartItems,
          totalAmount: calculateTotal()
        })
      });

      if (response.ok) {
        const orderData = await response.json();
        navigate('/order-complete', { state: { orderData } });
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="checkout-container">
      <OrderProgress step={2} />
      <div className="checkout-layout">
        <form onSubmit={handleSubmit} className="checkout-form">
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
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </section>

          <section className="shipping-address">
            <h3>Shipping Address</h3>
            <div className="input-group">
              <label htmlFor="streetAddress">Street Address</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Country</option>
                <option value="IN">India</option>
                <option value="CN">China</option>
                <option value="JP">Japan</option>
                <option value="KR">South Korea</option>
                <option value="VN">Vietnam</option>
                <option value="TH">Thailand</option>
                <option value="PH">Philippines</option>
                <option value="MY">Malaysia</option>
                <option value="ID">Indonesia</option>
                <option value="PK">Pakistan</option>
                <option value="BD">Bangladesh</option>
                <option value="LK">Sri Lanka</option>
              </select>
            </div>
            <div className="form-row three-columns">
              <div className="input-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </section>

          <section className="payment-method">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleInputChange}
                />
                <span className="radio-label">Credit Card</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleInputChange}
                />
                <span className="radio-label">PayPal</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                />
                <span className="radio-label">Cash on Delivery</span>
              </label>
            </div>

            {formData.paymentMethod === 'credit' && (
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
                      placeholder="MM/YY"
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
              </div>
            )}

            {formData.paymentMethod === 'paypal' && (
              <div className="paypal-form">
                <div className="input-group">
                  <label htmlFor="paypalEmail">PayPal Email</label>
                  <input
                    type="email"
                    id="paypalEmail"
                    name="paypalEmail"
                    value={formData.paypalEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}
          </section>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p className="item-price">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <div className="subtotal">
              <span>Subtotal</span>
              <span>Rs. {calculateTotal()}</span>
            </div>
            <div className="shipping">
              <span>Shipping</span>
              <span>Rs. 245.00</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>Rs. {calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
