import React from 'react';
import './About.css';

const about = () => {
  return (
    <div className="about-us-container">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Vibe Ceylon Tours</h1>
          <p>Learn more about why we are Sri Lanka's premier choice for authentic travel adventures and unforgettable experiences.</p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Vibe Ceylon Tours is Sri Lanka's premier destination management company, offering personalized tours, adventure travel, and tailor-made packages to suit every traveler's needs.
          </p>
          <p>
            With extensive experience and deep local knowledge, our dedicated team ensures you get the best services, from booking to transport, guided tours, and accommodation, making your trip seamless and unforgettable.
          </p>
        </div>
        <div className="about-image">
          <img src="Images/srilanka.jpg" alt="Vibe Ceylon Tours" />
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          {/* Add team members here */}
          <div className="team-member">
            <img src="Images/team1.jpg" alt="Vibe Ceylon Tours Team Member 1" />
            <h3>John Doe</h3>
            <p>CEO</p>
          </div>
          <div className="team-member">
            <img src="Images/team2.jpg" alt="Vibe Ceylon Tours Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Marketing Manager</p>
          </div>
          {/* Add more members as needed */}
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>If you have any questions, feel free to reach out!</p>
        <div className="contact-details">
          <p><strong>Email:</strong> <a href="mailto:info@vibeceylontours.com">info@vibeceylontours.com</a></p>
          <p><strong>Phone:</strong> +94 76 8511 264</p>
          <p><strong>Address:</strong> No 117, Sir Chittampalam A Gardiner Mawatha, Colombo 02, Sri Lanka</p>
        </div>
      </section>
    </div>
  );
};

export default about;
