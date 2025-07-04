import React, { useEffect, useState } from "react";
import axios from "axios";
import { removeVietnameseTones } from "../../utils/removeVietnameseTones";

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
    const searchTerm = removeVietnameseTones(search.trim().toLowerCase());

    if (searchTerm) {
      result = result.filter(
        (item) =>
          removeVietnameseTones(item.name.toLowerCase()).includes(searchTerm) ||
          removeVietnameseTones(String(item.code).toLowerCase()).includes(searchTerm)
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
    const initials = removeVietnameseTones(item.category_name)
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    return `${initials}${String(item.code).padStart(2, "0")}`;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-blue-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700 uppercase tracking-wide">
        MẪU GIAO DIỆN LANDING PAGE
      </h1>

      {/* Tìm kiếm + danh mục */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Tìm theo ID hoặc tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow w-full sm:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow w-full sm:w-1/2"
        >
          <option value="">Tất cả chủ đề</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} ({cat.count} mục)
            </option>
          ))}
        </select>
      </div>

      {/* Giao diện */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 group"
          >
            <div className="relative">
              <img
                src={item.preview_image_url || "/fallback.jpg"}
                alt={item.name}
                className="w-full h-52 object-cover transition duration-300 group-hover:brightness-105"
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
                {item.name}
              </h3>
              <p className="text-indigo-700 italic text-base mb-2">
                Mã: {generateFormattedCode(item)}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Chủ đề: {item.category_name || "Không rõ"}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-blue-600 text-white text-sm px-5 py-2 rounded-full hover:bg-blue-700 transition font-medium"
              >
                Xem chi tiết
              </a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 col-span-full text-center text-lg">
            Không có giao diện phù hợp.
          </p>
        )}
      </div>
    </div>
  );
};

export default InterfaceList;
