import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (role && user?.role !== role) {
    return (
      <Navigate
        to={user?.role === "admin" ? "/dashboard" : "/employee-dashboard"}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;