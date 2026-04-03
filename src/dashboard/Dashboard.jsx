// import { useEffect, useState } from "react";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [completion, setCompletion] = useState(0);
//   const [missing, setMissing] = useState([]);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/api/dashboard", {
//           credentials: "include",
//         });

//         const data = await res.json();

//         if (data.success) {
//           setUser(data.user);
//         } else {
//           console.log(data.message);
//         }
//       } catch (err) {
//         console.error("Error fetching dashboard:", err);
//       }

//       setLoading(false);
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) return <div className="spinner"></div>;

//   if (!user) return <div>Failed to load dashboard</div>;

//   return (
//     <div className="dashboard">
      

//       {/* USER INFO */}
//       <div className="card">
//         <h3>Your Info</h3>
//         <p>Name: {user.name} </p>
//         <p>Email: {user.email || "Not set"}</p>
//         <p>Employment: {user.employment || "Not set"}</p>
//         <p>Income: {user.incomeRange || "Not set"}</p>
//         <p>Housing: {user.housing || "Not set"}</p>
//         <p>Tax Status: {user.taxStatus || "Not set"}</p>
//       </div>

//       {/* LAST LOGIN */}
//       <div className="card">
//         <h3>Last Login</h3>
//         <p>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "First time login"}</p>
//       </div>
//     </div>
//   );
// }

// src/pages/Dashboard.jsx
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Sidebar, Header } from "./Layout";
import { QuickSummary, TaxCalendar } from "../components/Widgets";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, setUser, notifications } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, { method: "POST", credentials: "include" });
    setUser(null);
    navigate("/");
  };

  if (!user) return <div style={{ padding: "20px" }}>Please login again.</div>;

  // Example data for widgets
  const summaryData = {
    VAT: 37500,
    PAYE: 20000,
    WHT: 15000,
    CIT: 50000,
    "4% Dev Levy": 4000,
    "Next Month Prediction": 60000
  };

  const taxes = [
    { id: 1, type: "VAT", dueDate: "2026-04-05", status: "Paid" },
    { id: 2, type: "PAYE", dueDate: "2026-04-10", status: "Upcoming" },
    { id: 3, type: "CIT", dueDate: "2026-04-15", status: "Urgent" }
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Sidebar active={activeTab} setActive={setActiveTab} />

      <div style={{ flex: 1, background: "#f5f7fb" }}>
        <Header onLogout={handleLogout} notifications={notifications} />
        <div style={{ padding: "25px" }}>
          <h1>Welcome back, {user.firstName} 👋</h1>

          <QuickSummary data={summaryData} />
          <TaxCalendar taxes={taxes} />
        </div>
      </div>
    </div>
  );
}