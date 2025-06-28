import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const AdminBannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    active: false,
  });

  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/banners");
      setBanners(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Lỗi khi lấy banner:", err);
      setBanners([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/banners", form);
    setForm({ title: "", description: "", image_url: "", active: false });
    fetchBanners();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn xoá banner này không?")) {
      await axios.delete(`http://localhost:5000/api/banners/${id}`);
      fetchBanners();
    }
  };

  const handleActivate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/banners/${id}/activate`);
      fetchBanners();
    } catch (err) {
      console.error("Lỗi khi kích hoạt banner:", err);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Quản lý Banner</h1>
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Tiêu đề"
            className="w-full border px-3 py-2 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Mô tả"
            className="w-full border px-3 py-2 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL ảnh"
            className="w-full border px-3 py-2 rounded"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            required
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            <span>Đặt là banner đang hoạt động</span>
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Thêm Banner
          </button>
        </form>
        <h2 className="text-xl font-semibold mb-4">Danh sách Banner</h2>
        <div className="space-y-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-lg">{banner.title}</p>
                <p className="text-sm text-gray-600">{banner.description}</p>
                <img
                  src={banner.image_url}
                  alt="banner"
                  className="w-40 mt-2 rounded shadow"
                />
                <p className="text-sm mt-1">
                  Trạng thái:{" "}
                  <span className={banner.active ? "text-green-600" : "text-gray-500"}>
                    {banner.active ? "Đang hoạt động" : "Đã tắt"}
                  </span>
                </p>
              </div>
              <div className="flex gap-3">
                {!banner.active && (
                  <button
                    onClick={() => handleActivate(banner.id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Kích hoạt
                  </button>
                )}
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="text-red-600 hover:text-red-800"
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

export default AdminBannerManager;
