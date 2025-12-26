import { NavLink } from "react-router-dom";
import "./Sidebar.css";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin</h2>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/AdminTours">Tours</NavLink>
        <NavLink to="/admin/destinations">Destinations</NavLink>
        <NavLink to="/admin/gallery">Gallery</NavLink>
      </nav>
    </div>
  );
}
