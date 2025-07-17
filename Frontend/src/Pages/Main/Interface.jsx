import React, { useEffect, useState } from "react";
import axios from "axios";

const InterfaceList = () => {
  const [interfaces, setInterfaces] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [interfaceRes, categoryRes] = await Promise.all([
      axios.get("http://localhost:5000/api/interfaces"),
      axios.get("http://localhost:5000/api/interfaces/categories"),
    ]);
    setInterfaces(interfaceRes.data);
    setFiltered(interfaceRes.data);
    setCategories(categoryRes.data);
  };

  useEffect(() => {
    let result = [...interfaces];
    const searchTerm = search.trim().toLowerCase();

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          String(item.id).includes(searchTerm)
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (item) => item.category_id === parseInt(selectedCategory)
      );
    }

    setFiltered(result);
  }, [search, selectedCategory, interfaces]);

  const generateFormattedCode = (item) => {
    if (!item.category_name) return item.code;
    const initials = item.category_name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return `${initials}${String(item.code).padStart(2, "0")}`;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 min-h-screen font-sans">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700 uppercase tracking-wide">
        MẪU GIAO DIỆN LANDING PAGE
      </h1>

      {/* Thanh tìm kiếm và lọc */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Tìm theo ID hoặc tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-full w-full sm:w-1/2 shadow-sm focus:ring-2 focus:ring-blue-400 bg-white transition"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-full w-full sm:w-1/2 shadow-sm focus:ring-2 focus:ring-blue-400 bg-white transition"
        >
          <option value="">Tất cả chủ đề</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.count} mẫu)
            </option>
          ))}
        </select>
      </div>

      {/* Danh sách giao diện */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-2xl shadow hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-2 flex flex-col"
          >
            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={item.preview_image_url || "/fallback.jpg"}
                alt="Preview"
                className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
              <h4 className="font-semibold text-center text-gray-900 text-base truncate">
                {item.name}
              </h4>
              <p className="text-center italic text-purple-600 text-sm mt-1">
                Mã: {generateFormattedCode(item)}
              </p>
              <p className="text-sm text-gray-600 text-center mt-2">
                Chủ đề:{" "}
                <span className="font-medium text-blue-700">
                  {item.category_name || "Không rõ"}
                </span>
              </p>
              <div className="flex justify-center mt-4">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 font-medium shadow transition"
                >
                  Xem chi tiết
                </a>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 col-span-full py-12">
            <p className="text-lg mb-1">Không có giao diện phù hợp.</p>
            <p className="text-sm">
              Thử lại với từ khoá khác hoặc chọn chủ đề khác.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterfaceList;