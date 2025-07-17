import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total_articles: 0,
    total_contacts: 0,
    total_users: 0,
  });
  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchLogs();
    // eslint-disable-next-line
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");
      setStats(res.data);
    } catch (error) {
      // Silently fail
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard/recent");
      setRecentLogs(res.data);
    } catch (error) {
      // Silently fail
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-gray-100 via-blue-50 to-cyan-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-8 tracking-tight">
          Chào mừng đến với trang Quản trị Website
        </h1>
        {/* Thống kê */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center border border-gray-100">
            <h2 className="text-sm font-medium text-slate-500 mb-1">
              Tổng số bài viết
            </h2>
            <p className="text-4xl font-extrabold text-blue-700">{stats.total_articles}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center border border-gray-100">
            <h2 className="text-sm font-medium text-slate-500 mb-1">
              Tài khoản nhân viên
            </h2>
            <p className="text-4xl font-extrabold text-green-600">{stats.total_users}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center border border-gray-100">
            <h2 className="text-sm font-medium text-slate-500 mb-1">
              Liên hệ mới
            </h2>
            <p className="text-4xl font-extrabold text-red-500">{stats.total_contacts}</p>
          </div>
        </section>
        {/* Hoạt động gần đây */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Hoạt động gần đây
          </h2>
          <ul className="space-y-2">
            {recentLogs.length === 0 && (
              <li className="text-gray-400 italic text-sm">Chưa có hoạt động nào gần đây.</li>
            )}
            {recentLogs.map((log, idx) => (
              <li
                key={log.id}
                className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-sm ${
                  idx % 2 === 1 ? "bg-blue-50" : ""
                } hover:bg-blue-100 transition`}
              >
                <span className="text-gray-500 mr-2">
                  [{log.created_at ? new Date(log.created_at).toLocaleString("vi-VN") : ""}]
                </span>
                <strong className="text-blue-700">{log.user}</strong> đã{" "}
                <span className="font-medium text-slate-700">{log.action_type}</span>{" "}
                {log.target === "articles" && log.target_id ? (
                  <Link
                    to={`/articles/${log.target_id}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {log.title}
                  </Link>
                ) : (
                  <span className="font-semibold text-slate-900">{log.title}</span>
                )}{" "}
                <span className="text-xs text-gray-400">({log.target})</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;