import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Context Import
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModelContext';
import { UserDetailProvider } from './context/UserDetailContext';
import { AlertProvider } from './context/GlobalAlertContext';
//CSS Import
import './App.css';
import Layout from './Layout';

//Component Import
import Home from './pages/Home/Home'; // Home page
import AuthPage from './pages/AuthPage/AuthPage';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import ProductPage from './pages/Products/ProductPage';
import Contact from './pages/Home/contact-Section/contact';
import Loading from './components/shared/Loading/Loading';
import AccountPage from './components/AccountTabs/AccountPage';
import Pannel from './Admin/Pannel/Pannel';

import CheckoutDetails from './pages/CheckOut_OrderComplete/CheckoutDetails';
import OrderComplete from './pages/CheckOut_OrderComplete/OrderComplete';
import { WishlistProvider } from './context/WishlistContext';
import ShippingPolicy from './assets/Footer_Pages/Shipping_policy/shippingPolicy';







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

            <Route path='login' element={<AuthPage/>} />

            <Route path="/product/:productId" element={<ProductDetail />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<ProductPage />} />
          
            <Route path="/contactus" element={<Contact/>} />
            <Route path="/loading" element={<Loading/>} />
            <Route path="/account" element={<AccountPage/>} />

            <Route path="/checkout" element={<CheckoutDetails />} />
            <Route path="/order-complete" element={<OrderComplete />} />
            <Route path="/shiping_Policy" element={<ShippingPolicy/>} />


           

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
  );
};

export default App;
