import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ClientTours.css";

export default function ClientTours() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories", err);
        setError("Failed to load tour categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="client-tours">
        <div className="tours-header">
          <h1>Discover Sri Lanka Tours</h1>
          <p>Explore our curated tour categories and find your perfect adventure</p>
        </div>
        <div className="tours-grid">
          <p className="loading-message">Loading tour categories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="client-tours">
        <div className="tours-header">
          <h1>Discover Sri Lanka Tours</h1>
          <p>Explore our curated tour categories and find your perfect adventure</p>
        </div>
        <div className="tours-grid">
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="client-tours">
      <div className="tours-header">
        <h1>Discover Sri Lanka Tours</h1>
        <p>Explore our curated tour categories and find your perfect adventure</p>
      </div>

      <div className="tours-grid">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="category-card"
              onClick={() => navigate(`/category/${category._id}`)}
            >
              <div className="card-image-container">
                <img
                  src={categoryImages[category.name] || "Images/home.jpg"}
                  alt={category.name}
                  className="card-image"
                />
                <div className="card-overlay"></div>
              </div>

              <div className="card-content">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <div className="card-footer">
                  <button className="btn-explore">
                    Explore Packages →
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-packages">No tour categories available at the moment.</p>
        )}
      </div>
    </section>
  );
}
