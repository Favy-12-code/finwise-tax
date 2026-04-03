// src/components/Widgets.jsx
import React from "react";

export const QuickSummary = ({ data }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px" }}>
    {Object.entries(data).map(([tax, value]) => (
      <div key={tax} style={cardStyle}>
        <h4>{tax}</h4>
        <p>₦{value}</p>
      </div>
    ))}
  </div>
);

export const TaxCalendar = ({ taxes }) => (
  <div style={{ ...cardStyle, marginTop: "20px" }}>
    <h3>Monthly Tax Calendar</h3>
    {taxes.map((t) => (
      <div key={t.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
        <span>{t.type}</span>
        <span style={{ color: t.status === "Paid" ? "green" : t.status === "Upcoming" ? "orange" : "red" }}>{t.status}</span>
        <span>{new Date(t.dueDate).toLocaleDateString()}</span>
      </div>
    ))}
  </div>
);

const cardStyle = {
  background: "#fff",
  padding: "15px",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
};