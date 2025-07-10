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

const Jobs = () => (
    <section className="py-12 px-4 bg-white text-center">
        <h1 className="text-3xl font-bold text-black">
            DỊCH VỤ LANDING PAGE THEO NGÀNH
        </h1>
        <div className="flex justify-center mt-4 mb-6">
            <svg /* Đường gợn sóng */ 
                width="640"
                height="20"
                viewBox="0 0 640 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 10 Q 20 0, 40 10 T 80 10 T 120 10 T 160 10 T 200 10 T 240 10 T 280 10 T 320 10 T 360 10 T 400 10 T 440 10 T 480 10 T 520 10 T 560 10 T 600 10 T 640 10"
                    stroke="red"
                    strokeWidth="2"
                    fill="none"
                />
            </svg>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto mt-6">
            {industries.map((item, index) => (
                <div
                    key={item.name}
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
                    <button className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition hover:scale-105">
                        Xem chi tiết
                    </button>
                </div>
            ))}
        </div>
    </section>
);

export default Jobs;