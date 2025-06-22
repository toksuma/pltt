import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Services from "./Services";
import FAQSection from "../Section/FAQSection";
import ClientLogos from "../Section/ClientLogos";
import Software from "../Section/Software";
import Jobs from "../Section/Jobs";
import Benefits from "../Section/Benefits";
import Landingpage from "../Section/Landingpage";
import Overviews from "../Section/overviews";
import Function from "../Section/Function";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="w-full bg-white">
      <Landingpage />
      <Jobs />
      <Benefits />
      <Function />
      <Overviews />
      <Services />
      <FAQSection />
      <ClientLogos />
      <Software />
    </div>
  );
};

export default Home;
