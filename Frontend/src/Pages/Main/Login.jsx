import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    occupation: "",
    address: "",
    landing_code: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.placeholder]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contacts", {
        name: formData["Họ và tên"],
        phone: formData["Số điện thoại"],
        email: formData["Email"],
        occupation: formData["Ngành nghề của bạn"],
        address: formData["Địa chỉ"],
        landing_code: formData["Mã Landing Page bạn chọn"],
        message: formData["Để lại lời nhắn cho chúng tôi"]
      });
      alert("✅ Gửi đăng ký tư vấn thành công!");
    } catch (err) {
      console.error("❌ Gửi thất bại:", err);
      alert("❌ Có lỗi xảy ra!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-3xl overflow-hidden bg-white">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">Đăng ký tư vấn Landing Page</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {[
              "Họ và tên", "Số điện thoại", "Email", "Ngành nghề của bạn",
              "Địa chỉ", "Mã Landing Page bạn chọn", "Để lại lời nhắn cho chúng tôi"
            ].map((placeholder, idx) =>
              placeholder === "Để lại lời nhắn cho chúng tôi" ? (
                <textarea
                  key={idx}
                  placeholder={placeholder}
                  value={formData[placeholder] || ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-yellow-100 border border-gray-300 h-32 resize-none"
                />
              ) : (
                <input
                  key={idx}
                  type="text"
                  placeholder={placeholder}
                  value={formData[placeholder] || ""}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-yellow-100 border border-gray-300"
                />
              )
            )}

            <button
              type="submit"
              className="bg-red-600 text-white text-xl font-bold py-3 w-full rounded-full mt-4 transform transition-transform duration-300 hover:scale-105 hover:bg-yellow-500"
            >
              ĐĂNG KÝ
            </button>
          </form>
        </div>

        {/* Right - Background Image */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('./l2.png')`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
