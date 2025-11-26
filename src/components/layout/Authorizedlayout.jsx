import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedAdminRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" />;
  }

  if (decoded.role !== "Admin") {
    return <Navigate to="/not-authorized" />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
