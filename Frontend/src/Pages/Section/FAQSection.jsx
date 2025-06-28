const faqs = [
  {
    question: "Để thiết kế 1 LANDING PAGE cần những gì ?",
    answer:
      "Để thiết kế được 1 trang landing page hoàn thiện và thu hút thì bạn cần cung cấp cho chúng tôi các thông tin chi tiết về nhu cầu thiết kế như: bố cục mong muốn, màu sắc chủ đạo, các tiện ích cần có và nội dung cần hiển thị trên landing page như hình ảnh, văn bản mô tả, các thông tin liên hệ…",
  },
  {
    question: "Thời gian để thiết kế 1 trang LANDING PAGE là bao lâu ?",
    answer:
      "Thời gian để thiết kế hoàn thiện 1 trang landing page từ 1 ngày tới 1 tuần tuỳ thuộc vào yêu cầu thiết kế của bạn và mức độ tương tác làm việc của 2 bên, các tài liệu mà bạn cung cấp để đăng tải lên trang landing page.",
  },
  {
    question: "Chi phí thiết kế trang LANDING PAGE là bao nhiêu ?",
    answer:
      "Để thiết kế hoàn thiện 1 trang bạn cần các chi phí sau: tên miền, hosting tài khoản thiết kế ladipage, phí công thiết kế, Trung bình từ 1,5tr tới 5tr tuỳ theo yêu cầu thiết kế của bạn.",
  },
  {
    question: "Landing page CÓ dùng để chạy quảng cáo được không ?",
    answer:
      "Có landing page hoàn toàn có thể dùng để setup chiến dịch quảng cáo.",
  },
];

import { useState } from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white pt-12 pb-0 px-4 sm:px-10 lg:px-[3cm] w-full">
      <h1 className="text-4xl font-bold text-blue-600 text-center uppercase mb-6">
        NHỮNG CÂU HỎI THƯỜNG GẶP
      </h1>
      <div className="w-full">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md mb-4 shadow-sm bg-gray-50"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-6 py-4 flex items-start gap-3 text-xl font-bold text-gray-800 hover:bg-blue-100 transition"
            >
              <span className="text-black text-4xl leading-6">
                {openIndex === index ? "−" : "+"}
              </span>
              <span>{faq.question}</span>
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 text-gray-700 text-lg pt-2 text-justify">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
