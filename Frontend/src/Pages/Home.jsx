import React from "react";
import { Link } from "react-router-dom";

const industries = [
  { name: 'BẤT ĐỘNG SẢN', image: '/bds.png' },
  { name: 'THẨM MĨ VIỆN', image: '/tmv.jpg' },
  { name: 'NHA KHOA', image: '/nk.jpg' },
  { name: 'SHOP ONLINE', image: '/so.jpg' },
  { name: 'SẢN PHẨM', image: '/web.webp' },
  { name: 'DỊCH VỤ', image: '/dv.jpg' },
  { name: 'SỰ KIỆN', image: '/sk.jpg' },
  { name: 'KHÓA HỌC', image: '/kh.jpg' },
];

const Home = () => {
  return (
    <div>

      {/* PHẦN HEADER VỚI BACKGROUND ẢNH */}
      <div
        className="bg-cover bg-center min-h-[400px] py-16"
        style={{ backgroundImage: "url('/BG.jpg')" }}
      >
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 pl-[2cm]">
            DỊCH VỤ THIẾT KẾ WEB LANDING PAGE CHUYÊN NGHIỆP123
          </h1>
          <h2 className="text-lg md:text-xl font-medium mb-6 pl-[2cm] max-w-3xl">
            Chuyên thiết kế web Landing Page giới thiệu sản phẩm dịch vụ giúp bán hàng online hiệu quả và tiết kiệm chi phí nhất.
          </h2>

          <div className="flex items-center space-x-6 pl-[2cm]">
            <Link to="/Login">
              <button className="bg-white text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition">
                ĐĂNG KÝ TƯ VẤN
              </button>
            </Link>
            <Link to="/interface" className="hover:text-[#FCCA7A] hover:font-bold transition duration-200">
              XEM GIAO DIỆN →
            </Link>
          </div>
        </div>
      </div>

      {/* PHẦN DỊCH VỤ LANDING PAGE THEO NGÀNH */}
      <section className="py-12 px-4 bg-white text-center">
        <h1 className="text-3xl font-bold text-black">
          DỊCH VỤ LANDING PAGE THEO NGÀNH
        </h1>

        {/* Đường gợn sóng đỏ mỏng, dồn dập */}
        <div className="flex justify-center mt-4 mb-6">
          <svg
            width="640"
            height="20"
            viewBox="0 0 640 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="
                M0 10
                Q 20 0, 40 10
                T 80 10
                T 120 10
                T 160 10
                T 200 10
                T 240 10
                T 280 10
                T 320 10
                T 360 10
                T 400 10
                T 440 10
                T 480 10
                T 520 10
                T 560 10
                T 600 10
                T 640 10
              "
              stroke="red"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Lưới ngành 4 cột × 2 hàng */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-2xl gap-8 max-w-7xl mx-auto mt-6">
          {industries.map((item, index) => (
            <div key={index} className="text-center">
              <h2 className="w-[300px] mx-auto text-3xl font-bold text-red-600 mb-3">
                {item.name}
              </h2>
              <img
                src={item.image}
                alt={item.name}
                className="w-[300px] h-[200px] object-cover rounded-2xl mx-auto mb-3"
              />
              <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* PHẦN GIỚI THIỆU VỀ TUNGPAGE */}
      <section className="py-12 px-4 bg-gray-100 text-center">
        <h1 className="text-3xl font-bold text-black mb-6">
          TẠI SAO NÊN CHỌN TUNGPAGE?
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 mb-8">
          TungPage là dịch vụ thiết kế web Landing Page chuyên nghiệp, giúp bạn
          giới thiệu sản phẩm, dịch vụ một cách hiệu quả nhất. Với giao diện
          đẹp mắt, tốc độ tải nhanh và tối ưu SEO, chúng tôi cam kết mang đến
          trải nghiệm tốt nhất cho khách hàng.
        </p>
        <Link to="/interface" className="text-red-600 hover:underline">
          Xem giao diện →
        </Link>
      </section>
    </div>
  );
};

export default Home;
