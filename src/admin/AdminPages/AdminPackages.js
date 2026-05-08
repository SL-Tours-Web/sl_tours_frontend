import React, { useState, useEffect } from "react";
import api, { API_URL } from "../../config/api";
import AdminLayout from "../AdminLayout";
import "./AdminPackages.css";

const emptyPackage = {
  name: "", category: "", duration: "", transport: "", accommodation: "",
  description: "", itinerary: [], highlights: [], includes: [], excludes: [],
  isFeatured: false,
};

function TagInput({ label, values, onChange, placeholder }) {
  const [input, setInput] = useState("");
  const add = () => {
    const val = input.trim();
    if (val && !values.includes(val)) onChange([...values, val]);
    setInput("");
  };
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i));
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="tag-input-row">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder={placeholder} />
        <button type="button" className="btn btn-secondary btn-sm" onClick={add}>Add</button>
      </div>
      <div className="tag-list">
        {values.map((v, i) => (
          <span key={i} className="tag-item">{v}
            <button type="button" onClick={() => remove(i)}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
}

function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyPackage);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, pkgRes] = await Promise.all([
          api.get("/api/categories"),
          api.get("/api/packages"),
        ]);
        setCategories(catRes.data);
        setPackages(pkgRes.data);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const resetForm = () => {
    setForm(emptyPackage);
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setError("");
    setSuccess("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const updateItinerary = (i, field, value) => {
    const updated = [...form.itinerary];
    updated[i] = { ...updated[i], [field]: value };
    setForm({ ...form, itinerary: updated });
  };

  const addDay = () => {
    setForm({ ...form, itinerary: [...form.itinerary, { day: form.itinerary.length + 1, title: "", activities: "" }] });
  };

  const removeDay = (i) => {
    setForm({ ...form, itinerary: form.itinerary.filter((_, idx) => idx !== i) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
    if (!form.name || !form.category || !form.duration) {
      setError("Name, category and duration are required");
      setLoading(false); return;
    }
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("category", form.category);
      data.append("duration", form.duration);
      data.append("transport", form.transport);
      data.append("accommodation", form.accommodation);
      data.append("description", form.description);
      data.append("isFeatured", form.isFeatured);
      data.append("itinerary", JSON.stringify(form.itinerary));
      form.highlights.forEach(h => data.append("highlights", h));
      form.includes.forEach(h => data.append("includes", h));
      form.excludes.forEach(h => data.append("excludes", h));
      if (imageFile) data.append("image", imageFile);

      const config = { headers: { "Content-Type": "multipart/form-data" } };
      let res;
      if (editingId) {
        res = await api.put(`/api/packages/${editingId}`, data, config);
        setPackages(packages.map(p => p._id === editingId ? res.data : p));
        setSuccess("Package updated successfully");
      } else {
        res = await api.post("/api/packages", data, config);
        setPackages([res.data, ...packages]);
        setSuccess("Package created successfully");
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save package");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;
    try {
      await api.delete(`/api/packages/${id}`);
      setPackages(packages.filter(p => p._id !== id));
      setSuccess("Package deleted");
    } catch (err) {
      setError("Failed to delete package");
    }
  };

  const handleEdit = (pkg) => {
    setForm({
      name: pkg.name || "",
      category: pkg.category?._id || pkg.category || "",
      duration: pkg.duration || "",
      transport: pkg.transport || "",
      accommodation: pkg.accommodation || "",
      description: pkg.description || "",
      itinerary: pkg.itinerary || [],
      highlights: pkg.highlights || [],
      includes: pkg.includes || [],
      excludes: pkg.excludes || [],
      isFeatured: pkg.isFeatured || false,
    });
    setEditingId(pkg._id);
    setImagePreview(pkg.image ? `${API_URL}${pkg.image}` : null);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getCategoryName = (id) => categories.find(c => c._id === id)?.name || "—";

  return (
    <AdminLayout>
      <div className="admin-packages-container">
        <h1>Manage Tour Packages</h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="package-form">
          <h2>{editingId ? "Edit Package" : "Create New Package"}</h2>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Package Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g., 8-Day Cultural Triangle" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duration *</label>
              <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g., 8 Days / 7 Nights" />
            </div>
            <div className="form-group">
              <label>Transport</label>
              <input value={form.transport} onChange={e => setForm({ ...form, transport: e.target.value })} placeholder="e.g., Private AC Vehicle" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Accommodation</label>
              <input value={form.accommodation} onChange={e => setForm({ ...form, accommodation: e.target.value })} placeholder="e.g., Flexible — confirmed after consultation" />
            </div>
            <div className="form-group featured-toggle">
              <label>
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
                &nbsp; Feature on Homepage
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows="4" placeholder="Describe this tour package..." />
          </div>

          <div className="form-group">
            <label>Cover Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <TagInput label="Highlights (press Enter or click Add)" values={form.highlights}
            onChange={v => setForm({ ...form, highlights: v })} placeholder="e.g., Sigiriya Rock Fortress" />

          <TagInput label="What's Included" values={form.includes}
            onChange={v => setForm({ ...form, includes: v })} placeholder="e.g., Daily Breakfast" />

          <TagInput label="What's Excluded" values={form.excludes}
            onChange={v => setForm({ ...form, excludes: v })} placeholder="e.g., International Flights" />

          <div className="itinerary-section">
            <h3>Day-by-Day Itinerary</h3>
            {form.itinerary.map((day, i) => (
              <div key={i} className="itinerary-day">
                <div className="itinerary-day-header">
                  <h4>Day {day.day}</h4>
                  <button type="button" className="btn btn-sm btn-delete" onClick={() => removeDay(i)}>Remove</button>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Day Title</label>
                    <input value={day.title} onChange={e => updateItinerary(i, "title", e.target.value)} placeholder="e.g., Sigiriya Rock & Village Life" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Activities & Details</label>
                  <textarea value={day.activities} onChange={e => updateItinerary(i, "activities", e.target.value)} rows="4" placeholder="Describe the day's activities in detail..." />
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addDay}>+ Add Day</button>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : editingId ? "Update Package" : "Create Package"}
            </button>
            {editingId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
          </div>
        </form>

        <div className="package-list">
          <h2>Tour Packages ({packages.length})</h2>
          {packages.length === 0 ? (
            <p>No packages yet. Create one above.</p>
          ) : (
            <table className="packages-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Days</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map(pkg => (
                  <tr key={pkg._id}>
                    <td>
                      {pkg.image
                        ? <img src={`${API_URL}${pkg.image}`} alt={pkg.name} style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 4 }} />
                        : <span style={{ color: "#999" }}>—</span>}
                    </td>
                    <td><strong>{pkg.name}</strong></td>
                    <td>{getCategoryName(pkg.category?._id || pkg.category)}</td>
                    <td>{pkg.duration}</td>
                    <td>{pkg.itinerary?.length || 0}</td>
                    <td>{pkg.isFeatured ? "⭐ Yes" : "—"}</td>
                    <td>
                      <button className="btn btn-sm btn-edit" onClick={() => handleEdit(pkg)}>Edit</button>
                      <button className="btn btn-sm btn-delete" onClick={() => handleDelete(pkg._id)}>Delete</button>
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
