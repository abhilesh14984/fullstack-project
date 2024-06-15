import React from 'react';
import './Profile.css';

function Profile({ username, orders, onViewMoreBooks }) {
  return (
    <div className="profile-container">
      <h2 className="profile-heading">Welcome, {username}!</h2>
      <div className="profile-orders">
        <h3>Your Orders</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul className="order-list">
            {orders.map(order => (
              <li key={order.id} className="order-item">
                <div className="order-header">
                  <span>Order #{order.id}</span>
                  <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
                <ul className="order-items">
                  {order.items.map((item, index) => (
                    <li key={index} className="order-item-details">
                      {item.title} - ${item.price}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="profile-button" onClick={onViewMoreBooks}>View More Books</button>
    </div>
  );
}

export default Profile;
