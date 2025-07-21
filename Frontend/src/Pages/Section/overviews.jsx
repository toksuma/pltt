import React from "react";

/**
 * Mục Tổng thể của Home - Overviews.
 * - Thiết kế tự nhiên, hiện đại, spacing thoáng, giao diện hài hòa, thân thiện.
 * - Ảnh và nội dung cân đối, tiêu đề nổi bật, mô tả dễ đọc.
 */

const Overviews = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
      {/* Nội dung giới thiệu */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-[2rem] md:text-[2.5rem] font-extrabold text-gray-800 mb-5 leading-tight">
          TỔNG THỂ VỀ LANDING PAGE
        </h1>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-2">
          <span className="font-semibold text-blue-600">CCO MEDIA</span> chuyên cung cấp trọn gói các dịch vụ về Landing Page như: Thiết kế Landing page cho mọi lĩnh vực, tối ưu và chỉnh giao diện Landing page, SEO landing page top GOOGLE.
        </p>
      </div>
      {/* Ảnh minh họa */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/cb.png"
          alt="Tổng thể Landing Page"
          className="w-[320px] h-auto rounded-2xl shadow-md object-cover bg-white"
        />
      </div>
    </div>
  </section>
);

export default Overviews;