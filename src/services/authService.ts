// src/services/authService.ts
import axios from "axios";

const API_URL = "https://localhost:7196/api/Auth";

export const register = async (username: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

// src/services/authService.ts
export const login = async (email: string, password: string): Promise<string | null> => {
  const response = await fetch("https://localhost:7196/api/Auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Invalid credentials");

  const data = await response.json();
  return data.token || null;
};

