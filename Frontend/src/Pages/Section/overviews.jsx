import React from "react";
{/* Mục Tổng thể của home*/}
const Overviews = () => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/cb.png" 
          alt="Tổng thể Landing Page"
          className="w-[300px] h-auto rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
          TỔNG THỂ VỀ LANDING PAGE
        </h1>
        <p className="text-lg text-gray-700 text-justify leading-relaxed">
          CCO MEDIA chuyên cung cấp trọn gói các dịch vụ về Landing Page như: Thiết kế Landing page cho mọi lĩnh vực, tối ưu và chỉnh giao diện Landing page, SEO landing page top GOOGLE.
        </p>
      </div>
    </div>
  </section>
);

export default Overviews;