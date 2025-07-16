import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaNewspaper,
  FaEnvelope,
  FaImage,
  FaSignOutAlt,
  FaCogs, // ✅ THÊM ICON
  FaUser, // ✅ THÊM ICON CHO PROFILE
} from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const [atTop, setAtTop] = useState(true);
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("Chưa xác định");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    if (storedRole) setRole(storedRole);
    if (storedUsername) setUsername(storedUsername);

    const handleScroll = () => {
      setAtTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topValue = atTop ? "64px" : "0px";
  const heightValue = atTop ? "calc(100vh - 64px)" : "100vh";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/admin/login");
  };

  return (
    <div
      className={`fixed left-0 z-40 bg-gray-900 text-white w-[250px] flex flex-col transition-transform duration-300 ease-in-out shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ top: topValue, height: heightValue }}
    >
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-bold">QUẢN TRỊ WEBSITE</h3>
        <p className="text-sm text-gray-400">TungPageV7</p>
        <p className="text-sm text-green-400 mt-2">
          👤 Tài khoản: {username}
        </p>
      </div>

      <ul className="mt-4 space-y-2 px-4 flex-1">
        {role === "admin" && (
          <li>
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
                isActive("/admin/dashboard") ? "bg-gray-700" : ""
              }`}
            >
              <FaChartBar />
              <span>Trang tổng quan</span>
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/admin/articles"
            className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
              isActive("/admin/articles") ? "bg-gray-700" : ""
            }`}
          >
            <FaNewspaper />
            <span>Quản lý bài viết</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/contacts"
            className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
              isActive("/admin/contacts") ? "bg-gray-700" : ""
            }`}
          >
            <FaEnvelope />
            <span>Form liên hệ</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/banners"
            className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
              isActive("/admin/banners") ? "bg-gray-700" : ""
            }`}
          >
            <FaImage />
            <span>Quản lý banner</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/interfaces"
            className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
              isActive("/admin/interfaces") ? "bg-gray-700" : ""
            }`}
          >
            <FaCogs />
            <span>Quản lý giao diện</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/profile"
            className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 ${
              isActive("/admin/profile") ? "bg-gray-700" : ""
            }`}
          >
            <FaUser />
            <span>Thông tin cá nhân</span>
          </Link>
        </li>
      </ul>

      <div className="p-4 border-t border-gray-700 text-center">
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 font-medium text-sm"
        >
          <FaSignOutAlt className="inline-block mr-1" />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
  