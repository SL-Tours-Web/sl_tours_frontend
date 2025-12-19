import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Home.css";

const tours = [
  {
    id: 1,
    name: "Sigiriya Day Tour",
    price: "$120",
    days: "1 Day",
    travelers: "2-6 People",
    image: "/images/tours/sigiriya.jpg",
    rating: 4.9,
    category: "Heritage",
    link: "/sigiriya-tour", // Link to Sigiriya tour page
  },
  {
    id: 2,
    name: "Ella Adventure",
    price: "$250",
    days: "2 Days",
    travelers: "1-4 People",
    image: "/images/tours/ella.jpg",
    rating: 4.8,
    category: "Adventure",
    link: "/ella-adventure", // Link to Ella Adventure tour page
  },
  {
    id: 3,
    name: "Polonnaruwa Tour",
    price: "$180",
    days: "1 Day",
    travelers: "2-6 People",
    image: "/images/tours/polonnaruwa.jpg",
    rating: 4.7,
    category: "Heritage",
    link: "/polonnaruwa-tour", // Link to Polonnaruwa tour page
  },
  {
    id: 4,
    name: "Kandy Cultural Experience",
    price: "$200",
    days: "1 Day",
    travelers: "2-8 People",
    image: "/images/tours/kandy.jpg",
    rating: 4.9,
    category: "Cultural",
    link: "/kandy-tour", // Link to Kandy tour page
  },
];

const Home = () => {
  return (
    <div className="home">
      {/* -------------------- Modern Hero Section -------------------- */}
      <section>
        <div className="hero-text-container">
          <h1 className="hero-title">Discover the Wonders of Sri Lanka</h1>
          <p className="hero-subtitle">Your Journey Begins Here</p>
        </div>
      </section>

      {/* -------------------- Featured Tours -------------------- */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div className="header-content">
              <h2 className="section-title">Featured Experiences</h2>
              <p className="section-subtitle">Handpicked journeys for the discerning traveler</p>
            </div>
            <button className="view-all-btn">
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="tour-grid">
            {tours.map((tour) => (
              <div className="tour-card" key={tour.id}>
                <div className="card-badge">{tour.category}</div>
                <div className="card-image">
                  <img src={tour.image} alt={tour.name} />
                  <div className="card-overlay">
                    <button className="wishlist-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="tour-name">{tour.name}</h3>
                    <div className="rating">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
                      </svg>
                      <span>{tour.rating}</span>
                    </div>
                  </div>
                  <div className="tour-meta">
                    <span className="meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {tour.days}
                    </span>
                    <span className="meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {tour.travelers}
                    </span>
                  </div>
                  <div className="card-footer">
                    <div className="price">
                      <span className="from">From</span>
                      <span className="amount">{tour.price}</span>
                      <span className="period">/person</span>
                    </div>
                    {/* Link to the specific tour page */}
                    <Link to={tour.link}>
                      <button className="card-btn">
                        Explore
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- CTA Section -------------------- */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready for Your Sri Lankan Adventure?</h2>
            <p>Join thousands of travelers who've experienced the magic of Sri Lanka with us</p>
            <div className="cta-actions">
              <button className="btn-primary">Start Planning</button>
              <button className="btn-outline">Contact Expert</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
