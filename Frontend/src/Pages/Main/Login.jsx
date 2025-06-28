import { useState } from 'react';
import axios from 'axios';
// Phần Đăng ký Thông tin 
const fields = [
  { key: "name", placeholder: "Họ và tên" },
  { key: "phone", placeholder: "Số điện thoại" },
  { key: "email", placeholder: "Email" },
  { key: "occupation", placeholder: "Ngành nghề của bạn" },
  { key: "address", placeholder: "Địa chỉ" },
  { key: "landing_code", placeholder: "Mã Landing Page bạn chọn" },
  { key: "message", placeholder: "Để lại lời nhắn cho chúng tôi", textarea: true }
];

const initialForm = fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {});

const Login = () => {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contacts", formData);
      alert("Gửi đăng ký tư vấn thành công!");
      setFormData(initialForm);
    } catch (err) {
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-3xl overflow-hidden bg-white">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
            Đăng ký tư vấn Landing Page
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {fields.map(({ key, placeholder, textarea }) =>
              textarea ? (
                <textarea
                  key={key}
                  placeholder={placeholder}
                  value={formData[key]}
                  onChange={e => handleChange(e, key)}
                  className="w-full p-3 rounded-lg bg-yellow-100 border border-gray-300 h-32 resize-none"
                />
              ) : (
                <input
                  key={key}
                  type="text"
                  placeholder={placeholder}
                  value={formData[key]}
                  onChange={e => handleChange(e, key)}
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
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('./l2.png')` }}
        />
      </div>
    </div>
  );
};

export default Login;
