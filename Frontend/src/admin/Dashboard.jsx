import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Thêm import Link
import Sidebar from "./Sidebar";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_articles: 0,
    total_contacts: 0,
  });

  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchLogs();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error("❌ Lỗi lấy thống kê:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard/recent");
      setRecentLogs(res.data);
    } catch (error) {
      console.error("❌ Lỗi lấy logs hoạt động:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          👋 Chào mừng đến với trang Quản trị Website
        </h1>

        {/* Thống kê */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              📄 Tổng số bài viết
            </h2>
            <p className="text-3xl font-bold text-blue-600">{stats.total_articles}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              🧑‍💼 Tài khoản nhân viên
            </h2>
            <p className="text-3xl font-bold text-green-600">—</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              💬 Liên hệ mới
            </h2>
            <p className="text-3xl font-bold text-red-500">{stats.total_contacts}</p>
          </div>
        </section>

        {/* Hoạt động gần đây */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📊 Hoạt động gần đây
          </h2>
          <ul className="space-y-2">
  {recentLogs.map((log) => (
    <li
      key={log.id}
      className="bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
    >
      [{log.created_at}] <strong>{log.user}</strong> đã{" "}
      <em>{log.action_type}</em>{" "}
      {log.target === "articles" && log.target_id ? (
        <Link
          to={`/articles/${log.target_id}`}
          className="text-blue-600 hover:underline font-semibold"
        >
          {log.title}
        </Link>
      ) : (
        <span className="font-semibold text-gray-700">{log.title}</span>
      )}{" "}
      ({log.target})
    </li>
  ))}
</ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
