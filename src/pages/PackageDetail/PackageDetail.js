import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./PackageDetail.css";

export default function PackageDetail() {
  const { packageId } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/packages/${packageId}`);
        setPkg(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching package", err);
        setError("Failed to load package details");
        setLoading(false);
      }
    };

    fetchPackage();
  }, [packageId]);

  if (loading) {
    return (
      <section className="package-detail">
        <div className="detail-content">
          <p className="loading-message">Loading package details...</p>
        </div>
      </section>
    );
  }

  if (error || !pkg) {
    return (
      <section className="package-detail">
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
    <section className="package-detail">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-content">
        {/* Header */}
        <div className="package-header">
          <div className="header-info">
            <h1>{pkg.name}</h1>
            <p className="category-tag">
              Category: <strong>{pkg.category?.name || "General"}</strong>
            </p>
            {pkg.description && (
              <p className="package-description">{pkg.description}</p>
            )}
          </div>
          <div className="package-pricing">
            <p className="duration">
              📅 {pkg.duration}
            </p>
          </div>
        </div>

        {/* Key Info */}
        <div className="key-info">
          {pkg.transport && (
            <div className="info-item">
              <span className="icon">🚌</span>
              <div>
                <p className="label">Transport</p>
                <p className="value">{pkg.transport}</p>
              </div>
            </div>
          )}
          {pkg.accommodation && (
            <div className="info-item">
              <span className="icon">🏨</span>
              <div>
                <p className="label">Accommodation</p>
                <p className="value">{pkg.accommodation}</p>
              </div>
            </div>
          )}
          <div className="info-item">
            <span className="icon">📍</span>
            <div>
              <p className="label">Days</p>
              <p className="value">{pkg.itinerary?.length || 0} Days</p>
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="itinerary-section">
          <h2>Day-by-Day Itinerary</h2>

          {pkg.itinerary && pkg.itinerary.length > 0 ? (
            <div className="itinerary-timeline">
              {pkg.itinerary.map((day, index) => (
                <div key={index} className="itinerary-day">
                  <div className="day-badge">Day {day.day}</div>
                  <div className="day-content">
                    {day.title && <h3>{day.title}</h3>}
                    <p className="activities">{day.activities}</p>
                  </div>
                  {index < pkg.itinerary.length - 1 && (
                    <div className="timeline-connector" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-itinerary">
              No detailed itinerary available for this package.
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="cta-section">
          <button className="btn-inquire">
            Inquire Now
          </button>
          <button className="btn-book">
            Book This Tour
          </button>
        </div>
      </div>
    </section>
  );
}
