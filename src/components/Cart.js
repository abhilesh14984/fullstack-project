import React, { useState } from 'react';
import './Cart.css';

function Cart({ cartItems, onClose, onRemove, onProceedToPayment }) {
  const [processing, setProcessing] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleProceedToPayment = async () => {
    try {
      setProcessing(true);
      // Simulate payment processing (replace with actual payment logic if needed)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay
      onProceedToPayment(); // Call the parent component's function to handle payment
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="cart">
      <div className="cart-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <img src={item.image} alt={item.title} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.author}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <button onClick={() => onRemove(index)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
              <button disabled={processing} onClick={handleProceedToPayment}>
                {processing ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
