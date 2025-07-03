import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/interfaces";

const AdminInterfaceManager = () => {
  const [interfaces, setInterfaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", url: "", category_id: "" });
  const [editId, setEditId] = useState(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchInterfaces();
    fetchCategories();
  }, []);

  // Khi nhập URL, tự gọi backend để lấy preview image
  useEffect(() => {
    const fetchImagePreview = async () => {
      if (!form.url) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/preview-image?url=${encodeURIComponent(form.url)}`
        );
        const imageUrl = res.data?.image;
        setImagePreview(imageUrl || "");
      } catch (err) {
        console.error("Không lấy được ảnh preview:", err);
        setImagePreview("");
      }
    };

    fetchImagePreview();
  }, [form.url]);

  const fetchInterfaces = async () => {
    const res = await axios.get(API_URL);
    setInterfaces(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${API_URL}/categories`);
    setCategories(res.data);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.url || !form.category_id) return;

    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
    } else {
      await axios.post(API_URL, form);
    }

    setForm({ name: "", url: "", category_id: "" });
    setEditId(null);
    setImagePreview("");
    fetchInterfaces();
    fetchCategories();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      url: item.url,
      category_id: item.category_id,
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá giao diện này?")) {
      await axios.delete(`${API_URL}/${id}`);
      fetchInterfaces();
      fetchCategories();
    }
  };

  const handleAddCategory = async () => {
    if (!categoryInput) return;
    await axios.post(`${API_URL}/categories`, { name: categoryInput });
    setCategoryInput("");
    fetchCategories();
  };

  const handleEditCategory = async (id, name) => {
    await axios.put(`${API_URL}/categories/${id}`, { name });
    setEditingCategoryId(null);
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Xoá thể loại này?")) {
      await axios.delete(`${API_URL}/categories/${id}`);
      fetchCategories();
      if (selectedCategoryId === id) {
        setSelectedCategoryId(null);
      }
    }
  };

  const interfacesByCategory = selectedCategoryId
    ? interfaces.filter((item) => item.category_id === selectedCategoryId)
    : interfaces;

  return (
    <div className="p-4 flex gap-4 bg-gray-50 min-h-screen">
      {/* Bảng thể loại bên trái */}
      <div className="w-[250px] bg-white rounded shadow p-4 sticky top-20 h-fit">
        <h2 className="text-lg font-semibold mb-2">Hạng mục</h2>
        <ul className="space-y-1 text-sm">
          <li
            className={`cursor-pointer px-2 py-1 rounded ${
              selectedCategoryId === null ? "bg-blue-100 font-medium" : ""
            }`}
            onClick={() => setSelectedCategoryId(null)}
          >
            Tất cả ({interfaces.length})
          </li>
          {categories.map((cat) => (
            <li key={cat.id} className="flex items-center justify-between">
              <span
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`flex-1 px-2 py-1 rounded cursor-pointer ${
                  selectedCategoryId === cat.id
                    ? "bg-blue-100 font-medium"
                    : ""
                }`}
              >
                {editingCategoryId === cat.id ? (
                  <input
                    value={cat.name}
                    onChange={(e) =>
                      setCategories((prev) =>
                        prev.map((c) =>
                          c.id === cat.id ? { ...c, name: e.target.value } : c
                        )
                      )
                    }
                    onBlur={() => handleEditCategory(cat.id, cat.name)}
                    className="border rounded px-1"
                    autoFocus
                  />
                ) : (
                  `${cat.name} (${cat.count})`
                )}
              </span>
              <button
                onClick={() => setEditingCategoryId(cat.id)}
                className="text-xs text-blue-500"
              >
                ✎
              </button>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-xs text-red-500 ml-1"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <input
            type="text"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="Thêm hạng mục"
            className="w-full px-2 py-1 border rounded text-sm"
          />
          <button
            onClick={handleAddCategory}
            className="mt-2 bg-blue-500 text-white w-full py-1 text-sm rounded"
          >
            Thêm hạng mục
          </button>
        </div>
      </div>

      {/* Nội dung bên phải */}
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-4 uppercase">
          MẪU GIAO DIỆN LANDING PAGE
        </h1>

        {/* Form nhập */}
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-4 rounded shadow mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Tên giao diện</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full px-2 py-1 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">URL trang</label>
              <input
                type="url"
                value={form.url}
                onChange={(e) => {
                  const url = e.target.value;
                  setForm({ ...form, url });
                }}
                className="w-full px-2 py-1 border rounded"
                required
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mt-2 h-32 object-cover border rounded"
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Thể loại</label>
              <select
                value={form.category_id}
                onChange={(e) =>
                  setForm({ ...form, category_id: e.target.value })
                }
                className="w-full px-2 py-1 border rounded"
                required
              >
                <option value="">-- Chọn thể loại --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editId ? "Cập nhật" : "Thêm mới"}
          </button>
        </form>

        {/* Danh sách giao diện */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {interfacesByCategory.map((item) => (
            <div
              key={item.id}
              className="border bg-white rounded shadow p-2 flex flex-col"
            >
              <div className="font-semibold text-sm mb-1">
                {item.name} (#{item.code})
              </div>
              <img
                src={`http://localhost:5000/api/preview-image?url=${encodeURIComponent(item.url)}`}
                alt={item.name}
                className="h-36 object-cover rounded mb-2 border"
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
              <div className="text-sm text-gray-600 mb-1">
                Thể loại: {item.category_name || "Chưa rõ"}
              </div>
              <div className="flex gap-2 mt-auto text-sm">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-blue-600 hover:underline"
                >
                  Xem chi tiết
                </a>
                <button
                  onClick={() => handleEdit(item)}
                  className="text-yellow-600"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminInterfaceManager;
