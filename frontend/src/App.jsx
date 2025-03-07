import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//Context Import
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModelContext";
import { UserDetailProvider } from "./context/UserDetailContext";
import { AlertProvider } from "./context/GlobalAlertContext";
//CSS Import
import "./App.css";
import Layout from "./Layout";

//Component Import
import Home from "./pages/Home/Home"; // Home page
import AuthPage from "./pages/AuthPage/AuthPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import ProductPage from "./pages/Products/ProductPage";
import Contact from "./pages/Home/contact-Section/contact";
import Loading from "./components/shared/Loading/Loading";
import AccountPage from "./pages/Account/AccountPage";
import Pannel from "./Admin/Pannel/Pannel";

import CheckoutDetails from "./pages/CheckOut_OrderComplete/CheckoutDetails";
import OrderComplete from "./pages/CheckOut_OrderComplete/OrderComplete";
import { WishlistProvider } from "./context/WishlistContext";
import ShippingPolicy from "./assets/Footer_Pages/Shipping_policy/shippingPolicy";
import ReturnAndRefund from "./assets/Footer_Pages/ReturnRefund/ReturnRefund";
import FAQs from "./assets/Footer_Pages/FAQs/FAQs";
import SupportPage from "./assets/Footer_Pages/Support/support";
import PrivacyPolicy from "./assets/Footer_Pages/PrivacyPolicy/privacyPolicy";
import TermsCondition from "./assets/Footer_Pages/TermsConditions/termsCondition";

//Protected Route Component Import

import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";

const App = () => {
  return (
    <Router>
      <WishlistProvider>
        <UserDetailProvider>
          <AuthProvider>
            <ModalProvider>
              <CartProvider>
                <AlertProvider>
                  {/* Wrap the entire app in Layout */}
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="login" element={<AuthPage />} />
                      <Route
                        path="/product/:productId"
                        element={<ProductDetail />}
                      />
                      <Route path="/products" element={<ProductPage />} />
                      <Route path="/contactus" element={<Contact />} />
                      <Route path="/loading" element={<Loading />} />
                      <Route
                        path="/shiping_Policy"
                        element={<ShippingPolicy />}
                      />
                      <Route
                        path="/return_refund"
                        element={<ReturnAndRefund />}
                      />
                      <Route path="/faqS" element={<FAQs />} />
                      <Route path="/support_Page" element={<SupportPage />} />
                      <Route
                        path="/privacy_Policy"
                        element={<PrivacyPolicy />}
                      />
                      <Route
                        path="Terms_condition"
                        element={<TermsCondition />}
                      />

                      {/* Protected Routes */}
                      <Route
                        path="/cart"
                        element={
                          <ProtectedRoute>
                            <Cart />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/account"
                        element={
                          <ProtectedRoute>
                            <AccountPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/checkout"
                        element={
                          <ProtectedRoute>
                            <CheckoutDetails />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/order-complete"
                        element={
                          <ProtectedRoute>
                            <OrderComplete />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute>
                            <Pannel />
                          </ProtectedRoute>
                        }
                      />

                      {/* 404 Route (Should be the last route) */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </AlertProvider>
              </CartProvider>
            </ModalProvider>
          </AuthProvider>
        </UserDetailProvider>
      </WishlistProvider>
    </Router>
  );
};

export default App;
