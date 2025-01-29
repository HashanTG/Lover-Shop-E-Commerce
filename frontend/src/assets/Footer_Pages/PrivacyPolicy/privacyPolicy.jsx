import React from "react";
import "./privacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy_policy">
        <h1>Privacy Policy</h1>
        <p>
            Your privacy is important to us. This policy explains how we 
            collect, use, and prrotect your information.
        </p>

        <h2>1. Information we collect </h2>
        <p>We may collect personal information such as your name, email address, 
            and usage data when you use our service.
        </p>
        <h2>2. How We Use Your Information</h2>
        <p>The information we collect is used to improve our services, communicate
            with you, and comply with legal obligations.
        </p>

        <h2>3. Data Security</h2>
        <p>
            We implement security measures to safeguard your information but cannot
            guarantee 100% security.
        </p>

    </div>
  );
};

export default PrivacyPolicy;
