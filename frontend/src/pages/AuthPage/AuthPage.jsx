import React, { useState, useEffect } from "react";
import { registerUser, loginUser } from "../../api/authService";
import ModalComponent from "../../components/shared/Model/Model";
import "./AuthPage.css";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import { useNavigate } from "react-router-dom"; // Import useNavigate

import Spinner from "../../components/Spinner/Spinner";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    terms: "", // For terms and conditions
  });

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
    onConfirm: null,
  });

  const { isAuthenticated, login } = useAuth(); // Get isAuthenticated and login from context
  const navigate = useNavigate();

  // Check authentication status when the component mounts
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    if (storedAuthStatus === "true") {
      console.log("User is authenticated (from localStorage)");
      login();
      navigate("/"); // Redirect to home
    }
  }, [login, navigate]);

  // Toggle between Sign Up and Sign In
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", username: "", email: "", password: "" });
    setModal({ isOpen: false, title: "", message: "", type: "" });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value; // Handle checkboxes
    setFormData((prev) => ({ ...prev, [name]: inputValue }));

    // Validate and update errors
    let errorMessage = "";
    if (name === "email") {
      errorMessage = validateEmail(inputValue);
    } else if (name === "password") {
      errorMessage = validatePassword(inputValue);
    } else if (name === "terms") {
      errorMessage = validateTerms(checked);
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };
  // Handle Sign Up
  const handleSignUp = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const termsError = validateTerms(formData.terms);
    setModal({ isOpen: false, title: "", message: "", type: "" });
    try {
      const response = await registerUser({
        email: formData.email,
        password: formData.password,
      });
      setModal({
        isOpen: true,
        title: "Success",
        message: response.message || "Registration successful!",
        type: "success",
        onConfirm: null,
      });
    } catch (err) {
      setModal({
        isOpen: true,
        title: "Error",
        message: err.message || "An error occurred during registration.",
        type: "error",
        onConfirm: null,
      });

      setErrors({
        email: emailError,
        password: passwordError,
        terms: termsError,
      });

      // If there are errors, stop the submission
      if (emailError || passwordError || termsError) {
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };
  // Handle Sign In
  const handleSignIn = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    setModal({ isOpen: false, title: "", message: "", type: "" });

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      login(); // Set the global authentication context as authenticated
      localStorage.setItem("isAuthenticated", "true"); // Persist to local storage
      console.log("User is authenticated (on login)");
      setModal({
        isOpen: true,
        title: "Success",
        message: response.message || "Login successful!",
        type: "success",
        onConfirm: () => navigate("/"), // Navigate to home
      });

      setErrors({
        email: emailError,
        password: passwordError,
      });

      if (emailError || passwordError) {
        return;
      }
    } catch (err) {
      setFormData({ email: "", password: "" }); // Reset form on error
      setModal({
        isOpen: true,
        title: "Error",
        message: err.message || "Invalid credentials. Please try again.",
        type: "error",
        onConfirm: null,
      });
    } finally {
      setIsLoading(false);
    }
  };
  // Handle Google Login
  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };
  // Close the modal
  const closeModal = () => {
    if (modal.onConfirm) modal.onConfirm(); // Trigger onConfirm callback
    setModal({
      isOpen: false,
      title: "",
      message: "",
      type: "",
      onConfirm: null,
    });
  };

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email is invalid";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const validateTerms = (terms) => {
    if (!terms) {
      return "You must agree to the terms and conditions";
    }
    return "";
  };

  return (
    <div className="auth_container">
      <div className="auth_right">
        {isSignUp ? (
          <form className="auth_form" onSubmit={handleSignUp}>
            <h2>Sign up</h2>
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="auth-link"
              >
                Sign In
              </button>
            </p>

            <div className="form_group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form_group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            <div className="form_group_terms">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="terms">
                I agree with <a href="/privacy_policy">Privacy Policy</a> and{" "}
                <a href="/Terms_condition">Terms & Conditions</a>
              </label>
              {errors.terms && <p className="error-message">{errors.terms}</p>}
            </div>
            <div className="button_container">
              <button
                type="submit"
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? <Spinner size="14px" /> : "Sign Up"}
              </button>
              <button
                type="button"
                className="auth-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleGoogleLogin();
                }}
              >
                Sign Up Using Google
              </button>
            </div>
          </form>
        ) : (
          <form className="auth_form" onSubmit={handleSignIn}>
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
            <div className="form_group">
              <label>Your username or email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form_group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            <div className="button_container">
              <button
                type="submit"
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? <Spinner size="14px" /> : "Sign In"}
              </button>
              <button
                type="button"
                className="auth-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleGoogleLogin();
                }}
              >
                Sign In Using Google
              </button>
            </div>
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
