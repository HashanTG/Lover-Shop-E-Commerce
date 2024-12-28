import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Context Import
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModelContext';
//CSS Import
import './App.css';
import Layout from './Layout';

//Component Import
import Home from './pages/Home/Home'; // Home page
import AuthPage from './pages/AuthPage/AuthPage';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import ProductPage from './pages/ProductPage';
import Contact from './pages/Home/contact-Section/contact';
import Loading from './components/shared/Loading/Loading';






const App = () => {


  return (
    <Router>
      <AuthProvider>
      <ModalProvider>
      <CartProvider>
        {/* Wrap the entire app in Layout */}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path='auth' element={<AuthPage/>} />

            <Route path="/product/:productId" element={<ProductDetail />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<ProductPage />} />
          
            <Route path="/contactus" element={<Contact/>} />
            <Route path="/loading" element={<Loading/>} />


           
          </Routes>
        </Layout>
      </CartProvider>
      </ModalProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
