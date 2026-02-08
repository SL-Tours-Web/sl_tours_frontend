import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-us-container modern-about">
      {/* Hero Section */}
      <section className="hero-section modern-hero" style={{backgroundImage: "url('Images/srilanka.jpg')"}}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Discover Vibe Ceylon Tours</h1>
            <p className="hero-sub">Sri Lanka's premier choice for authentic travel adventures and unforgettable experiences.</p>
            <div className="about-stats">
              <div className="stat-card"><span className="stat-num">10+</span><span className="stat-label">Years Experience</span></div>
              <div className="stat-card"><span className="stat-num">5000+</span><span className="stat-label">Happy Travelers</span></div>
              <div className="stat-card"><span className="stat-num">100+</span><span className="stat-label">Unique Tours</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section modern-section">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Vibe Ceylon Tours is Sri Lanka's leading destination management company, offering personalized tours, adventure travel, and tailor-made packages for every traveler.
          </p>
          <p>
            With deep local knowledge and a passion for excellence, our dedicated team ensures you get the best—from booking to transport, guided tours, and accommodation—making your trip seamless and unforgettable.
          </p>
        </div>
        <div className="about-image">
          <img src="Images/srilanka.jpg" alt="Vibe Ceylon Tours" />
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section modern-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid modern-team-grid">
          <div className="team-member modern-team-member">
            <img src="Images/team1.jpg" alt="Vibe Ceylon Tours Team Member 1" />
            <h3>John Doe</h3>
            <p>CEO</p>
          </div>
          <div className="team-member modern-team-member">
            <img src="Images/team2.jpg" alt="Vibe Ceylon Tours Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Marketing Manager</p>
          </div>
          <div className="team-member modern-team-member">
            <img src="Images/team3.jpg" alt="Vibe Ceylon Tours Team Member 3" />
            <h3>Amal Perera</h3>
            <p>Tour Specialist</p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info modern-section">
        <h2>Contact Us</h2>
        <p>Have questions? Reach out to our friendly team!</p>
        <div className="contact-details">
          <p><strong>Email:</strong> <a href="mailto:info@vibeceylontours.com">info@vibeceylontours.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+94768511264">+94 76 8511 264</a></p>
          <p><strong>Address:</strong> No 117, Sir Chittampalam A Gardiner Mawatha, Colombo 02, Sri Lanka</p>
        </div>
      </section>
    </div>
  );
};

export default About;
