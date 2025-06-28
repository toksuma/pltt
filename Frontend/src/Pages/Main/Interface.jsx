const templates = Array.from({ length: 20 }, (_, i) => ({
  label: `GIAO DIỆN ${i + 1}`,
  code: `MÃ LDP${String(i + 1).padStart(2, "0")}`,
  link: `https://bds.dichvulandingpage.com/bds${20 + i}`,
}));

const TemplatePage = () => (
  <section className="bg-white py-12 px-4 sm:px-10 lg:px-[3cm] w-full">
    <h1 className="text-4xl font-bold text-blue-600 text-center uppercase mb-10">
      MẪU GIAO DIỆN LANDING PAGE
    </h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-12">
      {templates.map(({ label, code, link }) => (
        <div key={code} className="flex flex-col items-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-2xl font-semibold w-full hover:bg-yellow-600 transition">
              {label}
            </button>
          </a>
          <p className="text-gray-700 mt-2 text-xl font-bold text-center">
            {code}
          </p>
        </div>
      ))}
    </div>
    <div className="flex justify-center mb-10">
      <a
        href="https://docs.google.com/spreadsheets/d/1YPEwZ4CnLVJkRPSG1-f1mwiysZf54VfQnP6B7ED0VME/edit?pli=1&gid=0#gid=0"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg font-bold shadow-md transition">
          XEM THÊM ĐẦY ĐỦ GIAO DIỆN
        </button>
      </a>
    </div>
    <h2 className="text-justify text-lg text-gray-800 leading-relaxed">
      <strong className="text-red-600">DICHVULANDINGPAGE.COM</strong> là nơi chuyên thiết kế ra những
      <strong className="text-pink-500"> MẪU GIAO DIỆN LANDING PAGE</strong> đẹp và chuyên nghiệp phù hợp cho nhiều ngành nghề.
      <strong> ƯU ĐIỂM</strong> của landing page được thiết kế bởi Cao MEDIA là giao diện đẹp và bắt mắt, tối ưu hoá khả năng chuyển đổi, có tốc độ load trang nhanh, độ
      <strong className="text-blue-600"> CHUẨN SEO</strong> lên tới 100% giúp gia tăng thứ hạng tìm kiểm trên GOOGLE làm gia tăng lượng truy cập vào trang LANDING PAGE.
      <br />
      Với đội ngũ nhân sự giàu kinh nghiệm đã trải qua nhiều dự án và với kho giao diện LANDING PAGE mẫu đa dạng, chúng tôi công ty
      <strong> CCO MEDIA</strong> tự tin sẽ mang tới cho quý <strong>KHÁCH HÀNG</strong> 1 trang web landing page ƯNG Ý nhất góp phần giúp bạn phát triển công việc
      <strong> KINH DOANH ONLINE</strong> tốt nhất. Nếu bạn cần triển khai thiết kế landing page hãy liên hệ ngay với chúng tôi để được đội ngũ chuyên gia hỗ trợ
      <strong className="text-red-600"> TƯ VẤN MIỄN PHÍ</strong> hoàn toàn bạn nhé.
    </h2>
  </section>
);

export default TemplatePage;