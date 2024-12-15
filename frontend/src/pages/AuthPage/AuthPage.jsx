import React, { useState } from "react";
import { registerUser, loginUser } from "../../api/authService";
import ModalComponent from "../../components/shared/Model/Model"
import "./AuthPage.css";
import { useAuth } from "../../context/AuthContext";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "" });

  const { login } = useAuth();

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", username: "", email: "", password: "" });
    setModal({ isOpen: false, title: "", message: "", type: "" }); // Reset modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setModal({ isOpen: false, title: "", message: "", type: "" });
    try {
      const response = await registerUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setModal({
        isOpen: true,
        title: "Success",
        message: response.message || "Registration successful!",
        type: "success",
      });
    } catch (err) {
      setModal({
        isOpen: true,
        title: "Error",
        message: err.message || "An error occurred during registration.",
        type: "error",
      });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setModal({ isOpen: false, title: "", message: "", type: "" });
    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      login(response);
      setModal({
        isOpen: true,
        title: "Success",
        message: response.message || "Login successful!",
        type: "success",
      });
    } catch (err) {
      setModal({
        isOpen: true,
        title: "Error",
        message: err.message || "Invalid credentials. Please try again.",
        type: "error",
      });
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const closeModal = () => {
    setModal({ isOpen: false, title: "", message: "", type: "" });
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
              <button
                type="button"
                onClick={toggleAuthMode}
                className="auth-link"
              >
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
                I agree with <a href="/privacy">Privacy Policy</a> and{" "}
                <a href="/terms">Terms of Use</a>
              </label>
            </div>
            <button type="submit" className="auth-button">
              Sign Up
            </button>
            <button className="auth-button" onClick={handleGoogleLogin}>
              Sign Up Using Google
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignIn}>
            <h2>Sign In</h2>
            <p>
              Don't have an account yet?{" "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="auth-link"
              >
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
            <button type="submit" className="auth-button">
              Sign In
            </button>
            <button className="auth-button">Sign In Using Google</button>
          </form>
        )}
      </div>

      {/* Modal Component */}
      {modal.isOpen && (
        <ModalComponent
          title={modal.title}
          message={modal.message}
          type={modal.type}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AuthPage;
