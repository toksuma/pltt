import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sparkles, Zap, Target } from "lucide-react";
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
        if (Array.isArray(response.data) && response.data.length > 0) {
          setBanners(response.data);
        } else {
          setBanners(FALLBACK_BANNERS);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching banners, using fallback:", error);
        setBanners(FALLBACK_BANNERS);
        setIsLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        handleNext();
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [banners.length, currentIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-tech">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-secondary-600 font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-tech">
      {/* Tech Background Pattern */}
      <div className="absolute inset-0 bg-tech-pattern opacity-40"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/90 via-white/95 to-accent-50/90"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute top-40 right-10 w-64 h-64 bg-accent-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float animation-delay-4000"></div>

      <div className="relative container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Dịch vụ Landing Page chuyên nghiệp #1 Việt Nam
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-secondary-900">Thiết kế</span>{" "}
                <span className="text-gradient">Landing Page</span>{" "}
                <span className="text-secondary-900">chuyển đổi cao</span>
              </h1>
              
              <p className="text-xl text-secondary-600 leading-relaxed max-w-2xl">
                Tăng tỷ lệ chuyển đổi lên đến <span className="font-semibold text-primary-600">300%</span> với 
                các Landing Page được thiết kế theo chuẩn quốc tế, tối ưu cho mọi thiết bị và công cụ marketing hiện đại.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/Login" className="btn-primary group">
                Bắt đầu dự án ngay
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/interface" className="btn-secondary group">
                Xem Portfolio
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-secondary-200">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-success-100 rounded-lg mb-3 mx-auto">
                  <Target className="w-6 h-6 text-success-600" />
                </div>
                <div className="text-2xl font-bold text-secondary-900">98%</div>
                <div className="text-sm text-secondary-600">Tỷ lệ hoàn thành</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-3 mx-auto">
                  <Zap className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-secondary-900">1-3</div>
                <div className="text-sm text-secondary-600">Ngày hoàn thành</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-accent-100 rounded-lg mb-3 mx-auto">
                  <Sparkles className="w-6 h-6 text-accent-600" />
                </div>
                <div className="text-2xl font-bold text-secondary-900">500+</div>
                <div className="text-sm text-secondary-600">Dự án thành công</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-fade-in-up animation-delay-300">
            <div className="relative">
              {/* Main illustration container */}
              <div className="relative bg-white rounded-2xl shadow-2xl border border-secondary-200 p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  {/* Mock browser header */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-error-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                    <div className="flex-1 bg-secondary-100 h-6 rounded ml-4"></div>
                  </div>
                  
                  {/* Mock content */}
                  <div className="space-y-4">
                    <div className="h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-secondary-200 rounded w-full"></div>
                      <div className="h-3 bg-secondary-200 rounded w-4/5"></div>
                      <div className="h-3 bg-secondary-200 rounded w-3/5"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary-500 rounded"></div>
                      </div>
                      <div className="h-16 bg-accent-100 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-accent-500 rounded"></div>
                      </div>
                    </div>
                    <div className="h-10 bg-success-500 rounded-lg"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg border border-secondary-200 p-4 animate-bounce-gentle">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                  <span className="text-sm font-medium text-secondary-700">Tỷ lệ chuyển đổi +300%</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg border border-secondary-200 p-4 animate-pulse-gentle">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-sm font-medium text-secondary-700">Tốc độ tải &lt; 2s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-secondary-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-secondary-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Landingpage;