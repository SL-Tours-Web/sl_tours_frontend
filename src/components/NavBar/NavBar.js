import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./NavBar.css";

const Navbar = () => {
  const [isToursOpen, setToursOpen] = useState(false);
  const [isEventsOpen, setEventsOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // Hamburger toggle

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="nav-left">
        <img src="/logo.png" alt="Classic Lanka Logo" className="nav-logo" />
      </div>

      {/* HAMBURGER */}
      <div
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* MENU ITEMS */}
      <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <li className="nav-item active">
          <Link to="/">Home</Link> {/* Link to Home */}
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link> {/* Link to About */}
        </li>

        {/* TOURS DROPDOWN */}
        <li
          className="nav-item dropdown"
          onMouseEnter={() => setToursOpen(true)}
          onMouseLeave={() => setToursOpen(false)}
          onClick={() => setToursOpen(!isToursOpen)} // For mobile tap
        >
          Tours ▾
          {isToursOpen && (
            <div className="dropdown-menu">
              <p>Sri Lanka Tours</p>
              <p>Holiday Packages</p>
              <p>Adventure Tours</p>
            </div>
          )}
        </li>

        
        <li className="nav-item">
          <Link to="/medical-tours">Medical Tours</Link> {/* Link to Medical Tours */}
        </li>

        {/* EVENTS DROPDOWN */}
        <li
          className="nav-item dropdown"
          onMouseEnter={() => setEventsOpen(true)}
          onMouseLeave={() => setEventsOpen(false)}
          onClick={() => setEventsOpen(!isEventsOpen)} // For mobile tap
        >
          Events ▾
          {isEventsOpen && (
            <div className="dropdown-menu">
              <p>Wedding Events</p>
              <p>Corporate Events</p>
              <p>Cultural Events</p>
            </div>
          )}
        </li>

        <li className="nav-item">
          <Link to="/gallery">Gallery</Link> {/* Link to Gallery */}
        </li>
        <li className="nav-item">
          <Link to="/contact">Contact</Link> {/* Link to Contact */}
        </li>
      </ul>

      {/* BUTTON */}
      <div className="nav-right">
        <button className="quote-btn">Get a Quote</button>
      </div>
    </nav>
  );
};

export default Navbar;
