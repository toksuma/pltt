import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "../../axios";

const FALLBACK_BANNERS = [
  { url: "./BG.jpg", active: 1, display_order: 1 }
];

const Landingpage = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/backgrounds/active");
        // Nếu trả về mảng hợp lệ và có ít nhất một phần tử
        if (Array.isArray(response.data) && response.data.length > 0) {
          setBanners(response.data);
        } else {
          setBanners(FALLBACK_BANNERS);
        }
        setIsLoading(false);
      } catch (error) {
        // Nếu lỗi (không kết nối được db/backend), dùng ảnh mặc định
        console.error("Error fetching banners, dùng ảnh fallback:", error);
        setBanners(FALLBACK_BANNERS);
        setIsLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-advance carousel
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [banners.length, currentIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className="min-h-screen py-16 flex items-center justify-start transition-all relative">
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ 
          backgroundImage: currentBanner 
            ? `url('${currentBanner.url}')` 
            : 'url("./bg.jpg")'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      
      {/* Content */}
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
      
      {/* Navigation controls at bottom */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrevious}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:scale-110"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 hover:scale-110"
              aria-label="Next banner"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landingpage;