import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role: requiredRole }) {
  const { role } = useAuth();

  // Not logged in
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
