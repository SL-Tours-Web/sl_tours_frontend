import React from "react";
import "./EllaAdventure.css"; // Import the separate CSS file

const EllaAdventure = () => {
  return (
    <div className="ella-adventure-page">
      {/* Header Section */}
      <header className="ella-header">
        <h1>Ella Adventure</h1>
        <p className="rating">Rating: <span>4.8</span></p>
      </header>

      {/* Package Details Section */}
      <section className="package-details">
        <div className="package-image">
          <img
            src="/images/tours/ella.jpg"
            alt="Ella Adventure"
            className="tour-img"
          />
        </div>
        <div className="package-info">
          <h2>Package Details</h2>
          <p>
            Embark on a thrilling 2-day adventure through Ella's stunning landscapes.
            From the famous Nine Arches Bridge to the Ella Rock hike, this tour
            offers unforgettable experiences. Ideal for adventure lovers!
          </p>
          <ul className="package-info-list">
            <li><strong>Duration:</strong> 2 Days</li>
            <li><strong>Group Size:</strong> 1-4 People</li>
            <li><strong>Price:</strong> <span className="price">$250 / person</span></li>
          </ul>
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking-section">
        <h2>Book Your Tour Now</h2>
        <button className="book-btn">Book Now</button>
      </section>
    </div>
  );
};

export default EllaAdventure;
