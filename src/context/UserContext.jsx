// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/api/dashboard`, { credentials: "include" });
        const data = await res.json();
        if (data.success) setUser(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [API]);

  return (
    <UserContext.Provider value={{ user, setUser, notifications, setNotifications }}>
      {children}
    </UserContext.Provider>
  );
};