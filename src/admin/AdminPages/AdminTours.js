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
    <AdminLayout> {/* Wrap everything inside AdminLayout */}
      <div>
        <h1>Admin: Manage Tours</h1>

        <form onSubmit={handleAddTour}>
          <input
            type="text"
            value={newTour.title}
            onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
            placeholder="Tour Title"
          />
          <textarea
            value={newTour.description}
            onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
            placeholder="Tour Description"
          />
          <button type="submit">Add Tour</button>
        </form>

        <h2>Tour List</h2>
        <ul>
          {tours.map(tour => (
            <li key={tour._id}>
              <h3>{tour.title}</h3>
              <p>{tour.description}</p>
              <button onClick={() => handleDeleteTour(tour._id)}>Delete</button>
              <button onClick={() => navigate(`/edit-tour/${tour._id}`)}>Edit</button>  {/* Use navigate */}
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}

export default AdminTours;
