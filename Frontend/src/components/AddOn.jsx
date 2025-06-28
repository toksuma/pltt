import { FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-20 left-4 z-[999999] flex flex-col gap-3">
          <a
        href="https://zalo.me/0902813410"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center bg-blue-500 bg-opacity-50 hover:bg-opacity-80 text-white font-semibold px-4 py-2 rounded-full shadow-md transition"
      >
               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
          <SiZalo className="text-blue-500 text-lg" />
        </div>
        <span>ZALO</span>
      </a>

            <a
        href="tel:0902813410"
        className="flex items-center bg-red-500 bg-opacity-50 hover:bg-opacity-80 text-white font-semibold px-4 py-2 rounded-full shadow-md transition"
      >
               <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-2">
          <FaPhoneAlt className="text-white text-sm" />
        </div>
        <span>0902 813 410</span>
      </a>
    </div>
  );
};

export default FloatingButtons;