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

  // Hàm tạo mã code dạng BDS01 từ category_name
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800 uppercase">
        MẪU GIAO DIỆN LANDING PAGE
      </h1>

      {/* Thanh tìm kiếm và dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Tìm theo ID hoặc tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full sm:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full sm:w-1/2"
        >
          <option value="">Tất cả chủ đề</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.count} mục)
            </option>
          ))}
        </select>
      </div>

      {/* Giao diện hiển thị */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <h4 className="font-bold text-lg text-center truncate text-gray-800">
              {item.name}
            </h4>
            <p className="italic text-sm text-center text-indigo-600 mb-2">
              Mã: {generateFormattedCode(item)}
            </p>
            <img
              src={item.preview_image_url || "/fallback.jpg"}
              alt="Preview"
              className="w-full h-40 object-cover rounded mb-2 border"
              onError={(e) => (e.target.src = "/fallback.jpg")}
            />
            <p className="text-sm text-gray-700 mb-4 text-center">
              Chủ đề: {item.category_name || "Không rõ"}
            </p>
            <div className="flex justify-center">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Xem chi tiết
              </a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            Không có giao diện phù hợp.
          </p>
        )}
      </div>
    </div>
  );
};

export default InterfaceList;
