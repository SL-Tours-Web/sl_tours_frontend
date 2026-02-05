import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [packages, setPackages] = useState([]);
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Category images mapping
  const categoryImages = {
    "Beach Tours": "Images/home.jpg",
    "Mountain Trekking": "Images/def.jpg",
    "Cultural Heritage": "Images/home.jpg",
    "Adventure Sports": "Images/def.jpg",
    "City Tours": "Images/home.jpg",
    "Wildlife Safari": "Images/def.jpg",
  };

  // Package images mapping
  const packageImages = {
    "7-Day Sri Lanka Beach Paradise": "Images/home.jpg",
    "5-Day Adam's Peak Trek": "Images/def.jpg",
    "6-Day Ancient Temples & Culture": "Images/home.jpg",
    "4-Day Extreme Adventure": "Images/def.jpg",
    "5-Day Ultimate Wildlife Safari": "Images/home.jpg",
    "3-Day Colombo City & Culture": "Images/def.jpg",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, packagesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/packages"),
        ]);
        
        setCategories(categoriesRes.data);
        setPackages(packagesRes.data);
        
        // Select 2 random packages for featured
        if (packagesRes.data && packagesRes.data.length > 0) {
          const shuffled = [...packagesRes.data].sort(() => Math.random() - 0.5);
          setFeaturedPackages(shuffled.slice(0, 2));
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    <h1>Vibe Ceylon Tours - Discover Sri Lanka's Magic</h1>
    <p>Experience the island of infinite beauty</p>
    <a href="/ClientTours" className="cta-button">Explore Tours</a>
  </div>
</section>

      {/* About Us Section */}
<section className="about-us">
  <div className="content">
    <h2>About Vibe Ceylon Tours</h2>
    <p>Sri Lanka's premier destination management company offering exclusive travel packages and authentic experiences across the island of infinite beauty and beyond.</p>
  </div>
  <img src="Images/.jpg" alt="Sri Lanka Tours" />
</section>


      {/* Tour Categories Section */}
      <section className="tour-categories">
        <h2>Tour Categories</h2>
        <div className="category-grid">
          {loading ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>Loading categories...</p>
          ) : categories && categories.length > 0 ? (
            categories.map((category) => (
              <div 
                key={category._id} 
                className="category-item"
                onClick={() => navigate(`/category/${category._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={categoryImages[category.name] || "Images/home.jpg"} 
                  alt={category.name} 
                />
                <div className="category-overlay"></div>
                <p>{category.name}</p>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>No categories available</p>
          )}
        </div>
        <a href="/ClientTours" className="cta-button">Explore All Tours</a>
      </section>

      {/* Featured Tours Section */}
      <section className="featured-tours">
        <h2>Featured Tours</h2>
        <p className="featured-subtitle">Handpicked tour packages just for you</p>
        <div className="featured-grid">
          {featuredPackages && featuredPackages.length > 0 ? (
            featuredPackages.map((pkg) => (
              <div 
                key={pkg._id}
                className="featured-tour"
                onClick={() => navigate(`/package/${pkg._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="featured-image-container">
                  <img 
                    src={packageImages[pkg.name] || "Images/home.jpg"} 
                    alt={pkg.name}
                  />
                  <div className="featured-overlay"></div>
                </div>
                <div className="featured-content">
                  <h3>{pkg.name}</h3>
                  <p className="featured-duration">📅 {pkg.duration}</p>
                  <p className="featured-transport">🚌 {pkg.transport}</p>
                  <button className="featured-btn">View Details →</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>Loading featured tours...</p>
          )}
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
      <h4>Vibe Ceylon Tours</h4>
      <p>Address: No 117, Sir Chittampalam A Gardiner Mawatha, Colombo 02, Sri Lanka.</p>
      <p>Phone: +94 76 8511 264</p>
      <p>Email: <a href="mailto:info@vibeceylontours.com">info@vibeceylontours.com</a></p>
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
      <p>© 2025 Vibe Ceylon Tours. All rights reserved.</p>
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
