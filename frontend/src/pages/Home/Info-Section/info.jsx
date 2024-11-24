import React from 'react'
import './info.css'

function info() {
  return (
    <div className="info_section">
        <div className="info_cards">
            <h3>Free Shipping</h3>
            <p>Order above $200</p>
        </div>
        <div className="info_cards">
            <h3>Money-back</h3>
            <p>Order above $200</p>
        </div>
        <div className="info_cards">
            <h3>Secure Payments</h3>
            <p>Secured by Stripe</p>
        </div>
        <div className="info_cards">
            <h3>24/7 Support</h3>
            <p>Phone and Email support</p>
        </div>

    </div>
  )
}

export default info