import axios from "axios";
import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", res.data.token);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button type="button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
