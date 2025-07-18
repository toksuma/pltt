import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="flex items-center space-x-3 pr-4">
          <img src="/Logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="text-white text-2xl font-semibold">TungPageV8</span>
        </div>
        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-5">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-base transition duration-200 ${
                  isActive
                    ? "text-[#d3046c] font-bold"
                    : "text-white hover:text-[#d3046c] hover:font-bold"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
        {/* Nút Desktop */}
        <div className="hidden md:block pl-4">
          <Link to="/login">
            <button className="bg-white text-[#fa5b7a] px-4 py-1.5 rounded-full shadow hover:text-[#d3046c] hover:shadow-lg transition duration-300 transform hover:scale-105 text-base font-semibold">
              ĐĂNG KÝ
            </button>
          </Link>
        </div>
        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden flex items-center focus:outline-none"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </button>
      </div>
      {/* Mobile Slide Menu */}
      {menuOpen && (
        <>
          {/* Overlay, click ngoài để tắt */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-50"
            onClick={() => setMenuOpen(false)}
          />
          {/* Slide menu */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white rounded-l-2xl shadow-2xl z-50 flex flex-col py-8 px-6 animate-slidein">
            {/* Close button */}
            <button
              className="self-end text-[#fd9374] mb-2"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col items-center gap-2 mt-8">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-base transition duration-200 px-4 py-2 rounded-xl w-full text-center ${
                      isActive
                        ? "bg-[#fd9374] text-white font-bold"
                        : "text-[#d3046c] hover:bg-[#fd9374]/20"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="bg-[#fd9374] text-white px-5 py-2 rounded-full shadow font-semibold mt-4 w-full hover:bg-[#d3046c] transition">
                  ĐĂNG KÝ
                </button>
              </Link>
            </div>
          </div>
          {/* Slide animation Tailwind */}
          <style>
            {`
              @keyframes slidein {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
              .animate-slidein {
                animation: slidein 0.2s cubic-bezier(0.4,0,0.2,1);
              }
            `}
          </style>
        </>
      )}
    </header>
  );
}

export default Header;