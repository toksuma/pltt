const benefitsData = [
  {
    image: "/tm.png",
    title: "THIẾT KẾ NHANH CHÓNG",
    desc: "Thời gian hoàn thành thiết kế Landing Page từ 1-3 ngày và có thể nhanh hơn tuỳ thuộc vào yêu cầu và thông tin khách hàng cung cấp."
  },
  {
    image: "/tm2.png",
    title: "LANDING PAGE THU HÚT",
    desc: "Landing page thiết kế với nội dung hấp dẫn và thu hút giúp nâng cao TỶ LỆ CHUYỂN ĐỔI thông qua các biểu mẫu đăng ký có trên website."
  },
  {
    image: "/tm3.png",
    title: "TỐI ƯU VỀ CHI PHÍ",
    desc: "CCO MEDIA sẽ thiết kế cho bạn 1 landing page với mức CHI PHÍ CẠNH TRANH và ngân sách quảng cáo cũng giảm nhờ landing page được tối ưu SEO."
  },
  {
    image: "/tm4.png",
    title: "DỄ DÀNG ĐO LƯỜNG HIỆU QUA LANDING PAGE",
    desc: "Bạn rất dễ dàng đọc các chỉ số trong báo cáo hiệu quả của trang web thông qua các công cụ quản lý và các công cụ tích hợp của bên thứ 3 nhu Google Analytics."
  },
  {
    image: "/tm5.png",
    title: "THIẾT KẾ GIAO DIỆN CHUYÊN NGHIỆP",
    desc: "Tất cả các landing page được thiết kế với giao diện HẤP DẪN khách hàng giúp mang lại trải nghiệm tuyệt vời nhất cho khách hàng của ban."
  },
  {
    image: "/tm6.png",
    title: "SỬ DỤNG NỀN TẢNG SERVER TỐC ĐỘ CAO",
    desc: "Nền tảng SERVER tốc độ cao giúp người dùng truy cập nhanh chóng và giúp tăng trải nghiệm cho khách hàng khi xem trên cả máy tính và di động."
  }
];

const Benefits = () => (
  <section className="py-12 px-4 bg-white text-center">
    <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-10">
      LỢI ÍCH KHI SỬ DỤNG LANDING PAGE CỦA CCO MEDIA
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
      {benefitsData.map(({ image, title, desc }, idx) => (
        <div key={idx} className="text-center">
          <img
            src={image}
            alt={title}
            className="w-[200px] h-[150px] object-contain mb-4 mx-auto"
          />
          <h2 className="text-xl font-bold text-red-600 uppercase mb-2">
            {title}
          </h2>
          <p className="text-base text-gray-700 text-justify max-w-[90%] mx-auto">
            {desc}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default Benefits;
