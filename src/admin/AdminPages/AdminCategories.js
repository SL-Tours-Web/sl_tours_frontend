import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../AdminLayout";
import "./AdminCategories.css";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("adminToken");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories", err);
        setError("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const resetForm = () => {
    setNewCategory({ name: "", description: "" });
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newCategory.name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      if (editingId) {
        const res = await axios.put(
          `http://localhost:5000/api/categories/${editingId}`,
          newCategory,
          authHeader
        );
        setCategories(categories.map(c => c._id === editingId ? res.data : c));
        setSuccess("Category updated successfully");
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/categories",
          newCategory,
          authHeader
        );
        setCategories([res.data, ...categories]);
        setSuccess("Category created successfully");
      }
      resetForm();
    } catch (err) {
      console.error("Error saving category", err);
      setError(err.response?.data?.message || "Failed to save category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure? This will not delete associated packages.")) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`, authHeader);
      setCategories(categories.filter(c => c._id !== id));
      setSuccess("Category deleted successfully");
    } catch (err) {
      console.error("Error deleting category", err);
      setError(err.response?.data?.message || "Failed to delete category");
    }
  };

  const handleEditCategory = (cat) => {
    setNewCategory({ name: cat.name, description: cat.description || "" });
    setEditingId(cat._id);
  };

  return (
    <AdminLayout>
      <div className="admin-categories-container">
        <h1>Manage Tour Categories</h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Form */}
        <form onSubmit={handleSaveCategory} className="category-form">
          <h2>{editingId ? "Edit Category" : "Create New Category"}</h2>

          <div className="form-group">
            <label>Category Name *</label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              placeholder="e.g., Beach Tours, Mountain Trekking, Cultural Heritage"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              placeholder="Brief description of this tour category..."
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? "Update Category" : "Create Category"}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="category-list">
          <h2>Tour Categories ({categories.length})</h2>
          {categories.length === 0 ? (
            <p>No categories yet. Create one above.</p>
          ) : (
            <div className="categories-grid">
              {categories.map((cat) => (
                <div key={cat._id} className="category-card">
                  <h3>{cat.name}</h3>
                  <p className="description">{cat.description || "No description"}</p>
                  <div className="card-actions">
                    <button
                      className="btn btn-sm btn-edit"
                      onClick={() => handleEditCategory(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-delete"
                      onClick={() => handleDeleteCategory(cat._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminCategories;
