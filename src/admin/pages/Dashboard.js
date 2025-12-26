import AdminLayout from "../AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1>Dashboard</h1>

      <div className="stats">
        <div className="card">Tours<br /><b>12</b></div>
        <div className="card">Destinations<br /><b>8</b></div>
        <div className="card">Gallery Images<br /><b>45</b></div>
      </div>
    </AdminLayout>
  );
}
