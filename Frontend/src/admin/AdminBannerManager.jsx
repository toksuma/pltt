import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const AdminBannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [editingBannerId, setEditingBannerId] = useState(null);
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
      setBanners([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingBannerId) {
      await axios.put(`http://localhost:5000/api/banners/${editingBannerId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/banners", form);
    }
    setForm({
      title: "",
      description: "",
      image_url: "",
      active: false,
      overlay_text: "LANDING PAGE TRỌN GÓI",
      overlay_color: "#FF0000",
    });
    setEditingBannerId(null);
    fetchBanners();
  };

  const handleEdit = (banner) => {
    setForm({
      title: banner.title || "",
      description: banner.description || "",
      image_url: banner.image_url || "",
      active: banner.active || false,
      overlay_text: banner.overlay_text || "LANDING PAGE TRỌN GÓI",
      overlay_color: banner.overlay_color || "#FF0000",
    });
    setEditingBannerId(banner.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    } catch {}
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
    <div className="flex min-h-screen bg-gradient-to-tr from-gray-100 via-blue-50 to-cyan-50">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-extrabold mb-5 text-blue-800 tracking-tight">
          {editingBannerId ? "Chỉnh sửa Banner" : "Thêm Banner"}
        </h1>
        {/* FORM THÊM/SỬA BANNER */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Tiêu đề</label>
              <input
                type="text"
                placeholder="Tiêu đề"
                className="border border-gray-300 px-3 py-2 rounded w-full"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Mô tả</label>
              <input
                type="text"
                placeholder="Mô tả"
                className="border border-gray-300 px-3 py-2 rounded w-full"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">URL ảnh</label>
              <input
                type="text"
                placeholder="URL ảnh"
                className="border border-gray-300 px-3 py-2 rounded w-full"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Chữ overlay</label>
              <input
                type="text"
                placeholder="Chữ overlay"
                className="border border-gray-300 px-3 py-2 rounded w-full"
                value={form.overlay_text}
                onChange={(e) => setForm({ ...form, overlay_text: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Màu overlay (#hex)</label>
              <input
                type="text"
                placeholder="#FF0000"
                className="border border-gray-300 px-3 py-2 rounded w-full"
                value={form.overlay_color}
                onChange={(e) =>
                  setForm({ ...form, overlay_color: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              <span className="text-gray-700 text-sm">Đặt là banner đang hoạt động</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingBannerId ? "Cập nhật" : "Thêm Banner"}
            </button>
            {editingBannerId && (
              <button
                type="button"
                onClick={() => {
                  setForm({
                    title: "",
                    description: "",
                    image_url: "",
                    active: false,
                    overlay_text: "LANDING PAGE TRỌN GÓI",
                    overlay_color: "#FF0000",
                  });
                  setEditingBannerId(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Hủy
              </button>
            )}
          </div>
        </form>
        {/* DANH SÁCH BANNER */}
        <h2 className="text-xl font-bold mb-4 text-slate-700">Danh sách Banner</h2>
        <div className="space-y-6">
          {banners.map((b) => {
            const { h, m, s } = b.active
              ? getCountdown(b.updated_at || b.created_at)
              : { h: "00", m: "00", s: "00" };
            return (
              <div
                key={b.id}
                className="flex flex-col lg:flex-row border border-gray-100 rounded-2xl shadow hover:shadow-lg bg-white overflow-hidden"
              >
                {/* Hình ảnh và overlay */}
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
                {/* Nội dung */}
                <div className="w-full lg:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xl font-bold text-blue-900 mb-1">
                      {b.title || "Tiêu đề mặc định"}
                    </p>
                    <p className="text-gray-700 mb-2">
                      {b.description || "Mô tả..."}
                    </p>
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      className="border px-3 py-2 rounded w-full mb-2"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold w-full">
                      ĐĂNG KÝ NGAY
                    </button>
                  </div>
                  {b.active && (
                    <div className="text-center mt-4">
                      <p className="font-bold text-sm text-slate-700">
                        THỜI GIAN KHUYẾN MÃI CÒN
                      </p>
                      <div className="flex justify-center mt-1 text-white font-bold text-sm">
                        <div className="bg-blue-700 px-2 py-1 mx-1 rounded">
                          {h}
                          <br />
                          <span className="text-xs font-normal text-white">Giờ</span>
                        </div>
                        <div className="bg-blue-700 px-2 py-1 mx-1 rounded">
                          {m}
                          <br />
                          <span className="text-xs font-normal text-white">Phút</span>
                        </div>
                        <div className="bg-blue-700 px-2 py-1 mx-1 rounded">
                          {s}
                          <br />
                          <span className="text-xs font-normal text-white">Giây</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap justify-end space-x-4 mt-4 text-sm">
                    <button
                      onClick={() => setPreviewBanner(b)}
                      className="text-blue-600 hover:underline"
                    >
                      Xem thử
                    </button>
                    <button
                      onClick={() => handleEdit(b)}
                      className="text-yellow-600 hover:underline"
                    >
                      Sửa
                    </button>
                    {!b.active && (
                      <button
                        onClick={() => handleActivate(b.id)}
                        className="text-green-600 hover:underline"
                      >
                        Kích hoạt
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xoá
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {banners.length === 0 && (
            <div className="text-center text-gray-400 py-10">Không có banner nào.</div>
          )}
        </div>
        {/* POPUP TEST BANNER */}
        {previewBanner && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-4xl w-full rounded-2xl shadow overflow-hidden relative">
              <div className="flex flex-col lg:flex-row">
                {/* Hình ảnh */}
                <div className="w-full lg:w-1/2 relative h-80">
                  <img
                    src={previewBanner.image_url}
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                  {previewBanner.overlay_text && (
                    <div
                      className="absolute top-4 left-4 text-2xl font-bold drop-shadow"
                      style={{
                        color: previewBanner.overlay_color || "#FFFFFF",
                      }}
                    >
                      {previewBanner.overlay_text}
                    </div>
                  )}
                </div>
                {/* Nội dung */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <p className="text-xl font-bold text-blue-900 mb-1">
                      {previewBanner.title}
                    </p>
                    <p className="text-gray-700 mb-2">
                      {previewBanner.description}
                    </p>
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      className="border px-3 py-2 rounded w-full mb-2"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold w-full">
                      ĐĂNG KÝ NGAY
                    </button>
                  </div>
                  {previewBanner.active && (
                    <div className="text-center mt-4">
                      <p className="font-bold text-sm text-slate-700">THỜI GIAN KHUYẾN MÃI CÒN</p>
                      <div className="flex justify-center mt-1 text-white font-bold text-sm">
                        {(() => {
                          const { h, m, s } = getCountdown(
                            previewBanner.updated_at || previewBanner.created_at
                          );
                          return (
                            <>
                              <div className="bg-blue-700 px-2 py-1 mx-1 rounded">
                                {h}
                                <br />
                                <span className="text-xs font-normal text-white">Giờ</span>
                              </div>
                              <div className="bg-blue-700 px-2 py-1 mx-1 rounded">
                                {m}
                                <br />
                                <span className="text-xs font-normal text-white">Phút</span>
                              </div>
                              <div className="bg-blue-700 px-2 py-1 mx-1 rounded">
                                {s}
                                <br />
                                <span className="text-xs font-normal text-white">Giây</span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setPreviewBanner(null)}
                className="absolute top-2 right-2 bg-white border px-3 py-1 rounded hover:bg-gray-200"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBannerManager;