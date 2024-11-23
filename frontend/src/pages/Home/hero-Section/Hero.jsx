import React from "react";
import "./Hero.css";
import Button from "../../../components/shared/button/Button";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-image">
          <img
            src="https://via.placeholder.com/500x500" // Placeholder image
            alt="Placeholder"
          />
        </div>
        <div className="hero-text">
          <h1>
            Feel the <span className="highlight">Rythom</span> of Love
          </h1>
          <p>Unleash the Power of Music Together</p>
          <Button label="Shopping Now" onClick={() => alert("Button Clicked")} />
        </div>
      </div>
      <div className="hero-bg"></div>
    </div>
  );
};

export default Hero;
