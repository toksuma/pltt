import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [landingStats, setLandingStats] = useState([]);
  const [keywordStats, setKeywordStats] = useState([]);

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contacts");
      const data = res.data;
      setContacts(data);

      const landingMap = {};
      const keywordMap = {};

      data.forEach((item) => {
        const code = item.landing_code || "Không có";
        landingMap[code] = (landingMap[code] || 0) + 1;

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
    <div className="flex min-h-screen bg-gradient-to-tr from-gray-100 via-blue-50 to-cyan-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-extrabold mb-7 text-blue-800 tracking-tight">
          Quản lý Form Liên hệ
        </h1>
        {/* Chart */}
        <section className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">
            Tần suất chọn Landing Page
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={landingStats} barSize={38}>
              <XAxis dataKey="code" stroke="#64748b" tick={{ fontSize: 13 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 13 }} />
              <Tooltip
                contentStyle={{
                  background: "#f1f5f9",
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                  color: "#22223b",
                  fontWeight: 500,
                }}
              />
              <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Keyword Chart */}
        <section className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-lg font-semibold text-cyan-700 mb-3">
            Từ khóa phổ biến trong lời nhắn
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={keywordStats} barSize={38}>
              <XAxis dataKey="keyword" stroke="#64748b" tick={{ fontSize: 13 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 13 }} />
              <Tooltip
                contentStyle={{
                  background: "#f1f5f9",
                  borderRadius: 8,
                  border: "1px solid #cbd5e1",
                  color: "#22223b",
                  fontWeight: 500,
                }}
              />
              <Bar dataKey="count" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Contacts Table */}
        <section className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Danh sách liên hệ
          </h2>
          <div className="overflow-auto rounded-lg border border-gray-100">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-blue-50 text-slate-700 font-bold">
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
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-blue-50 hover:bg-blue-100"}
                  >
                    <td className="p-2 border-b">{item.name}</td>
                    <td className="p-2 border-b">{item.phone}</td>
                    <td className="p-2 border-b">{item.email}</td>
                    <td className="p-2 border-b">{item.occupation}</td>
                    <td className="p-2 border-b">{item.address}</td>
                    <td className="p-2 border-b">{item.landing_code}</td>
                    <td className="p-2 border-b">{item.message}</td>
                  </tr>
                ))}
                {contacts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-gray-400">
                      Không có dữ liệu liên hệ.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminContactManager;