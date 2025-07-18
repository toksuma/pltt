import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      console.log("API login trả về:", res.data);

      const { token, role, username } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      console.log("Sau khi lưu localStorage:");
      console.log("token:", localStorage.getItem("token"));
      console.log("role:", localStorage.getItem("role"));
      console.log("username:", localStorage.getItem("username"));

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "staff") {
        navigate("/admin/articles");
      } else {
        setError("Tài khoản không hợp lệ.");
      }
    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu");
      console.log("Lỗi login:", err?.response?.data || err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-cyan-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-700 tracking-tight">
          Đăng nhập Admin
        </h2>
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-center font-semibold">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Tài khoản</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-400 transition"
              required
              autoFocus
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-400 transition"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-full font-bold shadow hover:bg-blue-700 transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;