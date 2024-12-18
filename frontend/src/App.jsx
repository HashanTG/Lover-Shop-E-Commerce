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

            <Route path="/product" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/teddy" element={<ProductPage category="Teddy" />} />
            <Route path="/products/jewelry" element={<ProductPage category="Jewelry" />} />
            <Route path="/products/flowers" element={<ProductPage category="Flowers" />} />


           
          </Routes>
        </Layout>
      </CartProvider>
      </ModalProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
