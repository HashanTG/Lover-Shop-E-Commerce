import React from "react";
import "./FAQs.css";

const FAQs = () => {
  return (
    <div className="faqs">
      <div className="faqs_container">
        <h1>Frequently Asked Questions (FAQs)</h1>
        <p>
          Here are some common questions our customers ask. If you don't find
          what you're looking for, please feel free to reach out.
        </p>
        <br/>
        <h2>General Questions</h2>
        <h3>What is your return policy?</h3>
        <p>Our return policy allows returns within 30 days of purchase.</p>

        <h3>How do I track my order?</h3>
        <p>
          You will receive a tracking number via email once your order is
          shipped. You can use this number to track your shipment.
        </p>

        <br/>
        <h2>Shipping Questions</h2>
        <h3>Do you ship internationally?</h3>
        <p>We currently do not offer international shipping.</p>

        <h3>How much does shipping cost?</h3>
        <p>Shipping costs vary depending on the shipping method selected at checkout.</p>

        <h3>How long does delivery take?</h3>
        <p>Delivery time depends on the shipping method chosen. Standard shipping typically takes 5-7 business days.</p>

       
        <br/>
        <h3><a href="/contactus">Contact Us</a></h3>
        <div className="contact">
          <p>
            For additional questions, please contact us at{" "}
            <strong>rosalover107@gmail.com</strong> or call us at  {" "} <br /> 
            <strong>+94 78 256 3766</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
