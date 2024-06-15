import React, { useState } from 'react';
import './BookList.css';

function BookList({ books, onBookSelect, onAddToCart }) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredBooks = selectedGenre === 'all' ? books : books.filter(book => book.category === selectedGenre);

  return (
    <div className="book-list">
      <div className="genre-filter">
        <button onClick={() => handleGenreChange('all')}>All</button>
        <button onClick={() => handleGenreChange('Crime Fiction')}>Crime Fiction</button>
        <button onClick={() => handleGenreChange('Horror')}>Horror</button>
        <button onClick={() => handleGenreChange('Romance')}>Romance</button>
        <button onClick={() => handleGenreChange('Science Fiction')}>Science Fiction</button>
        <button onClick={() => handleGenreChange('Personal Development')}>Personal Development</button>
        <button onClick={() => handleGenreChange('Comics')}>Comics</button>
      </div>
      {filteredBooks.map((book) => (
        <div className="book" key={book.id} >
          <img src={book.image} alt={book.title} onClick={() => onBookSelect(book)} />
          <h3>{book.name}</h3>
          <p>${book.price}</p>
          <button onClick={() => onAddToCart(book)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default BookList;
