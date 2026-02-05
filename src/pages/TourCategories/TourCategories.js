import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TourCategories.css";

export default function TourCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      <section className="tour-categories">
        <h1>Explore Our Tour Categories</h1>
        <div className="categories-container">
          <p className="loading-message">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="tour-categories">
        <h1>Explore Our Tour Categories</h1>
        <div className="categories-container">
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="tour-categories">
      <h1>Explore Our Tour Categories</h1>
      <p className="subtitle">Choose your adventure and discover Sri Lanka</p>

      <div className="categories-container">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="category-card"
              onClick={() => navigate(`/category/${category._id}`)}
            >
              <div className="category-content">
                <h2>{category.name}</h2>
                <p className="category-description">
                  {category.description || "Discover amazing tours in this category"}
                </p>
                <button className="view-btn">
                  Explore Tours →
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-categories">No tour categories available at the moment.</p>
        )}
      </div>
    </section>
  );
}
