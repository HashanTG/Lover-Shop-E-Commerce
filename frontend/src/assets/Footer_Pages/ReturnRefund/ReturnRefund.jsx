import React from "react";
import "./ReturnRefund.css";

const ReturnAndRefund = () => {
  return (
    <div className="return_refundPolicy">
      <div className="return_refundPolicy_container">
        <h1>Return & Refund Policy</h1>
        <p>
          Thank you for shopping at <strong>Rosa Lovers</strong>. If you are not
          entirely satisfied with your purchase, we're here to help.
        </p>

        <h2>Returns</h2>
        <h3>Return Timeframe</h3>
        <p>
          You have 30 calendar days to return an item from the date you
          received it.
        </p>
        <p>
          To be eligible for a return, your item must be unused and in the
          same condition that you received it.
        </p>

        <h3>Return Process</h3>
        <p>
          To initiate a return, please contact our customer service team at{" "}
          <strong><a href="/contactus">rosalover107@gmail.com</a></strong>. We will guide you through
          the return process.
        </p>

        <h2>Refunds</h2>
        <h3>Refund Timeframe</h3>
        <p>
          Once we receive and inspect your return, we will notify you about
          the approval or rejection of your refund. If approved, the refund will
          be processed to your original method of payment within 7-10 business days.
        </p>

        <h3>Non-Refundable Items</h3>
        <p>Some items are non-refundable, including:</p>
        <ul>
          <li>Gift cards</li>
          <li>Discounted items</li>
        </ul>

        <h3>Contact Us</h3>
        <div className="contact">
          <p>
            For any questions regarding our Return and Refund Policy, please
            contact us at <strong><a href="/contactus">rosalover107@gmail.com</a></strong> or call us at{" "}
            <strong>+94 78 256 3766</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnAndRefund;
