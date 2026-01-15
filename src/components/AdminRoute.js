import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (role !== "admin") {
    return <Navigate to="/user" />;
  }

  return children;
}
