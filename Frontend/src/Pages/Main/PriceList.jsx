import { Check } from "lucide-react";

const plans = [
  {
    price: "1,500",
    title: "Gói Cơ bản",
    description:
      "Landing page theo thiết kế riêng, tối ưu tốc độ, có tích hợp biểu mẫu, live chat và báo cáo",
    features: [
      "Web Chuẩn SEO",
      "Tương Thích Mobile",
      "SEO Từ Khóa",
      "Tốc Độ Load Nhanh",
      "Giao Diện Theo Mẫu",
      "Tặng chứng chỉ số SSL",
      "Tặng Hosting 1 Năm",
    ],
    bgColor: "bg-red-100",
    titleColor: "text-red-600",
    iconHoverColor: "group-hover:text-red-500",
    textHoverColor: "group-hover:text-gray-900",
  },
  {
    price: "3,000",
    title: "Gói Nâng cao",
    description:
      "Landing page theo thiết kế riêng, tối ưu tốc độ, có tích hợp biểu mẫu, live chat và báo cáo",
    features: [
      "Thiết Kế Riêng Theo Yêu Cầu",
      "Chuẩn UI/UX",
      "Biểu Mẫu Liên Hệ",
      "Tối Ưu Mobile & Desktop",
      "Live Chat, Zalo, Messenger",
      "SSL & Hosting 1 Năm",
      "Báo Cáo Hiệu Suất",
    ],
    bgColor: "bg-blue-100",
    titleColor: "text-blue-600",
    iconHoverColor: "group-hover:text-blue-500",
    textHoverColor: "group-hover:text-gray-900",
  },
  {
    price: "5,000",
    title: "Gói Doanh nghiệp",
    description:
      "Landing page theo thiết kế riêng, tối ưu tốc độ, có tích hợp biểu mẫu, live chat và báo cáo",
    features: [
      "Thiết Kế Theo Thương Hiệu",
      "Đa Ngôn Ngữ",
      "Tích Hợp CRM, Chatbot",
      "Bảo Trì & Hỗ Trợ 12 Tháng",
      "Bảo Mật Cao",
      "Hosting VIP 1 Năm",
      "Báo Cáo Chuyên Sâu",
    ],
    bgColor: "bg-green-100",
    titleColor: "text-green-600",
    iconHoverColor: "group-hover:text-green-500",
    textHoverColor: "group-hover:text-gray-900",
  },
];

function PlanCard({ plan }) {
  return (
    <div
      className={`${plan.bgColor} p-8 rounded-2xl shadow-xl text-center w-full max-w-md transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <h2 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        {plan.price}K
      </h2>
      <h3 className={`text-2xl font-bold mb-4 uppercase tracking-tight ${plan.titleColor}`}>
        {plan.title}
      </h3>
      <hr className="border-gray-300 mb-4" />
      <p className="text-base mb-6 text-gray-700">{plan.description}</p>
      <ul className="text-left space-y-3 mb-6">
        {plan.features.map((feature, i) => (
          <li
            key={i}
            className="group flex items-center transition-colors cursor-pointer"
          >
            <Check
              className={`w-5 h-5 mr-2 text-gray-500 transition-colors duration-200 ${plan.iconHoverColor}`}
            />
            <span
              className={`text-gray-700 transition-colors duration-200 ${plan.textHoverColor}`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <button className="bg-gradient-to-r from-[#fa4d3e] to-[#fd9374] text-white px-8 py-2 rounded-full font-semibold shadow hover:from-[#e62d2d] hover:to-[#f67070] transition-all duration-300 transform hover:scale-105">
        Đăng ký ngay
      </button>
    </div>
  );
}

export default function PriceList() {
  return (
    <section className="bg-gradient-to-br from-white via-pink-50 to-blue-50 py-16 px-4 sm:px-10 lg:px-32">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent mb-4 bg-clip-text bg-gradient-to-r from-[#fa4d3e] via-[#fd9374] to-[#fd71b3] tracking-tight drop-shadow-lg uppercase">
          BẢNG GIÁ DỊCH VỤ LANDING PAGE
        </h1>
        <h2 className="text-xl font-medium text-gray-700">
          Chính sách bảng giá dịch vụ LANDING PAGE tại{" "}
          <span className="text-blue-600 font-bold">TÙNG MEDIA!</span>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-12">
        {plans.map((plan, idx) => (
          <PlanCard key={idx} plan={plan} />
        ))}
      </div>
      <div className="mt-14 text-gray-700 leading-relaxed max-w-4xl mx-auto text-justify bg-white/70 rounded-xl p-8 shadow">
        <p className="mb-4">
          Chính sách <strong>BẢNG GIÁ DỊCH VỤ LANDING PAGE</strong> được{" "}
          <strong>CCO MEDIA</strong> đưa ra với nhiều mức gói khác nhau giúp
          khách hàng có nhiều sự lựa chọn cho phù hợp với yêu cầu{" "}
          <strong>THIẾT KẾ LANDING PAGE GIÁ RẺ</strong>. Với mức giá cạnh tranh
          nhất trên thị trường cộng với những điểm mạnh vượt trội khi triển khai{" "}
          <strong>DỊCH VỤ LANDING PAGE</strong> và với các gói COMBO tặng kèm
          miễn phí khi khách hàng đặt dịch vụ thiết kế landing page{" "}
          <strong>ĐẢM BẢO</strong> khách hàng sẽ nhận được{" "}
          <strong>NHIỀU HƠN</strong> những gì mà khách hàng phải trả.
        </p>
        <p>
          Trải qua nhiều năm trong nghề thiết kế LANDING PAGE cho các khách
          hàng và các thương hiệu thì chúng tôi nhận thấy chính sách bảng giá
          dịch vụ landing page cũng chính là yếu tố mà rất nhiều khách hàng cân
          nhắc trước khi chọn ký hợp đồng dịch vụ. Hiểu được vấn đề đó nên{" "}
          <strong>CCO MEDIA</strong> đã đưa ra mức giá rất thấp để hỗ trợ khách
          hàng giúp ai cũng có thể đăng ký thực hiện 1 trang web landing page
          dành riêng cho mình để giới thiệu các sản phẩm dịch vụ cho hiệu quả
          cao nhất.
        </p>
      </div>
    </section>
  );
}