import React, { useState } from 'react';
import './Home.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">

     {/* Hero Section */}
<section className="hero">
  <div className="video-background">
    <video autoPlay loop muted>
      <source src="Images/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <div className="hero-content">
    <h1>Discover Unforgettable Journeys</h1>
    <p>Your adventure begins here</p>
    <a href="#tours" className="cta-button">Explore Tours</a>
  </div>
</section>

      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>We are Sri Lanka's leading destination management company offering exclusive travel packages and tours across Sri Lanka and beyond.</p>
      </section>

      {/* Tour Categories Section */}
      <section className="tour-categories">
        <h2>Tour Categories</h2>
        <div className="category-grid">
          <div className="category-item">
            <img src="Images/abc.jpg" alt="Sri Lanka Tours" />
            <p>Sri Lanka Tours</p>
          </div>
          <div className="category-item">
            <img src="Images/def.jpg" alt="Maldives Tours" />
            <p>Maldives Tours</p>
          </div>
          <div className="category-item">
            <img src="Images/ijk.jpg" alt="Custom Tours" />
            <p>Custom Tours</p>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="featured-tours">
        <h2>Featured Tours</h2>
        <div className="featured-grid">
          <div className="featured-tour">
            <img src="Images/sigiriya.jpg" alt="Tour 1" />
            <p>Beach Paradise</p>
          </div>
          <div className="featured-tour">
            <img src="Images/ella.jpg" alt="Tour 2" />
            <p>Mountain Adventures</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>Real Stories from Our Travelers</h2>
        <div className="testimonials-grid">
          <div className="testimonial">
            <img src="Images/def.jpg" alt="Traveler 1" />
            <p>"The trip to Sri Lanka was an unforgettable experience. Highly recommend!"</p>
          </div>
          <div className="testimonial">
            <img src="Images/abc.jpg" alt="Traveler 2" />
            <p>"Incredible Maldives tour with amazing resorts and beaches!"</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
<footer className="footer">
  <div className="footer-content">
    <div className="footer-left">
      <h4>Walkers Tours Limited</h4>
      <p>Address: No 117, Sir Chittampalam A Gardiner Mawatha, Colombo O2, Sri Lanka.</p>
      <p>Phone: +94 76 8511 264</p>
      <p>Email: <a href="mailto:info@walkerstours.com">info@walkerstours.com</a></p>
    </div>

    <div className="footer-links">
      <h5>Quick Links</h5>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Sri Lanka Tours</a></li>
        <li><a href="#">Maldives Tours</a></li>
        <li><a href="#">Excursions</a></li>
        <li><a href="#">MICE</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Sustainability</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>

    <div className="footer-newsletter">
      <h5>Newsletter</h5>
      <input type="email" placeholder="Enter your email address" />
      <button>Subscribe</button>
    </div>

    <div className="footer-payment">
      <h5>Our Payment Partners</h5>
      <div className="payment-icons">
        <img src="path-to-visa-logo.png" alt="Visa" />
        <img src="path-to-mastercard-logo.png" alt="Mastercard" />
        <img src="path-to-safekey-logo.png" alt="SafeKey" />
        <img src="path-to-umapay-logo.png" alt="UMapay" />
      </div>
    </div>

    <div className="footer-social">
      <h5>Follow Us</h5>
      <div className="social-icons">
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2025 Walkers Tours Limited. All rights reserved.</p>
      <div className="footer-legal">
        <a href="#">Terms & Conditions</a> | 
        <a href="#">Privacy Policy</a> | 
        <a href="#">GDPR</a> | 
        <a href="#">Sitemap</a>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};

export default App;
