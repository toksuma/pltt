// Frontend/src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default PrivateRoute;
