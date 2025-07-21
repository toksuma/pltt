import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

/**
 * Layout trang admin: kiểm tra đăng nhập, hiển thị sidebar, chuyển trang, thu gọn/mở rộng menu.
 * - Không dùng icon (xóa FaCog, dùng nút text).
 * - Comment tổng quan sau import.
 * - Comment rõ ràng cho từng khối/hàm chính.
 * - Làm gọn code, không đổi logic.
 */

const AdminLayout = () => {
  // State kiểm soát sidebar, trạng thái hover, trạng thái xác thực
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra token đăng nhập, điều hướng nếu chưa đăng nhập
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [navigate]);

  // Đóng/mở sidebar
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Chỉ render khi đã xác thực
  if (!isAuthorized) return null;

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Sidebar trái */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Nút thu gọn/mở rộng sidebar (không dùng icon, dùng text) */}
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
        {/* Đổi icon bằng text cho nút sidebar */}
        {isSidebarOpen ? (isHovering ? "⟨⟩" : "<") : (isHovering ? "⟨⟩" : ">")}
      </button>

      {/* Nội dung trang */}
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