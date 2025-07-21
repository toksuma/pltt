/**
 * Section liệt kê các tính năng sẽ có trên Landing Page.
 * - Thiết kế trẻ trung, màu gradient, hiệu ứng vui mắt.
 * - Số thứ tự nhỏ ở góc.
 * - Thêm hiệu ứng cho chữ tính năng: gradient chữ + scale/shadow khi hover.
 * - Responsive, spacing thoáng, font hiện đại.
 */

const features = [
  "Cài đặt miễn phí SSL cho Website",
  "Thông Báo Giá Khách Hàng",
  "Tích Hợp Các loại Live Chat",
  "Có Sẵn Phiên Bản Mobile",
  "Form thu thập thông tin",
  "Popup đăng ký",
  "Lựa Data Khách Hàng",
  "Tiện ích MAXLEAD Liên Hệ",
  "Vòng Quay May Mắn",
  "Đếm Ngược Thời Gian",
  "Thống Kê Data Về Mail và CRM",
  "Tạo Popup Cảm Ơn",
];

const colorPalettes = [
  "from-pink-400 to-pink-600",
  "from-yellow-400 to-yellow-500",
  "from-blue-400 to-blue-600",
  "from-green-400 to-green-600",
  "from-orange-400 to-orange-500",
  "from-purple-400 to-purple-600",
  "from-cyan-400 to-cyan-600",
  "from-fuchsia-400 to-fuchsia-600",
  "from-teal-400 to-teal-600",
  "from-rose-400 to-rose-600",
  "from-indigo-400 to-indigo-600",
  "from-lime-400 to-lime-500",
];

const FunctionSection = () => (
  <section className="py-20 px-4 bg-gradient-to-tr from-blue-100 via-pink-50 to-cyan-100">
    <h1 className="text-[2.5rem] md:text-[3.5rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-teal-400 mb-16 text-center tracking-tight drop-shadow-lg animate-pulse">
      TÍNH NĂNG LANDING PAGE SIÊU HOT!
    </h1>
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12">
      {features.map((feature, idx) => (
        <div
          key={idx}
          className={`
            relative group rounded-3xl shadow-xl overflow-hidden px-7 py-10 flex flex-col items-center justify-center 
            bg-gradient-to-br ${colorPalettes[idx % colorPalettes.length]}
            hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl
          `}
        >
        <div className="absolute top-4 left-4 text-[1.3rem] md:text-[1.5rem] font-extrabold text-white/50 select-none group-hover:rotate-[7deg] transition duration-300 pointer-events-none">
            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
          </div>
          {/* Tính năng với hiệu ứng chữ: gradient + scale + shadow khi hover */}
          <div className="z-10 text-lg md:text-xl font-semibold text-center tracking-tight">
            <span className={`
              text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-white
              group-hover:from-yellow-300 group-hover:via-white group-hover:to-pink-100
              group-hover:scale-110 group-hover:drop-shadow-[0_2px_12px_rgba(255,255,255,0.5)]
              transition-all duration-300
              inline-block
            `}>
              {feature}
            </span>
          </div>
          {/* Hiệu ứng neon viền */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-white opacity-10 group-hover:opacity-30 transition duration-300"></div>
        </div>
      ))}
    </div>
    {/* Dải gradient dưới chân */}
    <div className="mt-20 h-3 rounded-full w-2/3 mx-auto bg-gradient-to-r from-pink-500 via-teal-400 to-blue-500 blur-xl opacity-70" />
  </section>
);

export default FunctionSection;