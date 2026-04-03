const API = import.meta.env.VITE_API_URL;

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const res = await fetch(`${API}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 ALWAYS INCLUDE
    body: body ? JSON.stringify(body) : null,
  });

  return res.json();
};