import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Landingpage from "../Section/Landingpage";
import Jobs from "../Section/Jobs";
import Benefits from "../Section/Benefits";
import Function from "../Section/Function";
import Overviews from "../Section/overviews";
import Services from "./Services";
import FAQSection from "../Section/FAQSection";
import Brands from "../Section/Brands";
import Software from "../Section/Software";
import Contact2 from "../Section/Contact2";

const Home = () => {
  // hiệu ứng Hiện thị 
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="w-full bg-white">
      <Landingpage />
      <div data-aos="fade-up"><Jobs /></div>
      <div data-aos="fade-up"><Benefits /></div>
      <div data-aos="fade-up"><Function /></div>
      <div data-aos="fade-up"><Overviews /></div>
      <div data-aos="fade-up"><Services /></div>
      <div data-aos="fade-up"><FAQSection /></div>
      <div data-aos="fade-up"><Brands /></div>
      <div data-aos="fade-up"><Software /></div>
      <div data-aos="fade-up"><Contact2 /></div>
    </div>
  );
};

export default Home;
