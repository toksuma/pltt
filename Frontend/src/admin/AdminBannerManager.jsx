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
    overlay_text: "LANDING PAGE TRỌN GÓI",
    overlay_color: "#FF0000",
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
    setForm({
      title: "",
      description: "",
      image_url: "",
      active: false,
      overlay_text: "LANDING PAGE TRỌN GÓI",
      overlay_color: "#FF0000",
    });
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

  const getCountdown = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(start.getTime() + 12 * 3600 * 1000);
    const diff = Math.max(0, (end - now) / 1000);
    const h = String(Math.floor(diff / 3600)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
    const s = String(Math.floor(diff % 60)).padStart(2, "0");
    return { h, m, s };
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Quản lý Banner</h1>

        {/* FORM THÊM BANNER */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Tiêu đề"
            className="border border-gray-300 px-3 py-2 rounded w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Mô tả"
            className="border border-gray-300 px-3 py-2 rounded w-full"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="URL ảnh"
            className="border border-gray-300 px-3 py-2 rounded w-full"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Chữ trên ảnh (overlay)"
            className="border border-gray-300 px-3 py-2 rounded w-full"
            value={form.overlay_text}
            onChange={(e) => setForm({ ...form, overlay_text: e.target.value })}
          />
          <input
            type="text"
            placeholder="Màu chữ overlay (#hex)"
            className="border border-gray-300 px-3 py-2 rounded w-full"
            value={form.overlay_color}
            onChange={(e) => setForm({ ...form, overlay_color: e.target.value })}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            <span>Đặt là banner đang hoạt động</span>
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Thêm Banner
          </button>
        </form>

        {/* DANH SÁCH BANNER */}
        <h2 className="text-xl font-semibold mb-4">Danh sách Banner</h2>
        <div className="space-y-6">
          {banners.map((b) => {
            const { h, m, s } = b.active
              ? getCountdown(b.updated_at || b.created_at)
              : { h: "00", m: "00", s: "00" };

            return (
              <div
                key={b.id}
                className="flex flex-col lg:flex-row border rounded shadow overflow-hidden"
              >
                {/* Bên trái: hình và overlay */}
                <div className="w-full lg:w-1/2 relative h-64">
                  <img
                    src={b.image_url}
                    alt="banner"
                    className="w-full h-full object-cover z-0"
                  />
                  {b.overlay_text && (
                    <div
                      className="absolute top-4 left-4 text-2xl font-bold drop-shadow z-10"
                      style={{ color: b.overlay_color || "#FFFFFF" }}
                    >
                      {b.overlay_text}
                    </div>
                  )}
                </div>

                {/* Bên phải: nội dung */}
                <div className="w-full lg:w-1/2 p-4 flex flex-col justify-between">
                  <div>
                    <p className="text-xl font-bold text-red-600">
                      {b.title || "Tiêu đề mặc định"}
                    </p>
                    <p className="text-gray-600 mb-2">
                      {b.description || "Mô tả..."}
                    </p>
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      className="border px-3 py-2 rounded w-full mb-2"
                    />
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold w-full">
                      ĐĂNG KÝ NGAY
                    </button>
                  </div>

                  {b.active && (
                    <div className="text-center mt-4">
                      <p className="font-bold text-sm">
                        THỜI GIAN KHUYẾN MÃI CÒN
                      </p>
                      <div className="flex justify-center mt-1 text-white font-bold text-sm">
                        <div className="bg-blue-600 px-2 py-1 mx-1 rounded">
                          {h}
                          <br />
                          <span className="text-xs font-normal">Giờ</span>
                        </div>
                        <div className="bg-blue-600 px-2 py-1 mx-1 rounded">
                          {m}
                          <br />
                          <span className="text-xs font-normal">Phút</span>
                        </div>
                        <div className="bg-blue-600 px-2 py-1 mx-1 rounded">
                          {s}
                          <br />
                          <span className="text-xs font-normal">Giây</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-4 mt-4">
                    {!b.active && (
                      <button
                        onClick={() => handleActivate(b.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Kích hoạt
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Xoá
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminBannerManager;
