import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Giả lập API lấy ảnh nền (thay bằng fetch thực tế nếu có backend)
const fetchBackground = async () => {
  // Ví dụ: chỉ lấy ảnh đang dùng
  // Nếu API trả về danh sách, chọn ảnh có trạng thái "active"
  return "/uploads/bg1.jpg"; // Đường dẫn ảnh từ database/server
};

const Landingpage = () => {
  const [background, setBackground] = useState("");

  useEffect(() => {
    const getBackground = async () => {
      const bg = await fetchBackground();
      setBackground(bg);
    };
    getBackground();
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen py-16 flex items-center justify-start transition-all"
      style={{ backgroundImage: `url('${background}')` }}
    >
      <div className="max-w-6xl w-full px-6 text-white text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          DỊCH VỤ THIẾT KẾ WEB LANDING PAGE CHUYÊN NGHIỆP
        </h1>
        <h2 className="text-lg md:text-xl font-medium mb-6 max-w-3xl">
          Chuyên thiết kế web Landing Page giới thiệu sản phẩm dịch vụ giúp bán hàng online hiệu quả và tiết kiệm chi phí nhất.
        </h2>
        <div className="flex items-center space-x-6">
          <Link to="/Login">
            <button className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition duration-200 transform hover:scale-105 shadow">
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
};

export default Landingpage;