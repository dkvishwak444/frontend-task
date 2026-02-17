import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error('login first');
    return <Navigate to="/login" replace />;
  }

  return children;
}
