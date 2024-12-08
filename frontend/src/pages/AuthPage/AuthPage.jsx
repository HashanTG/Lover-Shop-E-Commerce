import React, { useState } from "react";
import { registerUser, loginUser } from "../../api/authService"
import "./AuthPage.css";
import { useAuth } from "../../context/AuthContext";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const {login} = useAuth();

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", username: "", email: "", password: "" });
    setError(null);
    setSuccess(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await registerUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(response.message || "Registration successful!");
    } catch (err) {
      setError(err.message || "An error occurred during registration.");
    }
  };

  const handleSignIn = async (e) => {
   
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await loginUser({
        email: formData.email, // Assumes either username or email is accepted
        password: formData.password,
      });
      login(response);
      setSuccess(response.message || "Login successful!");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    }
  };


  const handleGoogleLogin = async () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  // Listen for the token response
  const checkToken = async () => {
    try {
      const tokenResponse = await axios.get('http://localhost:8080/login/oauth2/code/google');
      if (tokenResponse?.data?.token) {
        saveToken(tokenResponse.data.token);
      }
    } catch (error) {
      console.error('Error during token fetch');
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1 className="logo">ROSA LOVER</h1>
        <div className="illustration"></div>
      </div>
      <div className="auth-right">
        {isSignUp ? (
          <form className="auth-form" onSubmit={handleSignUp}>
            <h2>Sign up</h2>
            <p>
              Already have an account?{" "}
              <button type="button" onClick={toggleAuthMode} className="auth-link">
                Sign in
              </button>
            </p>
            <div className="form-group">
              <label>Your name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree with <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Use</a>
              </label>
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button type="submit" className="auth-button">Sign Up</button>
            <button className="auth-button" onClick={handleGoogleLogin}>Sign Up Using Google</button>

          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <p>
              Don't have an account yet?{" "}
              <button type="button" onClick={toggleAuthMode} className="auth-link">
                Sign Up
              </button>
            </p>
            <div className="form-group">
              <label>Your username or email address</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your username or email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-group remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
              <a href="/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button type="submit" className="auth-button">Sign In</button>
            <button className="auth-button">Sign In Using Google</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
