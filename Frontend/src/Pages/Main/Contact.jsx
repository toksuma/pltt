import { Home, Phone, Mail } from "lucide-react";

const contactDetails = [
  {
    icon: <Home size={65} className="text-red-600 mb-4" />,
    title: "TRỤ SỞ CÔNG TY",
    content: "613 Đ. Âu Cơ, Phú Trung, Tân Phú",
    contentClass: "text-gray-700 text-lg font-semibold",
    titleClass: "text-2xl font-semibold text-blue-700 mb-2",
  },
  {
    icon: <Phone size={65} className="text-red-600 mb-4" />,
    title: "HOTLINE",
    content: "0120 123 456",
    contentClass: "text-red-600 text-4xl font-bold",
    titleClass: "text-2xl font-semibold mb-2",
  },
  {
    icon: <Mail size={65} className="text-red-600 mb-4" />,
    title: "EMAIL HỖ TRỢ",
    content: "support@tungmedia.vn",
    contentClass: "text-gray-700 text-lg font-semibold",
    titleClass: "text-2xl font-semibold mb-2",
  },
];

const ContactInfo = () => (
  <section className="bg-white py-10 px-6">
    <div className="text-center mb-8">
      <h1 className="text-6xl font-bold pt-3 text-red-600 mb-2">
        THÔNG TIN LIÊN HỆ
      </h1>
      <h2 className="text-4xl font-semibold text-blue-600 pt-5">
        CÔNG TY TNHH TRUYỀN THÔNG TÙNG MEDIA
      </h2>
    </div>

    <div className="flex flex-wrap justify-center gap-20 text-center">
      {contactDetails.map(({ icon, title, content, contentClass, titleClass }, idx) => (
        <div key={title} className="w-72 min-h-[280px] flex flex-col items-center">
          {icon}
          <h3 className={titleClass}>{title}</h3>
          <p className={contentClass}>{content}</p>
        </div>
      ))}
    </div>

    <div className="mt-4">
      <iframe
        title="Google Map"
        src="https://www.google.com/maps?q=613+Âu+Cơ,+TP.HCM&output=embed"
        width="100%"
        height="800"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </section>
);

export default ContactInfo;