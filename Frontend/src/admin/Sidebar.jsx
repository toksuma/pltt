import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaNewspaper,
  FaEnvelope,
  FaImage,
  FaSignOutAlt,
  FaCogs,
  FaUsers,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // So sánh pathname với path truyền vào
  const isActive = (path) => location.pathname === path;

  // Trạng thái scroll
  const [atTop, setAtTop] = useState(true);
  // State cho role và username
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Đọc từ localStorage khi mount hoặc khi chuyển trang
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    // Log các giá trị lấy được từ localStorage
    console.log("==== Sidebar Debug ====");
    console.log("localStorage.role:", storedRole);
    console.log("localStorage.username:", storedUsername);
    console.log("window.location.pathname:", window.location.pathname);

    setRole(storedRole || "Không xác định");
    setUsername(storedUsername || "Chưa xác định");
  }, [location.pathname]); // Sẽ re-render khi chuyển trang

  useEffect(() => {
    // Xử lý hiệu ứng cuộn cho sidebar
    const handleScroll = () => {
      setAtTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Xác định vị trí sidebar khi cuộn
  const topValue = atTop ? "64px" : "0px";
  const heightValue = atTop ? "calc(100vh - 64px)" : "100vh";

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    console.log("==== Sidebar Debug ====");
    console.log("Đã xóa token, role, username khỏi localStorage");
    navigate("/admin/login");
  };

  return (
    <div
      className={`fixed left-0 z-40 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white w-[250px] flex flex-col transition-transform duration-300 ease-in-out shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ top: topValue, height: heightValue }}
    >
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-extrabold tracking-wider">QUẢN TRỊ WEBSITE</h3>
        <p className="text-sm text-pink-300 font-semibold">TungSideBarV8</p>
        <div className="mt-2 space-y-1">
          <p className="text-xs text-green-400 font-medium">
            👤 Username: <span className="text-white font-semibold">{username}</span>
          </p>
          <p className="text-xs text-yellow-400 font-medium">
            🏷️ Role: <span className="text-white font-semibold">
              {role === "admin" ? "Admin" : (role === "staff" ? "Staff" : role)}
            </span>
          </p>
        </div>
      </div>

      <ul className="mt-4 space-y-2 px-4 flex-1">
        {/* Profile - accessible to all users */}
        <li>
          <Link
            to="/admin/profile"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
              isActive("/admin/profile")
                ? "bg-gradient-to-r from-pink-500 via-red-400 to-orange-300 text-white shadow"
                : "hover:bg-gray-700"
            }`}
          >
            <FaUserCircle />
            <span>Thông tin cá nhân</span>
          </Link>
        </li>
        
        {role === "admin" && (
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive("/admin/dashboard")
                  ? "bg-gradient-to-r from-pink-500 via-red-400 to-orange-300 text-white shadow"
                  : "hover:bg-gray-700"
              }`}
            >
              <FaChartBar />
              <span>Trang tổng quan</span>
            </Link>
          </li>
        )}
        {role === "admin" && (
          <li>
            <Link
              to="/admin/users"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                isActive("/admin/users")
                  ? "bg-gradient-to-r from-pink-500 via-red-400 to-orange-300 text-white shadow"
                  : "hover:bg-gray-700"
              }`}
            >
              <FaUsers />
              <span>Quản lý người dùng</span>
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/admin/articles"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
              isActive("/admin/articles")
                ? "bg-gradient-to-r from-pink-500 via-red-400 to-orange-300 text-white shadow"
                : "hover:bg-gray-700"
            }`}
          >
            <FaNewspaper />
            <span>Quản lý bài viết</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/contacts"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
              isActive("/admin/contacts")
                ? "bg-gradient-to-r from-pink-500 via-red-400 to-orange-300 text-white shadow"
                : "hover:bg-gray-700"
            }`}
          >
            <FaEnvelope />
            <span>Form liên hệ</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/banners"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
              isActive("/admin/banners")
                ? "bg-gradient-to-r from-pink-500 via-red-400 to-orange-300 text-white shadow"
                : "hover:bg-gray-700"
            }`}
          >
            <FaImage />
            <span>Quản lý banner</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/interfaces"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
              isActive("/admin/interfaces")
                ? "bg-gradient-to-r from-pink-500 via-red-400 to-orange-300 text-white shadow"
                : "hover:bg-gray-700"
            }`}
          >
            <FaCogs />
            <span>Quản lý giao diện</span>
          </Link>
        </li>
      </ul>

      <div className="p-4 border-t border-gray-700 text-center">
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 font-semibold text-sm transition"
        >
          <FaSignOutAlt className="inline-block mr-1" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;