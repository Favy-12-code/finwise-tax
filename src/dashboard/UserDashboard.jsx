import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completion, setCompletion] = useState(0);
  const [missing, setMissing] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/dashboard", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }

      setLoading(false);
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="spinner"></div>;

  if (!user) return <div>Failed to load dashboard</div>;

  return (
    <div className="dashboard">
      

      {/* USER INFO */}
      <div className="card">
        <h3>Your Info</h3>
        <p>Name: {user.name} </p>
        <p>Email: {user.email || "Not set"}</p>
        <p>Employment: {user.employment || "Not set"}</p>
        <p>Income: {user.incomeRange || "Not set"}</p>
        <p>Housing: {user.housing || "Not set"}</p>
        <p>Tax Status: {user.taxStatus || "Not set"}</p>
      </div>

      {/* LAST LOGIN */}
      <div className="card">
        <h3>Last Login</h3>
        <p>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "First time login"}</p>
      </div>
    </div>
  );
}