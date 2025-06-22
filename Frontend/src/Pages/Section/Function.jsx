import React from "react";

const FunctionSection = () => (
  <section className="py-12 px-4 bg-white text-center">
    {/* SECTION: TÍNH NĂNG SẼ CÓ TRÊN LANDING PAGE */}
    <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-10">
      TÍNH NĂNG SẼ CÓ TRÊN LANDING PAGE
    </h1>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-7xl mx-auto text-xl">
      {[
        "Cài đặt miễn phí SSL cho Website",
        "Thông Báo Giá Khách Hàng",
        "Tích Hợp Các loại Live Chat",
        "Có Sẵn Phiên Bản Mobile",
        "Form thu thập thông tin ",
        "Popup đăng ký",
        "Lựa Data Khách Hàng",
        "Tiện ích MAXLEAD Liên Hệ",
        "Vòng Quay May Mắn",
        "Đếm Ngược Thời Gian",
        "Thống Kê Data Về Mail và CRM",
        "Tạo Popup Cảm Ơn",
      ].map((feature, index) => (
        <button
          key={index}
          className="bg-blue-600 text-white px-4 h-20 w-full rounded-full font-medium hover:bg-orange-500 transition duration-300 flex items-center justify-center"
        >
          {feature}
        </button>
      ))}
    </div>
  </section>
);

export default FunctionSection;