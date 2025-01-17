// components/Orders.jsx
import React from 'react';

const Orders = () => {
  const orders = [
    { id: '#2456_799', date: 'October 17, 2023', status: 'Delivered', price: 'Rs 1234.00' },
    { id: '#2456_800', date: 'October 11, 2023', status: 'Delivered', price: 'Rs 345.00' },
    // Add more orders as needed
  ];

  return (
    <div className="orders">
      <table>
        <thead>
          <tr>
            <th>Number ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
