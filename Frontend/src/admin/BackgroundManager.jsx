import { useEffect, useState } from "react";

// Giả lập API lấy danh sách background
const fetchBackgrounds = async () => [
  { id: 1, url: "/uploads/bg1.jpg", active: true },
  { id: 2, url: "/uploads/bg2.jpg", active: false },
];

// Giả lập upload từ máy
const uploadBackground = async (file) => {
  return { id: Date.now(), url: URL.createObjectURL(file), active: false };
};

// Giả lập thêm link từ mạng
const addBackgroundFromUrl = async (url) => {
  return { id: Date.now(), url, active: false };
};

const deleteBackground = async (id) => true;
const setActiveBackground = async (id) => true;

const BackgroundManager = () => {
  const [backgrounds, setBackgrounds] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchBackgrounds();
      setBackgrounds(data);
    };
    load();
  }, []);

  // Upload ảnh từ máy
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const newBg = await uploadBackground(file);
    setBackgrounds((prev) => [...prev, newBg]);
    setUploading(false);
  };

  // Thêm ảnh từ url
  const handleAddUrl = async (e) => {
    e.preventDefault();
    if (!urlInput) return;
    const newBg = await addBackgroundFromUrl(urlInput);
    setBackgrounds((prev) => [...prev, newBg]);
    setUrlInput("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xóa ảnh này?")) {
      await deleteBackground(id);
      setBackgrounds((prev) => prev.filter((bg) => bg.id !== id));
    }
  };

  const handleSetActive = async (id) => {
    await setActiveBackground(id);
    setBackgrounds((prev) =>
      prev.map((bg) => ({ ...bg, active: bg.id === id }))
    );
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Quản lý ảnh nền Landing Page</h2>
      {/* Upload từ máy */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Thêm ảnh nền từ máy:</label>
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={handleUpload}
          className="p-2 border rounded"
        />
      </div>
      {/* Thêm ảnh từ url mạng */}
      <form className="mb-6" onSubmit={handleAddUrl}>
        <label className="block mb-2 font-medium">Thêm ảnh nền bằng đường dẫn URL:</label>
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Dán link hình ảnh (https://...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="p-2 border rounded flex-1"
            required
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600"
          >
            Thêm
          </button>
        </div>
      </form>
      {/* Hiển thị danh sách background */}
      <div className="grid grid-cols-2 gap-4">
        {backgrounds.map((bg) => (
          <div
            key={bg.id}
            className={`relative border rounded-lg overflow-hidden shadow ${
              bg.active ? "border-4 border-yellow-500" : ""
            }`}
          >
            <img src={bg.url} alt="" className="w-full h-32 object-cover" />
            <div className="absolute top-2 right-2 flex gap-2">
              {!bg.active && (
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                  onClick={() => handleSetActive(bg.id)}
                >
                  Chọn làm nền
                </button>
              )}
              <button
                className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                onClick={() => handleDelete(bg.id)}
              >
                Xóa
              </button>
            </div>
            {bg.active && (
              <span className="absolute bottom-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                Đang sử dụng
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundManager;