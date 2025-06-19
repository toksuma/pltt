import React from "react";

const pricingPlans = [
  {
    image: "1.png",
    title: "THIẾT KẾ LANDING PAGE",
    subtitle: "Chuyên thiết kế các mẫu giao diện Landing Page mọi lĩnh vực",
    bgColor: "bg-red-100",
  },
  {
    image: "2.png",
    title: "TỐI ƯU LANDING PAGE",
    subtitle: "Chỉnh sửa và tối ưu Landing Page giúp web load nhanh và chuẩn SEO",
    bgColor: "bg-green-100",
  },
  {
    image: "3.png",
    title: "QUẢN LÝ TRANG WEB",
    subtitle: "Giải pháp quản trị web giúp bạn tiết kiệm thời gian và nhân sự",
    bgColor: "bg-blue-100",
  },
  {
    image: "4.png",
    title: "QUẢNG CÁO ONLINE",
    subtitle: "Cung cấp trọn gói các dịch vụ quảng cáo giúp bạn gia tăng Doanh Số",
    bgColor: "bg-yellow-100",
  },
];

const Services = () => {
  return (
    <section className="bg-white py-10 px-[3cm]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600 mb-2">
          DỊCH VỤ ĐANG CUNG CẤP
        </h1>
        <h2 className="text-xl ">
         Chúng tôi luôn sẵn sàng cung cấp cho bạn những giải pháp dịch vụ web landing page tối ưu nhất để giúp bạn tối ưu chi phí quảng cáo, gia tăng khách hàng và tăng tỷ lệ chốt đơn cao nhất 
        </h2>
      </div>

      <div className="flex justify-between gap-[1cm]">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`${plan.bgColor} flex-shrink-0 p-4 rounded-xl shadow-md flex flex-col justify-between`}
            style={{ width: "calc((100% - 3cm) / 4)" }}
          >
            <div>
              <img
                src={plan.image}
                alt={plan.title}
                className="rounded-md mb-4 w-full h-36 object-contain"
              />
              <h1 className="text-xl font-bold text-center text-gray-800 mb-1">
                {plan.title}
              </h1>
              <h2 className="text-center text-gray-600">{plan.subtitle}</h2>
            </div>
            <div className="text-center mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

         </section>
  );
};

export default Services;
