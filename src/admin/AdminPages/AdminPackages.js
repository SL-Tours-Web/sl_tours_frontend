import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../AdminLayout";
import "./AdminPackages.css";

function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newPackage, setNewPackage] = useState({
    name: "",
    category: "",
    duration: "",
    transport: "",
    accommodation: "",
    description: "",
    itinerary: [],
    destinations: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("adminToken");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch categories and packages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, packagesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/packages"),
        ]);
        setCategories(categoriesRes.data);
        setPackages(packagesRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("Failed to fetch categories/packages");
      }
    };
    fetchData();
  }, []);

  // Reset form
  const resetForm = () => {
    setNewPackage({
      name: "",
      category: "",
      duration: "",
      transport: "",
      accommodation: "",
      description: "",
      itinerary: [],
      destinations: [],
    });
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  // Update itinerary day
  const updateItineraryDay = (dayIndex, field, value) => {
    const updated = [...newPackage.itinerary];
    updated[dayIndex] = { ...updated[dayIndex], [field]: value };
    setNewPackage({ ...newPackage, itinerary: updated });
  };

  // Add itinerary day
  const addItineraryDay = () => {
    const daysCount = newPackage.itinerary.length + 1;
    setNewPackage({
      ...newPackage,
      itinerary: [
        ...newPackage.itinerary,
        { day: daysCount, title: "", activities: "" },
      ],
    });
  };

  // Remove itinerary day
  const removeItineraryDay = (dayIndex) => {
    setNewPackage({
      ...newPackage,
      itinerary: newPackage.itinerary.filter((_, i) => i !== dayIndex),
    });
  };

  // Save package
  const handleSavePackage = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newPackage.name || !newPackage.category || !newPackage.duration) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const payload = {
        ...newPackage,
        destinations: newPackage.destinations.filter(d => d.trim()),
      };

      if (editingId) {
        const res = await axios.put(
          `http://localhost:5000/api/packages/${editingId}`,
          payload,
          authHeader
        );
        setPackages(packages.map(p => p._id === editingId ? res.data : p));
        setSuccess("Package updated successfully");
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/packages",
          payload,
          authHeader
        );
        setPackages([res.data, ...packages]);
        setSuccess("Package created successfully");
      }
      resetForm();
    } catch (err) {
      console.error("Error saving package", err);
      setError(err.response?.data?.message || "Failed to save package");
    }
  };

  // Delete package
  const handleDeletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/packages/${id}`, authHeader);
      setPackages(packages.filter(p => p._id !== id));
      setSuccess("Package deleted successfully");
    } catch (err) {
      console.error("Error deleting package", err);
      setError(err.response?.data?.message || "Failed to delete package");
    }
  };

  // Edit package
  const handleEditPackage = (pkg) => {
    setNewPackage({
      name: pkg.name,
      category: pkg.category?._id || pkg.category || "",
      duration: pkg.duration,
      transport: pkg.transport || "",
      accommodation: pkg.accommodation || "",
      description: pkg.description || "",
      itinerary: pkg.itinerary || [],
      destinations: pkg.destinations || [],
    });
    setEditingId(pkg._id);
  };

  const getCategoryName = (categoryId) => {
    return categories.find(c => c._id === categoryId)?.name || "N/A";
  };

  return (
    <AdminLayout>
      <div className="admin-packages-container">
        <h1>Manage Tour Packages</h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Form */}
        <form onSubmit={handleSavePackage} className="package-form">
          <h2>{editingId ? "Edit Package" : "Create New Package"}</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={newPackage.category}
                onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value })}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Package Name *</label>
              <input
                type="text"
                value={newPackage.name}
                onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                placeholder="e.g., 5-Day Cultural Tour"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duration *</label>
              <input
                type="text"
                value={newPackage.duration}
                onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                placeholder="e.g., 5 days 4 nights"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Transport</label>
              <input
                type="text"
                value={newPackage.transport}
                onChange={(e) => setNewPackage({ ...newPackage, transport: e.target.value })}
                placeholder="e.g., Coach, Van"
              />
            </div>

            <div className="form-group">
              <label>Accommodation</label>
              <input
                type="text"
                value={newPackage.accommodation}
                onChange={(e) => setNewPackage({ ...newPackage, accommodation: e.target.value })}
                placeholder="e.g., 3-star Hotel"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newPackage.description}
              onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
              placeholder="Brief description of the tour..."
              rows="3"
            />
          </div>

          {/* Itinerary Builder */}
          <div className="itinerary-section">
            <h3>Day-by-Day Itinerary</h3>
            {newPackage.itinerary.map((day, index) => (
              <div key={index} className="itinerary-day">
                <div className="itinerary-day-header">
                  <h4>Day {day.day}</h4>
                  <button
                    type="button"
                    className="btn btn-sm btn-delete"
                    onClick={() => removeItineraryDay(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Day Title</label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => updateItineraryDay(index, "title", e.target.value)}
                      placeholder="e.g., Colombo City Tour"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Activities & Details</label>
                  <textarea
                    value={day.activities}
                    onChange={(e) => updateItineraryDay(index, "activities", e.target.value)}
                    placeholder="Describe all activities for this day..."
                    rows="3"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addItineraryDay}
            >
              + Add Day to Itinerary
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? "Update Package" : "Create Package"}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="package-list">
          <h2>Tour Packages ({packages.length})</h2>
          {packages.length === 0 ? (
            <p>No packages yet. Create one above.</p>
          ) : (
            <table className="packages-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Days</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr key={pkg._id}>
                    <td>{pkg.name}</td>
                    <td>{getCategoryName(pkg.category)}</td>
                    <td>{pkg.duration}</td>
                    <td>{pkg.itinerary?.length || 0}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-edit"
                        onClick={() => handleEditPackage(pkg)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-delete"
                        onClick={() => handleDeletePackage(pkg._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPackages;
