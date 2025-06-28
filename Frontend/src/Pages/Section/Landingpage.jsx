import { Link } from "react-router-dom";

const Landingpage = () => (
  <div
    className="bg-cover bg-center min-h-screen py-16 flex items-center justify-start"
    style={{ backgroundImage: "url('/BG.jpg')" }}
  >
    <div className="max-w-6xl w-full px-6 text-white text-left">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        DỊCH VỤ THIẾT KẾ WEB LANDING PAGE CHUYÊN NGHIỆP123
      </h1>
      <h2 className="text-lg md:text-xl font-medium mb-6 max-w-3xl">
        Chuyên thiết kế web Landing Page giới thiệu sản phẩm dịch vụ giúp bán hàng online hiệu quả và tiết kiệm chi phí nhất.
      </h2>
      <div className="flex items-center space-x-6">
        <Link to="/Login">
          <button className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition">
            ĐĂNG KÝ TƯ VẤN
          </button>
        </Link>
        <Link
          to="/interface"
          className="hover:text-[#FCCA7A] hover:font-bold transition duration-200"
        >
          XEM GIAO DIỆN →
        </Link>
      </div>
    </div>
  </div>
);

export default Landingpage;