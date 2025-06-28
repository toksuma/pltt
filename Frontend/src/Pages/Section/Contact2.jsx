const icons = [
  {
    image: "z1.png",
    title: "VĂN PHÒNG CÔNG TY",
    subtitle: "613 ÂU CƠ, PHƯỜNG PHÚ TRUNG, QUẬN TÂN PHÚ",
    bgColor: "bg-red-100",
  },
  {
    image: "z2.png",
    title: "HOT LINE",
    subtitle: "0987 654 321",
    bgColor: "bg-green-100",
  },
  {
    image: "z3.png",
    title: "HỘP THƯ HỖ TRỢ",
    subtitle: "TUNGLANDINGPAGE.COM",
    bgColor: "bg-blue-100",
  },
];

const Contact2 = () => (
  <section className="bg-white py-8 px-4 sm:px-10 lg:px-[3cm] w-full">
    <div className="text-center mb-6">
      <h1 className="text-5xl font-bold text-red-600 mb-2">
        THÔNG TIN LIÊN HỆ
      </h1>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {icons.map((plan, index) => (
        <div
          key={index}
          className={`${plan.bgColor} p-6 rounded-xl shadow-md flex flex-col items-center text-center`}
        >
          <img
            src={plan.image}
            alt={plan.title}
            className="rounded-md mb-4 w-[150px] h-[150px] object-contain"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {plan.title}
          </h1>
          <h2 className="text-lg text-gray-700">{plan.subtitle}</h2>
        </div>
      ))}
    </div>
  </section>
);

export default Contact2;
