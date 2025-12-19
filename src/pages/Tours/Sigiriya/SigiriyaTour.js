
import React from "react";
import "./SigiriyaTour.css"; // Import the CSS for Sigiriya Tour

const SigiriyaTour = () => {
  return (
    <div className="tour-page">
      {/* Header Section */}
      <header className="tour-header">
        <h1>Sigiriya Day Tour</h1>
        <p className="rating">
          Rating: <span>4.9</span>
        </p>
      </header>

      {/* Tour Details Section */}
      <section className="tour-details">
        <div className="tour-image">
          <img
            src="/images/tours/sigiriya.jpg"
            alt="Sigiriya Rock Fortress"
            className="tour-img"
          />
        </div>
        <div className="tour-info">
          <h2>Tour Details</h2>
          <p>
            Explore the ancient Sigiriya Rock Fortress, a UNESCO World Heritage
            site. This iconic site offers stunning views and rich history. The
            climb to the top is a rewarding experience with breathtaking
            surroundings.
          </p>
          <ul className="tour-info-list">
            <li><strong>Duration:</strong> 1 Day</li>
            <li><strong>Group Size:</strong> 2-6 People</li>
            <li><strong>Price:</strong> <span className="price">$120 / person</span></li>
            <li><strong>Rating:</strong> 4.9</li>
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

export default SigiriyaTour;
