import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API}/api/dashboard`, {
          credentials: "include",
        });

        if (res.status === 401) {
          setStatus("unauthorized");
          return;
        }

        const data = await res.json();

        if (data.success) {
          setStatus("authorized");
        } else {
          setStatus("unauthorized");
        }
      } catch {
        setStatus("unauthorized");
      }
    };

    checkAuth();
  }, []);

  // ✅ show loader while checking
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthorized") {
    return <Navigate to="/signin" replace />;
  }

  return children;
}