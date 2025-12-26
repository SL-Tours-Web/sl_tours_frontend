import { useMemo, useState } from "react";
import AdminLayout from "../AdminLayout";
import "./Tours.css";

export default function Tours() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Demo data (later we will connect backend)
  const [tours, setTours] = useState([
    { id: 1, title: "Ella Adventure", days: 3, price: 250, status: "Active" },
    { id: 2, title: "Sigiriya Day Tour", days: 1, price: 120, status: "Active" },
    { id: 3, title: "Kandy Cultural Trip", days: 2, price: 180, status: "Draft" },
  ]);

  // Form state
  const [form, setForm] = useState({
    title: "",
    days: "",
    price: "",
    status: "Active",
  });

  const filteredTours = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tours;
    return tours.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
    );
  }, [search, tours]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const addTour = (e) => {
    e.preventDefault();

    if (!form.title.trim()) return alert("Tour title is required");
    if (!form.days) return alert("Days is required");
    if (!form.price) return alert("Price is required");

    const newTour = {
      id: Date.now(),
      title: form.title.trim(),
      days: Number(form.days),
      price: Number(form.price),
      status: form.status,
    };

    setTours((p) => [newTour, ...p]);
    setForm({ title: "", days: "", price: "", status: "Active" });
    setShowForm(false);
  };

  const deleteTour = (id) => {
    const ok = window.confirm("Delete this tour?");
    if (!ok) return;
    setTours((p) => p.filter((t) => t.id !== id));
  };

  return (
    <AdminLayout>
      <div className="tours-page">
        {/* Header */}
        <div className="tours-header">
          <div>
            <h1 className="tours-title">Tours</h1>
            <p className="tours-subtitle">Manage your tour packages here.</p>
          </div>

          <button className="btn-primary" onClick={() => setShowForm(true)}>
            + Add Tour
          </button>
        </div>

        {/* Toolbar */}
        <div className="tours-toolbar">
          <input
            className="tours-search"
            placeholder="Search by title or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="tours-count">
            Total: <b>{filteredTours.length}</b>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrap">
          <table className="tours-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Days</th>
                <th>Price (USD)</th>
                <th>Status</th>
                <th className="th-actions">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTours.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty">
                    No tours found.
                  </td>
                </tr>
              ) : (
                filteredTours.map((tour) => (
                  <tr key={tour.id}>
                    <td className="td-title">{tour.title}</td>
                    <td>{tour.days}</td>
                    <td>${tour.price}</td>
                    <td>
                      <span
                        className={
                          tour.status === "Active"
                            ? "badge badge-active"
                            : "badge badge-draft"
                        }
                      >
                        {tour.status}
                      </span>
                    </td>
                    <td className="td-actions">
                      <button
                        className="btn-outline"
                        onClick={() => alert("Edit will be added later")}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => deleteTour(tour.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="modal-overlay" onClick={() => setShowForm(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h2>Add Tour</h2>
                <button
                  className="icon-btn"
                  onClick={() => setShowForm(false)}
                  aria-label="close"
                >
                  ✕
                </button>
              </div>

              <form className="modal-form" onSubmit={addTour}>
                <label>
                  Title
                  <input
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    placeholder="e.g., Ella Adventure"
                  />
                </label>

                <div className="grid-2">
                  <label>
                    Days
                    <input
                      type="number"
                      name="days"
                      value={form.days}
                      onChange={onChange}
                      placeholder="e.g., 3"
                      min="1"
                    />
                  </label>

                  <label>
                    Price (USD)
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={onChange}
                      placeholder="e.g., 250"
                      min="0"
                    />
                  </label>
                </div>

                <label>
                  Status
                  <select name="status" value={form.status} onChange={onChange}>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </label>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
