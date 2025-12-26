export default function Topbar() {
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="topbar">
      <span>Admin Panel</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
