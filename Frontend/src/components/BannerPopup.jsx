import React, { useEffect, useState } from "react";
import axios from "axios";

const BannerPopup = () => {
  const [banner, setBanner] = useState(null);      // Lưu banner từ API
  const [show, setShow] = useState(false);         // Hiển thị popup hay không
  const [countdown, setCountdown] = useState(12 * 60 * 60); // Đếm ngược 12 tiếng (giây)

  // Lấy banner từ API (chỉ banner đang active)
  const fetchBanner = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/banners/active");
      if (res.data) {
        setBanner(res.data);
        setShow(true);
        setCountdown(12 * 60 * 60); // Reset lại thời gian đếm
        localStorage.setItem("banner_last_shown", Date.now().toString()); // Đánh dấu đã hiển thị
      }
    } catch (err) {
      console.error("Không tải được banner:", err);
    }
  };

  // Kiểm tra đã qua 1 giờ chưa kể từ lần hiển thị gần nhất
  useEffect(() => {
    const lastShown = localStorage.getItem("banner_last_shown");
    const now = Date.now();
    if (!lastShown || now - lastShown > 60 * 60 * 1000) {
      fetchBanner();
    }
  }, []);

  // Đếm ngược mỗi giây
  useEffect(() => {
    if (show && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [show, countdown]);

  // Chuyển giây thành giờ:phút:giây
  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return { h, m, s: ss };
  };

  // Nếu chưa có banner hoặc không hiển thị thì return null (bỏ nút "Test Banner")
  if (!banner || !show) return null;

  const { h, m, s } = formatTime(countdown);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[90%] max-w-4xl flex overflow-hidden relative shadow-xl">
        {/* Nút đóng popup */}
        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-2xl"
          onClick={() => setShow(false)}
        >
          ✕
        </button>

        {/* Bên trái - ảnh và overlay */}
        <div className="w-1/2 relative h-96">
          <img
            src={banner.image_url}  // ✅ đảm bảo banner không null trước đó
            alt="Banner"
            className="w-full h-full object-cover"
          />
          {banner.overlay_text && (
            <div
              className="absolute bottom-4 left-4 text-2xl font-bold bg-black/40 px-3 py-2 rounded"
              style={{ color: banner.overlay_color }}
            >
              {banner.overlay_text}
            </div>
          )}
        </div>

        {/* Bên phải - nội dung + đếm ngược */}
        <div className="w-1/2 p-6 flex flex-col justify-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">{banner.title}</h2>
          <p className="text-gray-700">{banner.description}</p>
          <input
            type="text"
            placeholder="Số điện thoại"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded">
            ĐĂNG KÝ NGAY
          </button>

          {/* Đồng hồ đếm ngược */}
          <div className="text-center mt-4">
            <p className="font-bold">THỜI GIAN KHUYẾN MÃI CÒN</p>
            <div className="flex justify-center space-x-4 text-white text-xl font-bold mt-2">
              <div className="bg-blue-600 px-3 py-1 rounded">
                {h}
                <br />
                <span className="text-sm font-normal">Giờ</span>
              </div>
              <div className="bg-blue-600 px-3 py-1 rounded">
                {m}
                <br />
                <span className="text-sm font-normal">Phút</span>
              </div>
              <div className="bg-blue-600 px-3 py-1 rounded">
                {s}
                <br />
                <span className="text-sm font-normal">Giây</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPopup;
