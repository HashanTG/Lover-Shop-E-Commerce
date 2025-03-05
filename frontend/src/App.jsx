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
import AuthPage from "./components/AuthPage/AuthPage";
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

const App = () => {
  
  return (
    <div>
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
                          <Route path="login" element={<AuthPage/>} />
                          
                          <Route path="/product/:productId" element={<ProductDetail />}
                          />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/products" element={<ProductPage />} />
                          <Route path="/contactus" element={<Contact />} />
                          <Route path="/loading" element={<Loading />} />
                          <Route path="/account" element={<AccountPage />} />
                          <Route
                            path="/checkout"
                            element={<CheckoutDetails />}
                          />
                          <Route
                            path="/order-complete"
                            element={<OrderComplete />}
                          />
                          /*Info Pages */
                          <Route
                            path="/shiping_Policy"
                            element={<ShippingPolicy />}
                          />
                          <Route
                            path="/return_refund"
                            element={<ReturnAndRefund />}
                          />
                          <Route path="/faqS" element={<FAQs />} />
                          <Route
                            path="/support_Page"
                            element={<SupportPage />}
                          />
                          <Route
                            path="/privacy_Policy"
                            element={<PrivacyPolicy />}
                          />
                          <Route
                            path="Terms_condition"
                            element={<TermsCondition />}
                          />
                          <Route path="/admin" element={<Pannel />} />
                        </Routes>
                      </Layout>
                    </AlertProvider>
                  </CartProvider>
                </ModalProvider>
              </AuthProvider>
            </UserDetailProvider>
          </WishlistProvider>
        </Router>
      </div>
  );
};

export default App;
