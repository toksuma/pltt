import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const logos = [
  "l1.jpg",
  "l2.jpg",
  "l3.jpg",
  "l4.jpg",
  "l5.jpg",
  "l6.jpg",
  "l7.jpg",
  "l8.jpg",
  "l9.jpg",
  "l10.jpg",
];

const ClientLogos = () => {
  return (
    <section className="bg-white pt-6 pb-12 px-4 sm:px-10 lg:px-[3cm] w-full">
      <h1 className="text-4xl font-bold text-cyan-600 text-center uppercase mb-10">
        KHÁCH HÀNG CỦA CHÚNG TÔI
      </h1>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={6}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        grabCursor={true}
        className="cursor-grab"
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <img
                src={logo}
                alt={`logo-${index}`}
                className="h-16 object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ClientLogos;
