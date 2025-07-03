// src/pages/InterfaceList.jsx
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

    if (search.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((item) => item.category_id === parseInt(selectedCategory));
    }

    setFiltered(result);
  }, [search, selectedCategory, interfaces]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">
        MẪU GIAO DIỆN LANDING PAGE:
      </h1>

      {/* Thanh tìm kiếm và dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="">Tất cả hạng mục</option>
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
          <div key={item.id} className="bg-white border shadow rounded p-4">
            <h4 className="font-bold text-lg mb-1">{item.name}</h4>
            <p className="text-sm text-gray-600 mb-1">Mã: {item.code}</p>
            <img
              src={`https://api.thumbnail.ws/api/ab123456789/thumbnail/get?url=${encodeURIComponent(
                item.url
              )}&width=480`}
              alt="Preview"
              className="w-full h-40 object-cover rounded mb-2"
            />
            <p className="text-sm text-gray-700 mb-2">
              Thể loại: {item.category_name || "Không rõ"}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded"
            >
              Xem chi tiết
            </a>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500 col-span-full">Không có giao diện phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default InterfaceList;
