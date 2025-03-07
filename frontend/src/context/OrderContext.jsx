import React, { createContext, useState, useContext } from "react";

// Create the OrderContext
const OrderContext = createContext();

// OrderProvider component to wrap your app
export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    // Place a new order
    const placeOrder = (orderDetails) => {
        setOrders((prevOrders) => [...prevOrders, orderDetails]);
    };

    // Get order history
    const getOrderHistory = () => {
        return orders;
    };

    return (
        <OrderContext.Provider value={{ orders, placeOrder, getOrderHistory }}>
            {children}
        </OrderContext.Provider>
    );
};

// Hook for consuming the OrderContext
export const useOrder = () => useContext(OrderContext);
