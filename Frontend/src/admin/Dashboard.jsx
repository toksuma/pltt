import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    articles: 0,
    contacts: 0,
    admins: 0,
  });

  const [recent, setRecent] = useState([
    // Dữ liệu tạm nếu muốn hiển thị hoạt động gần đây thật thì có thể mở rộng sau
    { id: 1, text: '✅ Bài viết "Tác hại của ô nhiễm" được thêm bởi Admin lúc 10:32' },
    { id: 2, text: '✏️ Nhân viên `staff01` chỉnh sửa bài "Giải pháp năng lượng" lúc 09:15' },
    { id: 3, text: '📥 Nhận được liên hệ mới từ khách hàng lúc 08:47' },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Lỗi lấy thống kê dashboard:", err);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          👋 Chào mừng đến với trang Quản trị Website
        </h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              📄 Tổng số bài viết
            </h2>
            <p className="text-3xl font-bold text-blue-600">{stats.articles}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              🧑‍💼 Tài khoản nhân viên
            </h2>
            <p className="text-3xl font-bold text-green-600">{stats.admins}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              💬 Liên hệ mới
            </h2>
            <p className="text-3xl font-bold text-red-500">{stats.contacts}</p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📊 Hoạt động gần đây
          </h2>
          <ul className="space-y-2">
            {recent.map((item) => (
              <li
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
              >
                {item.text}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
