import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Layout from './Layout';
import { CartProvider } from './context/CartContext'
import Home from './pages/Home/Home'; // Home page
import AuthPage from './pages/AuthPage/AuthPage';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate login and logout functionality
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'user-auth-token'); // Save auth token
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Remove auth token
  };

  return (
    <Router>
      <CartProvider>
        {/* Wrap the entire app in Layout */}
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='auth' element={<AuthPage/>} />
           
          </Routes>
        </Layout>
      </CartProvider>
    </Router>
  );
};

export default App;
