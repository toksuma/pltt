import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/interfaces";

const AdminInterfaceManager = () => {
  const [interfaces, setInterfaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    url: "",
    category_id: "",
    preview_image_url: "",
  });
  const [editId, setEditId] = useState(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  useEffect(() => {
    fetchInterfaces();
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchImagePreview = async () => {
      if (!form.url) return;
      setIsLoadingPreview(true);
      try {
        const res = await axios.get("https://api.linkpreview.net", {
          params: {
            key: "c7164167f5678b41646b72cdc83f2a84",
            q: form.url,
          },
        });
        const imageUrl = res.data?.image;
        setImagePreview(imageUrl || "");
        setForm((prev) => ({
          ...prev,
          preview_image_url: imageUrl || "",
        }));
      } catch (err) {
        setImagePreview("");
        setForm((prev) => ({ ...prev, preview_image_url: "" }));
      } finally {
        setIsLoadingPreview(false);
      }
    };

    fetchImagePreview();
    // eslint-disable-next-line
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
    if (!form.name || !form.url || !form.category_id || !form.preview_image_url) return;

    if (editId) {
      await axios.put(`${API_URL}/${editId}`, form);
    } else {
      await axios.post(API_URL, form);
    }

    setForm({ name: "", url: "", category_id: "", preview_image_url: "" });
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
      preview_image_url: item.preview_image_url || "",
    });
    setImagePreview(item.preview_image_url || "");
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
    <div className="p-6 flex gap-6 bg-gradient-to-tr from-gray-100 via-blue-50 to-cyan-50 min-h-screen">
      {/* Sidebar Categories */}
      <div className="w-[260px] bg-white rounded-2xl shadow-md p-4 sticky top-20 h-fit border border-gray-100">
        <h2 className="text-lg font-semibold mb-2 text-blue-800">Hạng mục</h2>
        <ul className="space-y-1 text-sm">
          <li
            className={`cursor-pointer px-2 py-1 rounded font-medium ${
              selectedCategoryId === null ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setSelectedCategoryId(null)}
          >
            Tất cả ({interfaces.length})
          </li>
          {categories.map((cat) => (
            <li key={cat.id} className="flex items-center justify-between">
              <span
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`flex-1 px-2 py-1 rounded cursor-pointer transition ${
                  selectedCategoryId === cat.id
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
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
                className="text-xs text-blue-500 px-1"
                title="Sửa tên"
              >
                ✎
              </button>
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-xs text-red-500 ml-1 px-1"
                title="Xoá"
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
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-full py-1 text-sm rounded"
          >
            Thêm hạng mục
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-5 uppercase text-blue-900 tracking-tight">
          MẪU GIAO DIỆN LANDING PAGE
        </h1>
        {/* Form */}
        <form onSubmit={handleFormSubmit} className="bg-white p-5 rounded-2xl shadow-md mb-7 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Tên giao diện</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-2 py-1 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">URL trang</label>
              <input
                type="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full px-2 py-1 border rounded"
                required
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mt-2 h-32 object-cover border rounded shadow"
                  onError={(e) => (e.target.src = "/fallback.jpg")}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Thể loại</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="w-full px-2 py-1 border rounded"
                required
              >
                <option value="">-- Chọn thể loại --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition disabled:opacity-50"
            disabled={!form.preview_image_url || isLoadingPreview}
          >
            {editId ? "Cập nhật" : "Thêm mới"}
          </button>
        </form>
        {/* Grid of interfaces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {interfacesByCategory.map((item) => (
            <div key={item.id} className="border border-gray-100 bg-white rounded-2xl shadow p-3 flex flex-col hover:shadow-lg transition">
              <div className="font-semibold text-base mb-1 text-gray-900">{item.name} <span className="text-xs text-gray-500">#{item.code}</span></div>
              <img
                src={item.preview_image_url}
                alt={item.name}
                className="h-36 object-cover rounded mb-2 border"
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
              <div className="text-sm text-gray-700 mb-1">
                Thể loại: <span className="font-medium text-blue-700">{item.category_name || "Chưa rõ"}</span>
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
                  className="text-yellow-600 hover:underline"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
          {interfacesByCategory.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-10">Không có giao diện nào trong mục này.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminInterfaceManager;