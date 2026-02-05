import React from "react";
import "./PopularDestinations.css";

// Realistic data for popular destinations
const popularDestinations = [
  {
    id: 1,
    name: "Sigiriya Rock Fortress",
    location: "Central Province",
    image: "/Images/sigiriya.jpg",
    description:
      "A UNESCO World Heritage Site, Sigiriya is an ancient rock fortress with breathtaking views, lush gardens, and remarkable frescoes. A must-visit for history and nature lovers.",
    highlights: ["Frescoes", "Lion's Paw Entrance", "Panoramic Views"],
  },
  {
    id: 2,
    name: "Ella",
    location: "Uva Province",
    image: "/Images/ella.jpg",
    description:
      "Famous for its cool climate, tea plantations, and stunning mountain scenery. Ella is perfect for hiking, with highlights like Little Adam's Peak and the Nine Arches Bridge.",
    highlights: ["Nine Arches Bridge", "Little Adam's Peak", "Tea Plantations"],
  },
  {
    id: 3,
    name: "Galle Fort",
    location: "Southern Province",
    image: "/Images/galle.jpg",
    description:
      "A beautifully preserved colonial fort on the southern coast, Galle offers cobblestone streets, ocean views, and a blend of Dutch, Portuguese, and British history.",
    highlights: ["Lighthouse", "Ramparts Walk", "Boutique Cafés"],
  },
  {
    id: 4,
    name: "Kandy",
    location: "Central Province",
    image: "/Images/kandy.jpg",
    description:
      "The cultural capital of Sri Lanka, Kandy is home to the Temple of the Tooth, scenic lake views, and vibrant Perahera festivals.",
    highlights: ["Temple of the Tooth", "Kandy Lake", "Royal Botanical Gardens"],
  },
  {
    id: 5,
    name: "Mirissa Beach",
    location: "Southern Province",
    image: "/Images/mirissa.jpg",
    description:
      "A paradise for beach lovers, Mirissa is famous for its golden sands, turquoise waters, and whale watching tours.",
    highlights: ["Whale Watching", "Palm Tree Hill", "Surfing"],
  },
  {
    id: 6,
    name: "Anuradhapura",
    location: "North Central Province",
    image: "/Images/anuradhapura.jpg",
    description:
      "One of the ancient capitals, Anuradhapura is filled with sacred Buddhist sites, massive stupas, and centuries-old ruins.",
    highlights: ["Ruwanwelisaya Stupa", "Sri Maha Bodhi Tree", "Ancient Ruins"],
  },
  {
    id: 7,
    name: "Nuwara Eliya",
    location: "Central Province",
    image: "/Images/nuwaraeliya.jpg",
    description:
      "Known as 'Little England', Nuwara Eliya is famous for its cool climate, colonial architecture, and lush tea estates.",
    highlights: ["Gregory Lake", "Tea Plantations", "Victoria Park"],
  },
  {
    id: 8,
    name: "Polonnaruwa",
    location: "North Central Province",
    image: "/Images/polonnaruwa.jpg",
    description:
      "A UNESCO World Heritage Site, Polonnaruwa is an ancient city with well-preserved ruins, statues, and royal palaces.",
    highlights: ["Gal Vihara", "Royal Palace", "Parakrama Samudra"],
  },
  {
    id: 9,
    name: "Trincomalee",
    location: "Eastern Province",
    image: "/Images/trincomalee.jpg",
    description:
      "A coastal city with pristine beaches, historic temples, and the famous Koneswaram Temple perched on a cliff.",
    highlights: ["Nilaveli Beach", "Koneswaram Temple", "Pigeon Island"],
  },
  {
    id: 10,
    name: "Yala National Park",
    location: "Southern Province",
    image: "/Images/yala.jpg",
    description:
      "Sri Lanka's most famous wildlife park, Yala is home to leopards, elephants, and a variety of exotic birds.",
    highlights: ["Leopard Safaris", "Bird Watching", "Wild Elephants"],
  },
  {
    id: 11,
    name: "Jaffna",
    location: "Northern Province",
    image: "/Images/jaffna.jpg",
    description:
      "Rich in Tamil culture, Jaffna offers unique cuisine, ancient temples, and beautiful islands to explore.",
    highlights: ["Nallur Kandaswamy Temple", "Jaffna Fort", "Casuarina Beach"],
  },
  {
    id: 12,
    name: "Bentota",
    location: "Southern Province",
    image: "/Images/bentota.jpg",
    description:
      "A popular resort town, Bentota is known for its golden beaches, water sports, and luxury hotels.",
    highlights: ["Water Sports", "Bentota Beach", "Brief Garden"],
  },
  {
    id: 13,
    name: "Dambulla Cave Temple",
    location: "Central Province",
    image: "/Images/dambulla.jpg",
    description:
      "A sacred pilgrimage site, Dambulla features a series of caves filled with Buddha statues and ancient murals.",
    highlights: ["Cave Murals", "Buddha Statues", "Hilltop Views"],
  },
  {
    id: 14,
    name: "Arugam Bay",
    location: "Eastern Province",
    image: "/Images/arugambay.jpg",
    description:
      "A surfer's paradise, Arugam Bay is famous for its laid-back vibe, waves, and beach parties.",
    highlights: ["Surfing", "Beach Cafés", "Lagoon Safaris"],
  },
  {
    id: 15,
    name: "Horton Plains National Park",
    location: "Central Highlands",
    image: "/Images/hortonplains.jpg",
    description:
      "A UNESCO World Heritage Site, Horton Plains is known for its cloud forests, grasslands, and the dramatic World's End cliff.",
    highlights: ["World's End", "Baker's Falls", "Nature Trails"],
  },
];

const PopularDestinations = () => {
  return (
    <div className="popular-destinations-container">
      <h1 className="title">Popular Destinations</h1>
      <p className="subtitle">Explore Sri Lanka's most iconic places</p>
      <div className="popular-destinations-grid">
        {popularDestinations.map((dest) => (
          <div key={dest.id} className="popular-destination-card">
            <img src={dest.image} alt={dest.name} className="popular-destination-image" />
            <div className="popular-destination-info">
              <h2>{dest.name}</h2>
              <p className="location">{dest.location}</p>
              <p className="desc">{dest.description}</p>
              <ul className="highlights">
                {dest.highlights.map((h, i) => (
                  <li key={i}>• {h}</li>
                ))}
              </ul>
              <button className="explore-btn">See More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
