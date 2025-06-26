import React, { useEffect, useState } from "react";
import axios from "axios";

const BannerPopup = () => {
  const [banner, setBanner] = useState(null);
  const [show, setShow] = useState(false);

  // ✅ Tải banner khi cần (dùng lại)
  const fetchBanner = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/banners/active");
      if (res.data) {
        setBanner(res.data);
        setShow(true);
        localStorage.setItem("banner_last_shown", Date.now().toString());
      }
    } catch (err) {
      console.error("Không tải được banner:", err);
    }
  };

  useEffect(() => {
    const lastShown = localStorage.getItem("banner_last_shown");
    const now = Date.now();

    if (!lastShown || now - lastShown > 3600000) {
      fetchBanner();
    }
  }, []);

  // ✅ Hàm test banner ngay
  const showBannerNow = () => {
    fetchBanner();
  };

  if (!banner || !show) {
    // 🔘 Nút test nếu banner đang ẩn
    return (
      <button
        onClick={showBannerNow}
        className="fixed bottom-5 right-5 bg-blue-600 text-white px-3 py-2 rounded shadow-md z-50"
      >
        Test Banner
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-xl text-center relative shadow-xl">
        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500"
          onClick={() => setShow(false)}
        >
          ✕
        </button>
        <img
          src={banner.image_url}
          alt="Banner"
          className="max-w-full max-h-64 object-contain mx-auto mb-4"
        />
        <h2 className="text-xl font-bold">{banner.title}</h2>
        <p className="mt-2">{banner.description}</p>
      </div>
    </div>
  );
};

export default BannerPopup;
