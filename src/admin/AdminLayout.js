import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "./admin.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}
