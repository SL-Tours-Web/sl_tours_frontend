import React, { useState, useEffect } from "react";
import api from "../../config/api";
import AdminLayout from "../AdminLayout";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({ packages: 0, categories: 0, destinations: 0, inquiries: { total: 0, new: 0 } });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pkgRes, catRes, destRes, inqRes] = await Promise.all([
          api.get("/api/packages"),
          api.get("/api/categories"),
          api.get("/api/destinations"),
          api.get("/api/inquiries"),
        ]);
        const inquiries = inqRes.data.data || [];
        setStats({
          packages: pkgRes.data.length,
          categories: catRes.data.length,
          destinations: destRes.data.length,
          inquiries: {
            total: inquiries.length,
            new: inquiries.filter(i => i.status === "New").length,
          },
        });
        setRecentInquiries(inquiries.slice(0, 5));
      } catch (err) {
        console.error("Dashboard fetch error", err);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const formatDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  const STATUS_COLORS = { New: "#e74c3c", Contacted: "#f39c12", Closed: "#27ae60" };

  return (
    <AdminLayout>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome back — here's your current overview.</p>
        </div>

        {loading ? (
          <p>Loading stats...</p>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card stat-inquiries" onClick={() => navigate("/admin/inquiries")}>
                <div className="stat-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                <div className="stat-info">
                  <div className="stat-number">{stats.inquiries.total}</div>
                  <div className="stat-label">Total Inquiries</div>
                </div>
                {stats.inquiries.new > 0 && (
                  <div className="stat-badge">{stats.inquiries.new} New</div>
                )}
              </div>

              <div className="stat-card" onClick={() => navigate("/admin/AdminPackages")}>
                <div className="stat-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg></div>
                <div className="stat-info">
                  <div className="stat-number">{stats.packages}</div>
                  <div className="stat-label">Packages</div>
                </div>
              </div>

              <div className="stat-card" onClick={() => navigate("/admin/AdminCategories")}>
                <div className="stat-icon">🏷️</div>
                <div className="stat-info">
                  <div className="stat-number">{stats.categories}</div>
                  <div className="stat-label">Categories</div>
                </div>
              </div>

              <div className="stat-card" onClick={() => navigate("/admin/destinations")}>
                <div className="stat-icon">📍</div>
                <div className="stat-info">
                  <div className="stat-number">{stats.destinations}</div>
                  <div className="stat-label">Destinations</div>
                </div>
              </div>
            </div>

            <div className="recent-inquiries">
              <div className="section-header">
                <h2>Recent Inquiries</h2>
                <button className="view-all-btn" onClick={() => navigate("/admin/inquiries")}>View All →</button>
              </div>

              {recentInquiries.length === 0 ? (
                <p className="no-data">No inquiries yet. They'll appear here when tourists submit the contact form.</p>
              ) : (
                <div className="inquiry-rows">
                  {recentInquiries.map(inq => (
                    <div key={inq._id} className="inquiry-row" onClick={() => navigate("/admin/inquiries")}>
                      <div className="inq-name">{inq.fullName}</div>
                      <div className="inq-meta">
                        <span>{inq.country}</span>
                        <span>·</span>
                        <span>{inq.packageInterested}</span>
                      </div>
                      <div className="inq-contact">
                        <a href={`https://wa.me/${inq.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                          onClick={e => e.stopPropagation()} className="inq-wa">💬 WhatsApp</a>
                        <a href={`mailto:${inq.email}`} onClick={e => e.stopPropagation()} className="inq-email">✉️ Email</a>
                      </div>
                      <div className="inq-right">
                        <span className="inq-date">{formatDate(inq.createdAt)}</span>
                        <span className="inq-status" style={{ background: STATUS_COLORS[inq.status] }}>{inq.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button onClick={() => navigate("/admin/AdminPackages")}>+ Add Package</button>
                <button onClick={() => navigate("/admin/AdminCategories")}>+ Add Category</button>
                <button onClick={() => navigate("/admin/destinations")}>+ Add Destination</button>
                <button onClick={() => navigate("/admin/inquiries")}>View Inquiries</button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
