
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/dashboard.css";
import img1 from "./images/LogoImg.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboarduser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [activity, setActivity] = useState([]);

  const [vatInput, setVatInput] = useState("");
  const [citInput, setCitInput] = useState("");
  const [pitInput, setPitInput] = useState("");
  const [result, setResult] = useState("");

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
      const res = await fetch(`${API}/api/dashboard`, {
        credentials: "include"
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.data);

        const hasVisited = localStorage.getItem("hasVisitedDashboard");
        if (!hasVisited) {
          setIsNewUser(true);
          localStorage.setItem("hasVisitedDashboard", "true");
        }

        const stored = localStorage.getItem("activity");
        if (stored) setActivity(JSON.parse(stored));
      }

    } catch (err) {
      // Do NOT navigate here
      console.error("Failed to fetch dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

    fetchUser();
  }, []);

  // 🔥 SAVE ACTIVITY
  const saveActivity = (newData) => {
    setActivity(newData);
    localStorage.setItem("activity", JSON.stringify(newData));
  };

  const logActivity = (text, value) => {
    const newActivity = [
      { text, value, time: new Date().toLocaleString() },
      ...activity,
    ];
    saveActivity(newActivity);
  };

  // ❌ DELETE ONE ACTIVITY
  const deleteActivity = (index) => {
    const updated = activity.filter((_, i) => i !== index);
    saveActivity(updated);
  };

  // 🧹 CLEAR ALL
  const clearAllActivity = () => {
    saveActivity([]);
  };

  const handleLogout = async () => {
    await fetch(`${API}/api/auth/logout`, { credentials: "include" });
    
    localStorage.removeItem("hasVisitedDashboard");

    localStorage.clear();

    navigate("/");
  };

  // 🔥 CALCULATIONS
  const calculateVAT = () => {
    if (!vatInput) return;
    const vat = Number(vatInput) * 0.075;
    setResult(`VAT: ₦${vat.toLocaleString()}`);
    logActivity("VAT Calculated", vat);
  };

  const calculateCIT = () => {
    if (!citInput) return;
    const cit = Number(citInput) * 0.3;
    setResult(`CIT: ₦${cit.toLocaleString()}`);
    logActivity("CIT Calculated", cit);
  };

  const calculatePIT = () => {
    if (!pitInput) return;
    let income = Number(pitInput);
    let tax = 0;

    if (income <= 300000) tax = income * 0.07;
    else if (income <= 600000) tax = income * 0.11;
    else if (income <= 1100000) tax = income * 0.15;
    else if (income <= 1600000) tax = income * 0.19;
    else if (income <= 3200000) tax = income * 0.21;
    else tax = income * 0.24;

    setResult(`PIT: ₦${tax.toLocaleString()}`);
    logActivity("PIT Calculated", tax);
  };

  const getSuggestion = () => {
    if (result.includes("VAT")) return "💡 Track expenses to reduce VAT.";
    if (result.includes("CIT")) return "💡 Reinvest profits to reduce tax.";
    if (result.includes("PIT")) return "💡 You may qualify for tax relief.";
    return "";
  };

  const chartData = activity.slice(0, 5).map((a, i) => ({
    name: `T${i + 1}`,
    value: a.value || 0,
  }));

  if (!user) return null;

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <img src={img1} alt="logo" />
        <nav>
          <p className="active">Dashboard</p>
          <p>Calculator</p>
          <p>Records</p>
          <p>Predictions</p>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <header className="activity-header">
          <div className="">
            <h1>Welcome, {user.firstName || "User"}</h1>
            <p>
              {user.email
                ? `Email: ${user.email}`
                : `Phone: ${user.phone}`}
            </p>
          </div>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="calculator">
          <h2>Tax Calculator</h2>

          <div className="row">
            <input
              value={vatInput}
              onChange={(e) => setVatInput(e.target.value)}
              placeholder="VAT Sales"
            />
            <button onClick={calculateVAT}>Calculate</button>
          </div>

          <div className="row">
            <input
              value={citInput}
              onChange={(e) => setCitInput(e.target.value)}
              placeholder="CIT Profit"
            />
            <button onClick={calculateCIT}>Calculate</button>
          </div>

          <div className="row">
            <input
              value={pitInput}
              onChange={(e) => setPitInput(e.target.value)}
              placeholder="PIT Income"
            />
            <button onClick={calculatePIT}>Calculate</button>
          </div>

          {result && (
            <div className="result">
              <p>{result}</p>
              <small>{getSuggestion()}</small>
            </div>
          )}
        </section>

        {/* CHART */}
        <section className="card">
          <h3>Tax History</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" />
            </LineChart>
          </ResponsiveContainer>
        </section>

        {/* ACTIVITY */}
        <section className="activity">
          <div className="activity-header">
            <h3>Activity</h3>
            <button onClick={clearAllActivity}>Clear All</button>
          </div>

          {activity.length === 0 && <p>No activity yet</p>}

          {activity.map((a, i) => (
            <div key={i} className="activity-item">
              <div>
                <span>{a.text}</span>
                <small>{a.time}</small>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteActivity(i)}
              >
                ✕
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}