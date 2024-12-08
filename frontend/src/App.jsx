import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Layout from './Layout';
import { CartProvider } from './context/CartContext'
import Home from './pages/Home/Home'; // Home page

import AuthPage from './pages/AuthPage/AuthPage';


import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';

import { AuthProvider } from './context/AuthContext';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <Router>
      <AuthProvider>
      <CartProvider>
        {/* Wrap the entire app in Layout */}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path='auth' element={<AuthPage/>} />

            <Route path="/product" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />

           
          </Routes>
        </Layout>
      </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
