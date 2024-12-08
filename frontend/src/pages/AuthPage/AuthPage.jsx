import React, { useState } from "react";
import "./AuthPage.css";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1 className="logo">ROSA LOVER</h1>
        <div className="illustration"></div>
      </div>
      <div className="auth-right">
        {isSignUp ? (
          <form className="auth-form">
            <h2>Sign up</h2>
            <p>
              Already have an account?{" "}
              <button type="button" onClick={toggleAuthMode} className="auth-link">
                Sign in
              </button>
            </p>
            <div className="form-group">
              <label>Your name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Enter your username" />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>
            <div className="form-group terms">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                I agree with <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Use</a>
              </label>
            </div>
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
        ) : (
          <form className="auth-form">
            <h2>Sign In</h2>
            <p>
              Don't have an account yet?{" "}
              <button type="button" onClick={toggleAuthMode} className="auth-link">
                Sign Up
              </button>
            </p>
            <div className="form-group">
              <label>Your username or email address</label>
              <input type="text" placeholder="Enter your username or email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>
            <div className="form-group remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
              <a href="/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="auth-button">Sign In</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
