import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

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
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

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

        {/* Đường gợn sóng đỏ */}
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

        {/* Lưới ngành */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto mt-6">
          {industries.map((item, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center p-4 bg-white shadow-md rounded-xl hover:shadow-lg transition duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h2 className="text-xl font-semibold text-red-600 mb-3">
                {item.name}
              </h2>
              <img
                src={item.image}
                alt={item.name}
                className="w-[260px] h-[170px] object-cover rounded-xl mb-4 transition-transform duration-300 hover:scale-105"
              />
              <button className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition">
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </section>

{/* SECTION: LỢI ÍCH CỦA LANDING PAGE */}
<section className="py-12 px-4 bg-white text-center">
  <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-10">
    LỢI ÍCH KHI SỬ DỤNG LANDING PAGE CỦA CCO MEDIA
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
    {[
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
      ].map((item, index) => (
      <div key={index} className="text-center">
        <img
          src={item.image}
          alt={item.title}
          className="w-[200px] h-[150px] object-contain mb-4 mx-auto"
        />
        <h1 className="text-xl font-bold text-red-600 uppercase mb-2">
          {item.title}
        </h1>
        <p className="text-base text-gray-700 text-justify max-w-[90%] mx-auto">
          {item.desc}
        </p>
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
