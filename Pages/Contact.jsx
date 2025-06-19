import React from "react";
import { Home, Phone, Mail } from "lucide-react";

const ContactInfo = () => {
  return (
    <section className="bg-white py-10 px-6">
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold pt-3 text-red-600 mb-2">
          THÔNG TIN LIÊN HỆ
        </h1>
        <h2 className="text-4xl font-semibold text-blue-600 pt-5">
          CÔNG TY TNHH TRUYỀN THÔNG TÙNG MEDIA 123
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-20 text-center">
        <div className="w-72 min-h-[280px] flex flex-col items-center">
          <Home size={65} className="text-red-600 mb-4" />
          <h3 className="text-2xl font-semibold text-blue-700 mb-2">
            TRỤ SỞ CÔNG TY
          </h3>
          <p className="text-gray-700 text-lg font-semibold">
            613 Đ. Âu Cơ, Phú Trung, Tân Phú
          </p>
        </div>

        <div className="w-72 min-h-[280px] flex flex-col items-center">
          <Phone size={65} className="text-red-600 mb-4" />
          <h3 className="text-2xl font-semibold mb-2">HOTLINE</h3>
          <p className="text-red-600 text-4xl font-bold">
            0120 123 456
          </p>
        </div>

        <div className="w-72 min-h-[280px] flex flex-col items-center">
          <Mail size={65} className="text-red-600 mb-4" />
          <h3 className="text-2xl font-semibold mb-2">EMAIL HỖ TRỢ</h3>
          <p className="text-gray-700 text-lg font-semibold">
            support@tungmedia.vn
          </p>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-4">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2771.3996962342208!2d106.64019895717955!3d10.7844031593745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1749896666181!5m2!1svi!2s"
          width="100%"
          height="800"
          style={{ border: 0 }}
          allowFullScreen="true"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactInfo;
