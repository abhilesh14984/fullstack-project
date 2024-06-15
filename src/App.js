import React, { useState, useEffect } from 'react';
import './App.css';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import LoginSignupModal from './components/LoginSignupModal';
import Carousel from './components/Carousel';
import Cart from './components/Cart';
import Profile from './components/Profile';
import booksData from './assets/assets';
import user_icon from './components/user_icon.png';
import logo from './assets/logo2.jpg';

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [shuffledBooks, setShuffledBooks] = useState([]);
  const [showCarousel, setShowCarousel] = useState(true);

  useEffect(() => {
    setShuffledBooks(shuffle([...booksData]));
  }, []);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    setShowModal(false);
  };

  const handleSignup = (username) => {
    handleLogin(username); // Automatically log in after signing up
  };

  const handleAddToCart = (book) => {
    setCartItems([...cartItems, book]);
  };

  const handleRemoveFromCart = (index) => {
    const newCartItems = cartItems.slice();
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setShowProfile(false);
  };

  const handleProceedToPayment = () => {
    const newOrder = {
      id: orders.length + 1,
      items: cartItems,
      status: 'Processing'
    };
    setOrders([...orders, newOrder]);
    setCartItems([]);
    setShowCart(false);
    alert('Payment successful!');
    setShowProfile(true);
  };

  const handleViewMoreBooks = () => {
    setShowProfile(false);
  };

  const handleFilterBooks = (action) => {
    if (action === 'all') {
      setShuffledBooks(shuffle([...booksData]));
    } else {
      const filteredBooks = booksData.filter(book => book.price >= parseInt(action));
      setShuffledBooks(filteredBooks);
    }
    setShowCarousel(false);
  };

  const renderMainContent = () => {
    if (showProfile) {
      return (
        <Profile
          username={username}
          orders={orders}
          onViewMoreBooks={handleViewMoreBooks}
        />
      );
    } else if (showCart) {
      return (
        <Cart
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={handleRemoveFromCart}
          onProceedToPayment={handleProceedToPayment}
        />
      );
    } else if (selectedBook) {
      return <BookDetails book={selectedBook} onAddToCart={handleAddToCart} />;
    } else {
      return (
        <>
          {showCarousel && <Carousel onFilterBooks={handleFilterBooks} />}
          <BookList books={shuffledBooks} onBookSelect={handleBookSelect} onAddToCart={handleAddToCart} />
        </>
      );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Icon" className="icon"  onClick={(e) => { e.preventDefault(); setShowProfile(false); setShowCart(false); setSelectedBook(null); setShowCarousel(true); }}/>
        <h1>Book Haven</h1>
        <nav className="nav">
          <ul>
            <li><a href="/" onClick={(e) => { e.preventDefault(); setShowProfile(false); setShowCart(false); setSelectedBook(null); setShowCarousel(true); }}>Home</a></li>
            <li>
              <a href="/" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
                Cart <span className="cart-count">{cartItems.length}</span>
              </a>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <a href="/" onClick={(e) => { e.preventDefault(); setShowProfile(true); }}>
                    Profile
                  </a>
                </li>
                <li>
                  <a href="/"  onClick={handleLogout}>
                    <img src={user_icon} alt="User Icon" className="user-icon" />
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li><button className='loginbut' onClick={() => setShowModal(true)}>Login</button></li>
            )}
          </ul>
        </nav>
      </header>
      <main className="app-main">
        {renderMainContent()}
        {showModal && (
          <LoginSignupModal show={showModal} onClose={() => setShowModal(false)} onLogin={handleLogin} onSignup={handleSignup} />
        )}
      </main>
    </div>
  );
}

export default App;
