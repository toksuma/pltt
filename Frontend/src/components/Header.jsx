import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const menuItems = [
    { name: "Trang Chủ", path: "/" },
    { name: "Giao Diện", path: "/interface" },
    { name: "Bảng Giá", path: "/pricelist" },
    { name: "Dịch Vụ", path: "/service" },
    { name: "Hợp Tác", path: "/collab" },       
    { name: "Tin Tức", path: "/news" },
    { name: "Liên Hệ", path: "/contact" },
  ];

  return (
    <header className="bg-[#fd9374] shadow-md w-full top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center space-x-4 pr-8">
          <img src="/Logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="text-white text-3xl font-semibold">TungPageV5</span>
        </div>

         {/* Menu */}                                 
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-2xl transition duration-200 ${
                  isActive
                    ? "text-[#d3046c] font-bold"
                    : "text-white hover:text-[#d3046c] hover:font-bold hover:underline "
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Nút */}
        <div className="hidden md:block pl-4">
          <Link to="/login">
            <button className="bg-white text-[#fa5b7a] px-5 py-2 rounded-full hover:text-[#d3046c] transition duration-300 transform hover:scale-105">
              ĐĂNG KÝ
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
