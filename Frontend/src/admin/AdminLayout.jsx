import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [navigate]);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  if (!isAuthorized) return null; // tránh render sớm trước khi kiểm tra token

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />

      {/* NÚT THU GỌN/MỞ RỘNG */}
      <button
        onClick={toggleSidebar}
        className="fixed top-[80px] z-40 w-12 h-12 bg-gray-800 text-white rounded-r-full 
          shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out 
          hover:scale-110 hover:bg-gray-700"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          left: isSidebarOpen ? "250px" : "0px",
        }}
        title="Thu gọn / Mở rộng menu"
      >
        <FaCog
          className={`text-2xl transition-transform ${
            isHovering
              ? "animate-spin-fast"
              : isSidebarOpen
              ? "animate-spin-slow"
              : ""
          }`}
        />
      </button>

      {/* NỘI DUNG */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-[250px]" : "ml-0"
        }`}
      >
        <div className="p-6 pt-[64px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
