import React from 'react';

const Login = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-red-600 mb-8">Đăng ký tư vấn Landing Page</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full p-3 rounded bg-yellow-100 border border-gray-300"
          />
          <input
            type="tel"
            placeholder="Số điện thoại"
            className="w-full p-3 rounded bg-yellow-100 border border-gray-300"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-yellow-100 border border-gray-300"
          />
          <input
            type="text"
            placeholder="Ngành nghề của bạn"
            className="w-full p-3 rounded bg-yellow-100 border border-gray-300"
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            className="w-full p-3 rounded bg-yellow-100 border border-gray-300"
          />
          <input
            type="text"
            placeholder="Mã Landing Page bạn chọn"
            className="w-full p-3 rounded bg-yellow-100 border border-gray-300"
          />
          <textarea
            placeholder="Để lại lời nhắn cho chúng tôi"
            className="w-full p-3 rounded bg-yellow-100 border border-gray-300 h-32 resize-none"
          ></textarea>

          <button
            type="submit"
            className="bg-red-600 text-white text-xl font-bold py-3 w-full rounded mt-4 hover:bg-red-700"
          >
            ĐĂNG KÝ
          </button>
        </form>
      </div>

      {/* Right - Background Image */}
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/800x800/?technology,website')` }}></div>
    </div>
  );
};

export default Login;
