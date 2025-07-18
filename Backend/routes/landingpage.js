import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // npm install react-slick slick-carousel

// Lấy danh sách background từ API/backend
const fetchBackgrounds = async () => {
  // Ví dụ dùng fetch, thay url bằng API thực tế của bạn
  const res = await fetch("/api/backgrounds");
  const data = await res.json();
  // Kết quả dạng [{id, url, order}, ...]
  // Sắp xếp theo order tăng dần
  return data.sort((a, b) => a.order - b.order);
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false,
  pauseOnHover: false,
};

const Landingpage = () => {
  const [backgrounds, setBackgrounds] = useState([]);

  useEffect(() => {
    const getBackgrounds = async () => {
      const bgs = await fetchBackgrounds();
      setBackgrounds(bgs);
    };
    getBackgrounds();
  }, []);

  return (
    <div className="min-h-screen py-16 flex items-center justify-start transition-all relative">
      {/* Slide hình nền */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <Slider {...sliderSettings}>
          {backgrounds.map((bg) => (
            <div key={bg.id} className="w-full h-full">
              <div
                className="bg-cover bg-center w-full h-screen"
                style={{ backgroundImage: `url('${bg.url}')` }}
              />
            </div>
          ))}
        </Slider>
        {/* Overlay làm mờ tối nếu muốn */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>
      <div className="max-w-6xl w-full px-6 text-white text-left z-10">
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