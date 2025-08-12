import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ddd", display: "flex", gap: 12 }}>
      <Link to="/">Home</Link>
      {role === "admin" && <Link to="/admin-dashboard">Admin</Link>}
      {role === "user" && <Link to="/user-dashboard">Dashboard</Link>}
      <div style={{ marginLeft: "auto" }}>
        <Link to="/login">Login</Link>
        <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
      </div>
    </nav>
  );
}
