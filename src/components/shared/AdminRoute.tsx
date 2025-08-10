import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * AdminRoute Component
 * Protects routes that should only be accessible by admin users
 * Redirects non-admin users to dashboard
 */
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, let the main app handle redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but not admin, redirect to dashboard
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // If admin, render the protected component
  return <>{children}</>;
};

export default AdminRoute;
