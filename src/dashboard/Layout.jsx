// src/components/Layout.jsx
import React from "react";

export const Sidebar = ({ active, setActive }) => {
  const menu = ["Dashboard", "Calculator", "Notifications", "Records", "Predictions", "Settings"];
  return (
    <div style={{ width: "220px", background: "#111", color: "#fff", height: "100vh", padding: "20px" }}>
      <h2 style={{ marginBottom: "40px" }}>FinWise</h2>
      {menu.map((item) => (
        <div
          key={item}
          onClick={() => setActive(item)}
          style={{
            padding: "10px",
            cursor: "pointer",
            background: active === item ? "#222" : "transparent",
            borderRadius: "8px",
            marginBottom: "5px"
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export const Header = ({ onLogout, notifications }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 25px", background: "#111", color: "#fff" }}>
    <h2>Dashboard</h2>
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <div style={{ position: "relative", cursor: "pointer" }}>
        🔔
        {notifications.length > 0 && (
          <span style={{
            position: "absolute",
            top: -5,
            right: -5,
            background: "red",
            color: "#fff",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px"
          }}>
            {notifications.length}
          </span>
        )}
      </div>
      <button onClick={onLogout} style={{ padding: "8px 12px", background: "#ff4d4f", border: "none", borderRadius: "8px", cursor: "pointer", color: "#fff" }}>
        Logout
      </button>
    </div>
  </div>
);