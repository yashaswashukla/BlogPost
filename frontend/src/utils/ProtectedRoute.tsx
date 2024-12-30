import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
export default function ProtectedRoute() {
  const { loggedIn, loading } = useAuth();
  if (!loading) {
    return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
  }
}
