import React from "react";
import "./Destinations.css";

const destinations = [
  {
    id: 1,
    name: "Sigiriya",
    description: "The ancient rock fortress with stunning views.",
    image: "/images/destinations/sigiriya.jpg",
  },
  {
    id: 2,
    name: "Kandy",
    description: "Cultural capital with the famous Temple of the Tooth.",
    image: "/images/destinations/kandy.jpg",
  },
  {
    id: 3,
    name: "Ella",
    description: "Cool climate, breathtaking mountain views & hikes.",
    image: "/images/destinations/ella.jpg",
  },
  {
    id: 4,
    name: "Galle",
    description: "Colonial fort, beaches & ocean experiences.",
    image: "/images/destinations/galle.jpg",
  },
  {
    id: 5,
    name: "Jaffna",
    description: "Rich Tamil culture, temples & beautiful islands.",
    image: "/images/destinations/jaffna.jpg",
  },
  {
    id: 6,
    name: "Anuradhapura",
    description: "Ancient city with sacred Buddhist sites.",
    image: "/images/destinations/anuradhapura.jpg",
  },
];

const Destinations = () => {
  return (
    <div className="destinations-container">

      <h1 className="title">Top Destinations in Sri Lanka</h1>
      <p className="subtitle">
        Discover the most beautiful locations across the island
      </p>

      <div className="destinations-grid">
        {destinations.map((dest) => (
          <div key={dest.id} className="destination-card">
            <img src={dest.image} alt={dest.name} className="destination-image" />
            <div className="destination-info">
              <h2>{dest.name}</h2>
              <p>{dest.description}</p>
              <button className="explore-btn">Explore More</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Destinations;
