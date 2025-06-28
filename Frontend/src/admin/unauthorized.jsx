import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0E0D6] p-4 font-sans">
      <div className="bg-[#FFFFEE] border border-[#D9BFB7] max-w-xl w-full p-6 text-sm shadow-md text-center">
        {/* Ảnh minh hoạ */}
        <img
          src="/404.gif" 
          alt="Access Denied"
          className="w-44 mx-auto mb-6 rounded border border-[#D9BFB7]"
        />

        <h1 className="text-xl font-bold text-[#34345C] mb-4">404 - Không có quyền truy cập</h1>

        <blockquote className="border-l-4 border-[#789922] pl-4 text-[#789922] italic mb-4 text-left">
          Truy cập bị từ chối. Tài khoản của bạn không đủ quyền để vào trang này.
        </blockquote>

        <p className="text-[#222] mb-6 text-left">
          Nếu bạn nghĩ đây là một sự nhầm lẫn, hãy liên hệ quản trị viên hoặc quay lại trang chủ để tiếp tục duyệt nội dung khác.
        </p>

        <Link
          to="/"
          className="inline-block bg-[#D9BFB7] hover:bg-[#c9a8a0] text-black px-4 py-2 rounded border border-[#34345C]"
        >
          ← Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
