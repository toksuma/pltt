const services = [
  { image: "x1.webp", label: "Email Marketing" },
  { image: "x2.png", label: "CRM Tự động" },
  { image: "x3.png", label: "Hệ thống ERP" },
  { image: "x4.png", label: "Chatbot AI" },
];

const Software = () => (
  <section className="bg-white py-12 px-4 sm:px-10 lg:px-[3cm] w-full">
    <h1 className="text-4xl font-bold text-blue-600 text-center uppercase mb-10">
      DỊCH VỤ PHẦN MỀM ĐANG CUNG CẤP
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {services.map((service, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <img
            src={service.image}
            alt={service.label}
            className="w-36 h-36 object-contain mb-4"
          />
          <button
            className="bg-cyan-600 text-white px-6 py-2 rounded-full text-lg font-semibold transition hover:bg-yellow-400 hover:text-cyan-700 hover:scale-105"
          >
            {service.label}
          </button>
        </div>
      ))}
    </div>
  </section>
);

export default Software;
