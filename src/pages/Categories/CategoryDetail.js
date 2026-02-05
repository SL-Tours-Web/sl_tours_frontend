import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./CategoryDetail.css";

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, packagesRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/categories/${categoryId}`),
          axios.get(`http://localhost:5000/api/packages?category=${categoryId}`),
        ]);
        setCategory(categoryRes.data);
        setPackages(packagesRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Failed to load category details");
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <section className="category-detail">
        <div className="detail-content">
          <p className="loading-message">Loading category details...</p>
        </div>
      </section>
    );
  }

  if (error || !category) {
    return (
      <section className="category-detail">
        <div className="detail-content">
          <button className="btn-back" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="category-detail">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back to Categories
      </button>

      <div className="detail-content">
        <div className="category-header">
          <h1>{category.name}</h1>
          <p className="category-description">{category.description}</p>
        </div>

        <div className="packages-section">
          <h2>Available Tour Packages in {category.name}</h2>

          {packages && packages.length > 0 ? (
            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg._id} className="package-card">
                  <div className="package-header">
                    <h3>{pkg.name}</h3>
                  </div>

                  <div className="package-info">
                    <p>
                      <strong>Duration:</strong> {pkg.duration}
                    </p>
                    {pkg.transport && (
                      <p>
                        <strong>Transport:</strong> {pkg.transport}
                      </p>
                    )}
                    {pkg.accommodation && (
                      <p>
                        <strong>Accommodation:</strong> {pkg.accommodation}
                      </p>
                    )}
                    <p className="itinerary-count">
                      <strong>{pkg.itinerary?.length || 0} Days</strong>
                    </p>
                  </div>

                  {pkg.description && (
                    <p className="package-description">{pkg.description}</p>
                  )}

                  <button
                    className="btn-details"
                    onClick={() => navigate(`/package/${pkg._id}`)}
                  >
                    View Full Itinerary →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-packages">
              <p>No tour packages available in this category yet.</p>
              <button
                className="btn-back"
                onClick={() => navigate("/ClientTours")}
              >
                Back to All Tours
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
