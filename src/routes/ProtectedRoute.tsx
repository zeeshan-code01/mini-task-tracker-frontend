// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface Props {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = useAppSelector((state) => state.auth.token);
  const isAuthenticated = !!token;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
