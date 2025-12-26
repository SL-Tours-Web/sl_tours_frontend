import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">SL Tours</h2>

      <nav>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/tours">Tours</Link>
        <Link to="/admin/destinations">Destinations</Link>
        <Link to="/admin/gallery">Gallery</Link>
      </nav>
    </div>
  );
}
