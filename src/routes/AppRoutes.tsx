// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Dashboard_v2 from "../pages/Dashboard_v2";
import Dashboard_v3 from "../pages/Dashboard_v3";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard_v2" element={<Dashboard_v2 />} />
      <Route path="/dashboard_v3" element={<Dashboard_v3 />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
