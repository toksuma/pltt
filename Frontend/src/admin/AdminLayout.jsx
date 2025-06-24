// src/Admin/AdminLayout.jsx
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaChartBar, FaNewspaper, FaEnvelope, FaImage } from "react-icons/fa";

const menuItems = [
  { label: "Trang tổng quan", icon: <FaChartBar />, path: "/admin/dashboard" },
  { label: "Quản lý bài viết", icon: <FaNewspaper />, path: "/admin/articles" },
  { label: "Form liên hệ", icon: <FaEnvelope />, path: "/admin/contacts" },
  { label: "Quản lý banner", icon: <FaImage />, path: "/admin/banners" },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed top-0 left-0 h-screen z-50">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-lg font-bold">QUẢN TRỊ WEBSITE</h1>
          <p className="text-sm text-gray-400">[Tên Page]</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition-all ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="ml-64 w-full bg-gray-100 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
}
