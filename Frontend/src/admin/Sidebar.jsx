import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaNewspaper,
  FaEnvelope,
  FaImage,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const headerHeight = 64;
  const [atTop, setAtTop] = useState(true);

  // Theo dõi scroll để điều chỉnh chiều cao/top
  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topValue = atTop ? `${headerHeight}px` : "0px";
  const heightValue = atTop
    ? `calc(100vh - ${headerHeight}px)`
    : "100vh";

  return (
    <>
      {/* NỀN PHỦ SAU SIDEBAR — giúp che background trắng */}
      {isOpen && (
        <div
          className="fixed left-0 bg-gray-900 z-30 w-[250px] transition-all duration-300 ease-in-out"
          style={{
            top: topValue,
            height: heightValue,
          }}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed left-0 z-40 bg-gray-900 text-white w-[250px] 
          transition-transform duration-300 ease-in-out shadow-xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{
          top: topValue,
          height: heightValue,
        }}
      >
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-bold">QUẢN TRỊ WEBSITE</h3>
          <p className="text-sm text-gray-400">TungPageV4</p>
          <p className="text-sm text-green-400 mt-2">👤 Chào, Admin</p>
        </div>

        <ul className="mt-4 space-y-2 px-4">
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
        </ul>

        <div className="p-4 border-t border-gray-700 text-center mt-auto">
          <button className="text-red-400 hover:text-red-300 font-medium text-sm">
            <FaSignOutAlt className="inline-block mr-1" />
            Đăng xuất
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
