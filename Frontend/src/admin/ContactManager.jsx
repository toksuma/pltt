import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [landingStats, setLandingStats] = useState([]);
  const [keywordStats, setKeywordStats] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contacts");
      const data = res.data;
      setContacts(data);

      // Tính toán tần suất chọn mã landing page
      const landingMap = {};
      const keywordMap = {};

      data.forEach((item) => {
        // Mã landing page
        const code = item.landing_code || "Không có";
        landingMap[code] = (landingMap[code] || 0) + 1;

        // Phân tích keyword từ lời nhắn
        const message = item.message?.toLowerCase() || "";
        const keywords = message.match(/\b\w+\b/g) || [];
        keywords.forEach((kw) => {
          if (kw.length >= 4) {
            keywordMap[kw] = (keywordMap[kw] || 0) + 1;
          }
        });
      });

      const landingData = Object.entries(landingMap).map(([code, count]) => ({
        code,
        count,
      }));

      const keywordData = Object.entries(keywordMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([keyword, count]) => ({ keyword, count }));

      setLandingStats(landingData);
      setKeywordStats(keywordData);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu liên hệ:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">📥 Quản lý Form Liên hệ</h1>

        {/* Biểu đồ landing page */}
        <section className="bg-white p-4 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Tần suất chọn Landing Page</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={landingStats}>
              <XAxis dataKey="code" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Biểu đồ keyword */}
        <section className="bg-white p-4 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold text-green-600 mb-2">Từ khóa phổ biến trong lời nhắn</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={keywordStats}>
              <XAxis dataKey="keyword" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Bảng dữ liệu */}
        <section className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">📋 Danh sách liên hệ</h2>
          <div className="overflow-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2">Họ và tên</th>
                  <th className="p-2">SĐT</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Ngành nghề</th>
                  <th className="p-2">Địa chỉ</th>
                  <th className="p-2">Mã LP</th>
                  <th className="p-2">Lời nhắn</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((item, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.phone}</td>
                    <td className="p-2">{item.email}</td>
                    <td className="p-2">{item.occupation}</td>
                    <td className="p-2">{item.address}</td>
                    <td className="p-2">{item.landing_code}</td>
                    <td className="p-2">{item.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminContactManager;
