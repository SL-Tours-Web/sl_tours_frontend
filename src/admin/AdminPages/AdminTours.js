import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Use useNavigate for navigation
import axios from "axios";
import AdminLayout from "../AdminLayout";
import "./AdminTours.css";
function AdminTours() {
  const [tours, setTours] = useState([]);
  const [newTour, setNewTour] = useState({ title: "", days: 1 });
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch admin tours from the backend (requires auth)
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tours/admin", authHeader);
        setTours(res.data);
      } catch (error) {
        console.error("Error fetching admin tours", error);
      }
    };
    fetchTours();
  }, []);

  // Add a new tour
  const handleAddTour = async (e) => {
    e.preventDefault();
    try {
      const payload = { title: newTour.title, days: Number(newTour.days) };
      const res = await axios.post("http://localhost:5000/api/tours", payload, authHeader);
      setTours([res.data, ...tours]);
      setNewTour({ title: "", days: 1 });
    } catch (error) {
      console.error("Error adding tour", error);
      alert(error.response?.data?.message || "Failed to add tour");
    }
  };

  // Delete a tour
  const handleDeleteTour = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tours/${id}`, authHeader);
      setTours(tours.filter(tour => tour._id !== id));
    } catch (error) {
      console.error("Error deleting tour", error);
      alert(error.response?.data?.message || "Failed to delete tour");
    }
  };

  return (
    <AdminLayout>
      <div className="manage-tours-page">
        <header className="manage-tours-header">
          <div>
            <span className="manage-tours-eyebrow">Tour management</span>
            <h1>Manage Tours</h1>
            <p>Create and manage the tours available to your guests.</p>
          </div>
        </header>

        <form className="manage-tours-form" onSubmit={handleAddTour}>
          <input
            type="text"
            value={newTour.title}
            onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
            placeholder="Tour Title"
            aria-label="Tour title"
          />
          <textarea
            value={newTour.description}
            onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
            placeholder="Tour Description"
            aria-label="Tour description"
          />
          <button className="manage-tours-add" type="submit">Add Tour</button>
        </form>

        <div className="manage-tours-list-header">
          <h2>Tour List</h2>
          <span>{tours.length} {tours.length === 1 ? "tour" : "tours"}</span>
        </div>
        <ul className="manage-tours-list">
          {tours.map(tour => (
            <li className="manage-tour-card" key={tour._id}>
              <div className="manage-tour-info">
                <h3>{tour.title}</h3>
                <p>{tour.description || "No description provided."}</p>
              </div>
              <div className="manage-tour-actions">
                <button
                  className="manage-tour-edit"
                  type="button"
                  onClick={() => navigate(`/edit-tour/${tour._id}`)}
                >
                  Edit
                </button>
                <button
                  className="manage-tour-delete"
                  type="button"
                  onClick={() => handleDeleteTour(tour._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}

export default AdminTours;
