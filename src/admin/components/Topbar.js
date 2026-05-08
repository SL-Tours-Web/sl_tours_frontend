export default function Topbar() {
  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="topbar">
      <h3>Admin Panel</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
