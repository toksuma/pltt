import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Chưa login → về trang login
  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Đã login nhưng không có quyền → trang từ chối
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  // Nếu truyền children → render layout, nếu không thì dùng <Outlet />
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
