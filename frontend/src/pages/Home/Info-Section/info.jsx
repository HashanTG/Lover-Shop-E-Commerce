import React from 'react'
import './info.css'
import fastDelivery from "../../../assets/Home/info/fastdelivery.svg"
import lock from "../../../assets/Home/info/lock.svg"
import money from "../../../assets/Home/info/money.svg"
import call from "../../../assets/Home/info/call.png"

function info() {
  return (
    <div className="info_section">
        <div className="info_cards">
            <img src={fastDelivery} alt="Free Shipping" />
            <h3>Free Shipping</h3>
            <p>Order above $200</p>
        </div>
        <div className="info_cards">
        <img src={money} alt="Money Back" />
            <h3>Money-back</h3>
            <p>Order above $200</p>
        </div>
        <div className="info_cards">
        <img src={lock} alt="Secure payment" />
            <h3>Secure Payments</h3>
            <p>Secured by Stripe</p>
        </div>
        <div className="info_cards">
        <img src={call} alt="Email" />
            <h3>24/7 Support</h3>
            <p>Phone and Email support</p>
        </div>

    </div>
  )
}

export default info