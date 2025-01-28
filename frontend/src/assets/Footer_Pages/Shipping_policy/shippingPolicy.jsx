import React from "react";
import "./ShippingPolicy.css";

const ShippingPolicy = () => {
  return (
    <div className="shipping_policy">
      <div className="shipping_policy_container">
        <h1>Shipping Policy</h1>
        <p>
          Thank you for visiting and shopping at <strong>Rosa Lovers</strong>. Following are the terms and conditions that constitute our Shipping Policy.
        </p>

        <section className="policy_section">
          <h2>Domestic Shipping Policy</h2>
          <div className="policy_subsection">
            <h3>Shipment Processing Time</h3>
            <p>
              All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
            </p>
            <p>
              If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.
            </p>
          </div>
          <div className="policy_subsection">
            <h3>Shipping Rates & Delivery Estimates</h3>
            <p>
              Shipping charges for your order will be calculated and displayed at checkout.
            </p>
            <ul>
              <li>
                <span>Standard Shipping:</span> 5-7 business days - <strong>$5.99</strong>
              </li>
              <li>
                <span>Expedited Shipping:</span> 2-3 business days - <strong>$9.99</strong>
              </li>
              <li>
                <span>Overnight Shipping:</span> 1 business day - <strong>$19.99</strong>
              </li>
            </ul>
            <p>Delivery delays can occasionally occur.</p>
          </div>
        </section>

        <section className="policy_section">
          <h2>International Shipping Policy</h2>
          <p>We currently do not ship outside [Country].</p>
        </section>

        <section className="policy_section">
          <h3>Contact Us</h3>
          <p>
            If you have any questions regarding our shipping policy, please contact us at <strong>support@rosalovers.com</strong> or call us at <strong>+94 78 256 3766</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
