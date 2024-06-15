import React from 'react';
import './BookDetails.css';

function BookDetails({ book, onAddToCart }) {
  if (!book) {
    return <div className="book-details">Select a book to see details.</div>;
  }

  return (
    <div className="book-details">
      <div className="book-image">
        <img src={book.image} alt={book.name} />
      </div>
      <div className="book-info">
        <h2 className="book-title">{book.name}</h2>
        <p className="book-price">${book.price}</p>
        <p className="book-description">{book.description}</p>
        <button className="add-to-cart-button" onClick={() => onAddToCart(book)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default BookDetails;
