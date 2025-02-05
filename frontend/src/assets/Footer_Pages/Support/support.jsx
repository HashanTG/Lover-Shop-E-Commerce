import React from "react";
import "./support.css";

const SupportPage = () => {
  return (
    <div className="support_page">
      <div className="support_container">
        <h1>Welcome to Rosa Lover Support</h1>
        <p>
          We're here to help with any questions or concerns you may have. Reach
          out to us anytime!
        </p>

        <section>
          <h2>Frequently Asked Questions (FAQs)</h2>
          <ul>
            <li>
              <strong>Q: How do I track my order?</strong>
              <p>
                A: You can track your order by logging into your account and
                clicking on the "Track Order" button under your recent orders.
              </p>
            </li>
            <li>
              <strong>Q: What is your return policy?</strong>
              <p>
                A: Please refer to our <a href="/return_refund">Return Policy</a>{" "}
                for detailed information.
              </p>
            </li>
            <li>
              <strong>Q: How can I contact customer support?</strong>
              <p>
                A: You can reach out to us via email at{" "}
                <a href="/contactus">rosalover107@gmail.com</a>{" "}
                or call us at +94 78 256 3766.
              </p>
            </li>
            <li>
              <strong>Q: Do you ship internationally?</strong>
              <p>
                A: At the moment, we only ship within [Country]. Stay tuned for
                updates!
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2>Contact Our Support Team</h2>
          <p>
            If your issue isn’t covered in the FAQs, our support team is happy
            to assist you. You can reach us through the following channels:
          </p>
          <ul>
            <li>Email: <a href="/contactus">rosalover107@gmail.com</a></li>
            <li>Phone: +94 78 256 3766</li>
            <li>Live Chat: Click the chat icon on the bottom right of this page.</li>
          </ul>
        </section>

        <section>
          <h2>Submit a Support Ticket</h2>
          <p>
            If you'd like personalized assistance, fill out the form below, and
            we’ll get back to you as soon as possible:
          </p>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />

            <label htmlFor="issue">Issue:</label>
            <textarea id="issue" name="issue" placeholder="Describe your issue" required></textarea>

            <button type="submit">Submit</button>
          </form>
        </section>

        <section>
          <h2>Office Hours</h2>
          <p>Our customer support team is available during the following hours:</p>
          <ul>
            <li>Monday to Friday: 9:00 AM – 5:00 PM</li>
            <li>Saturday: 10:00 AM – 4:00 PM</li>
            <li>Sunday & Public Holidays: Closed</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
