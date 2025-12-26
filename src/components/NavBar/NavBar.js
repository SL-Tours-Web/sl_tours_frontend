import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="logo">
        <a href="/">Walkers Tours</a>
      </div>
      <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#sri-lanka-tours">Sri Lanka Tours</a></li>
          <li><a href="/destinations">Popular Destinations</a></li>
          <li><a href="/gallery">Tour Gallery</a></li>
          {/* <li><a href="#mice">MICE</a></li> */}
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/about">About Us</a></li>
        </ul>
      </nav>
      <div className="nav-icons">
        <button className="search-icon">
          <i className="fas fa-search"></i>
        </button>
        <button className="inquire-button">
          <i className="fas fa-comment"></i> Inquire
        </button>
        <button className="menu-icon" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </header>
  );
};

export default NavBar;
