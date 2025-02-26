import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Prevent flickering
  if (!currentUser) return <Navigate to="/login" />; // Redirect if not logged in
  if (role && userRole !== role) return <Navigate to="/unauthorized" />; // Restrict access

  return children;
};

export default ProtectedRoute;
