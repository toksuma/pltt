import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white">
      <div
        className="bg-cover bg-center py-16 px-4 text-center text-white"
        style={{
          backgroundImage: "url('./BG.jpg')"
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 ">TƯ VẤN MIỄN PHÍ</h1>
        <h2 className="text-lg md:text-xl mb-6 max-w-5xl mx-auto">
          Bạn cần sự hỗ trợ hoặc tư vấn thêm về thông tin sản phẩm dịch vụ hãy liên hệ ngay với ao
          <span className="font-semibold text-[#003366]"> TÙNG MEDIA</span>
                   </h2>
        <div className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-semibold shadow-md transition duration-300 transform hover:scale-105">
          Hotline/Zalo: 01235466
        </div>
      </div>
      <div className="bg-gray-900 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ">
          <div>
            <h1 className="text-lg font-semibold mb-4">Liên hệ với Tùng Media</h1>
            <ul className="space-y-2 text-lg text-gray-300 mb-4">
              <li>Hotline: 0123 456 789</li>
              <li>Email: contact@tungmedia.vn</li>
              <li>Facebook: fb.com/tungmedia</li>
              <li>Zalo: 0987 654 321</li>
              <li>Địa chỉ: 123 Đường ABC, TP.HCM</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://vhu.edu.vn/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaFacebookF />
              </a>
              <a href="https://vhu.edu.vn/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaTwitter />
              </a>
              <a href="https://vhu.edu.vn/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaYoutube />
              </a>
              <a href="https://vhu.edu.vn/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaTiktok />
              </a>
            </div>
          </div>
              <div>
            <h3 className="text-lg font-semibold mb-4">Dịch Vụ</h3>
            <ul className="space-y-2 text-lg text-gray-300">
              <li><a href="/" className="hover:text-orange-500">Thiết kế website</a></li>
              <li><a href="/" className="hover:text-orange-500">Chụp ảnh quảng cáo</a></li>
              <li><a href="/" className="hover:text-orange-500">Quản lý Fanpage</a></li>
              <li><a href="/" className="hover:text-orange-500">Quay video doanh nghiệp</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Hướng dẫn</h3>
            <ul className="space-y-2 text-lg text-gray-300">
              <li><a href="/" className="hover:text-orange-500">Cách đặt dịch vụ</a></li>
              <li><a href="/" className="hover:text-orange-500">Chính sách bảo mật</a></li>
              <li><a href="/" className="hover:text-orange-500">Điều khoản sử dụng</a></li>
              <li><a href="/" className="hover:text-orange-500">Hướng dẫn thanh toán</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Web dịch vụ</h3>
            <ul className="space-y-2 text-lg text-gray-300">
              <li><a href="/" className="hover:text-orange-500">tungmedia.vn</a></li>
              <li><a href="/" className="hover:text-orange-500">quangcaotung.vn</a></li>
              <li><a href="/" className="hover:text-orange-500">bookingmedia.vn</a></li>
              <li><a href="/" className="hover:text-orange-500">truyenthongtung.vn</a></li>
            </ul>
          </div>

        </div>
      </div>
      <div className="bg-yellow-400 text-base text-gray-900 text-center py-1">
        Bản quyền thuộc về 
        <span><a href="/"  className="text-[#fa4d3e] font-semibold hover:underline "> Tùng Media </a></span> – 
        Sản phẩm của Công ty 
        <a href="/" className="text-[#fa4d3e] font-semibold hover:underline"> TNHH Tùng Media</a>.
      </div>
    </footer>
  );
};

export default Footer;
