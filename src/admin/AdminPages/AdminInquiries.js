import React, { useState, useEffect } from "react";
import api from "../../config/api";
import AdminLayout from "../AdminLayout";
import "./AdminInquiries.css";

const STATUS_COLORS = { New: "#e74c3c", Contacted: "#f39c12", Closed: "#27ae60" };
const WHATSAPP_NUMBER = "94768511264"; // company WhatsApp for reference

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await api.get("/api/inquiries");
      setInquiries(res.data.data || []);
    } catch (err) {
      setError("Failed to load inquiries");
    }
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/api/inquiries/${id}`, { status });
      setInquiries(inquiries.map(i => i._id === id ? res.data.data : i));
    } catch (err) {
      setError("Failed to update status");
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await api.delete(`/api/inquiries/${id}`);
      setInquiries(inquiries.filter(i => i._id !== id));
    } catch (err) {
      setError("Failed to delete inquiry");
    }
  };

  const filtered = filter === "All" ? inquiries : inquiries.filter(i => i.status === filter);
  const counts = { All: inquiries.length, New: 0, Contacted: 0, Closed: 0 };
  inquiries.forEach(i => { if (counts[i.status] !== undefined) counts[i.status]++; });

  const formatDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const waLink = (num) => `https://wa.me/${num.replace(/\D/g, "")}`;
  const waGreeting = (name, pkg) =>
    `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${name}, thank you for your interest in ${pkg}! We're Vibe Ceylon Tours — happy to help plan your perfect Sri Lanka journey. 🌴`)}`;

  return (
    <AdminLayout>
      <div className="inquiries-container">
        <div className="inquiries-header">
          <h1>Inquiries</h1>
          <p className="header-sub">Manage all tourist inquiries. Click a row to see the full message.</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {/* Filter tabs */}
        <div className="filter-tabs">
          {["All", "New", "Contacted", "Closed"].map(s => (
            <button key={s} className={`filter-tab ${filter === s ? "active" : ""} status-${s.toLowerCase()}`}
              onClick={() => setFilter(s)}>
              {s}
              <span className="tab-count">{counts[s]}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">Loading inquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <p>No {filter !== "All" ? filter.toLowerCase() : ""} inquiries yet.</p>
          </div>
        ) : (
          <div className="inquiries-list">
            {filtered.map(inq => (
              <div key={inq._id} className={`inquiry-card status-border-${inq.status.toLowerCase()}`}>
                <div className="inquiry-main" onClick={() => setExpandedId(expandedId === inq._id ? null : inq._id)}>
                  <div className="inquiry-left">
                    <div className="inquiry-name">{inq.fullName}</div>
                    <div className="inquiry-meta">
                      <span className="meta-tag">🌍 {inq.country}</span>
                      <span className="meta-tag">📦 {inq.packageInterested}</span>
                      {inq.travelDates && <span className="meta-tag">📅 {inq.travelDates}</span>}
                      {inq.groupSize && <span className="meta-tag">👥 {inq.groupSize} pax</span>}
                    </div>
                    <div className="inquiry-contacts">
                      <a href={waLink(inq.whatsapp)} target="_blank" rel="noreferrer" className="contact-btn wa-btn"
                        onClick={e => e.stopPropagation()}>
                        💬 {inq.whatsapp}
                      </a>
                      <a href={`mailto:${inq.email}`} className="contact-btn email-btn"
                        onClick={e => e.stopPropagation()}>
                        ✉️ {inq.email}
                      </a>
                    </div>
                  </div>
                  <div className="inquiry-right">
                    <div className="inquiry-date">{formatDate(inq.createdAt)}</div>
                    <span className="status-badge" style={{ background: STATUS_COLORS[inq.status] }}>
                      {inq.status}
                    </span>
                    <div className="expand-hint">{expandedId === inq._id ? "▲" : "▼"}</div>
                  </div>
                </div>

                {expandedId === inq._id && (
                  <div className="inquiry-expanded">
                    {inq.message && (
                      <div className="message-box">
                        <strong>Message:</strong>
                        <p>{inq.message}</p>
                      </div>
                    )}
                    <div className="inquiry-actions">
                      <div className="status-actions">
                        <span style={{ fontWeight: 600, marginRight: 8 }}>Status:</span>
                        {["New", "Contacted", "Closed"].map(s => (
                          <button key={s} className={`status-btn ${inq.status === s ? "active" : ""}`}
                            style={inq.status === s ? { background: STATUS_COLORS[s], color: "#fff" } : {}}
                            onClick={() => updateStatus(inq._id, s)}>
                            {s}
                          </button>
                        ))}
                      </div>
                      <div className="action-btns">
                        <a href={waLink(inq.whatsapp)} target="_blank" rel="noreferrer" className="btn btn-wa">
                          Open WhatsApp
                        </a>
                        <a href={`mailto:${inq.email}?subject=Your Sri Lanka Tour Inquiry — Vibe Ceylon Tours&body=Hi ${inq.fullName},%0A%0AThank you for your interest in ${inq.packageInterested}.%0A%0AWe would love to help plan your perfect Sri Lanka journey!%0A%0ABest regards,%0AVibe Ceylon Tours`}
                          className="btn btn-email">
                          Send Email
                        </a>
                        <button className="btn btn-danger" onClick={() => deleteInquiry(inq._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
