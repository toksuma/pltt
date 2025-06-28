import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/articles";

const AdminArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    image_url: "",
    contentBlocks: [""],
    interleavedImages: [{ url: "", caption: "" }],
    additional_images: [{ url: "", caption: "" }],
  });

  const fetchArticles = async () => {
    try {
      const res = await axios.get(API_URL);
      setArticles(res.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async () => {
    const mergedContent = formData.contentBlocks
      .map((block, i) => {
        const img = formData.interleavedImages[i];
        let html = `${block}`; // KHÔNG thêm <div> hay <br>
        if (img?.url) {
          html += `
            <div style="text-align:center;">
              <img src="${img.url}" alt="" style="max-width:100%; height:auto;" />
              <p style="font-style: italic; font-size: 14px; color: #666;">${img.caption}</p>
            </div>`;
        }
        return html;
      })
      .join(""); // nối liền, không <br>

    const payload = {
      ...formData,
      content: mergedContent,
      additional_images: JSON.stringify(
        formData.additional_images.filter((img) => img.url)
      ),
    };

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }

      setShowPopup(false);
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        author: "",
        image_url: "",
        contentBlocks: [""],
        interleavedImages: [{ url: "", caption: "" }],
        additional_images: [{ url: "", caption: "" }],
      });
      fetchArticles();
    } catch (err) {
      console.error("Lỗi khi gửi bài viết:", err);
    }
  };

  const handleEdit = (article) => {
    const { blocks, images } = splitContentToBlocks(article.content || "");
    setFormData({
      title: article.title || "",
      description: article.description || "",
      author: article.author || "",
      image_url: article.image_url || "",
      contentBlocks: blocks,
      interleavedImages: images,
      additional_images: article.additional_images
        ? JSON.parse(article.additional_images)
        : [{ url: "", caption: "" }],
    });
    setEditingId(article.id);
    setShowPopup(true);
  };

  const splitContentToBlocks = (htmlContent) => {
    const parts = htmlContent.split(/<div style="text-align:center;">/i);
    const blocks = [];
    const images = [];

    parts.forEach((part, index) => {
      const div = document.createElement("div");
      div.innerHTML = index === 0 ? part : "<div style=\"text-align:center;\">" + part;
      const img = div.querySelector("img");
      const caption = div.querySelector("p");

      if (img) {
        images.push({
          url: img.getAttribute("src"),
          caption: caption ? caption.innerText : "",
        });
        img.remove();
        if (caption) caption.remove();
      } else {
        images.push({ url: "", caption: "" });
      }

      blocks.push(div.innerHTML.trim());
    });

    return { blocks, images };
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xoá bài viết này?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchArticles();
    } catch (err) {
      console.error("Lỗi xoá bài:", err);
    }
  };

  const handleAddBlock = () => {
    setFormData((prev) => ({
      ...prev,
      contentBlocks: [...prev.contentBlocks, ""],
      interleavedImages: [...prev.interleavedImages, { url: "", caption: "" }],
    }));
  };

  const handleRemoveBlock = (index) => {
    const newBlocks = [...formData.contentBlocks];
    const newImages = [...formData.interleavedImages];
    newBlocks.splice(index, 1);
    newImages.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      contentBlocks: newBlocks,
      interleavedImages: newImages,
    }));
  };

  const handleBlockChange = (index, html) => {
    const updated = [...formData.contentBlocks];
    updated[index] = html;
    setFormData((prev) => ({ ...prev, contentBlocks: updated }));
  };

  const handleImageInputChange = (index, key, value) => {
    const updated = [...formData.interleavedImages];
    if (!updated[index]) updated[index] = { url: "", caption: "" };
    updated[index][key] = value;
    setFormData((prev) => ({ ...prev, interleavedImages: updated }));
  };

  const handleAddFooterInfo = () => {
    const footerHTML = `Website: https://dichvulandingpage.com<br>Email: dichvuweblandingpage@gmail.com<br>Điện thoại: 0902.813.410`;
    setFormData((prev) => ({
      ...prev,
      contentBlocks: [...prev.contentBlocks, footerHTML],
      interleavedImages: [...prev.interleavedImages, { url: "", caption: "" }],
    }));
  };

  const handleAddRelatedImage = () => {
    setFormData((prev) => ({
      ...prev,
      additional_images: [...prev.additional_images, { url: "", caption: "" }],
    }));
  };

  const handleRemoveRelatedImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index),
    }));
  };

  const handleRelatedImageChange = (index, key, value) => {
    const updated = [...formData.additional_images];
    updated[index][key] = value;
    setFormData((prev) => ({ ...prev, additional_images: updated }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Quản lý bài viết</h1>
      <button
        onClick={() => {
          setEditingId(null);
          setShowPopup(true);
        }}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        + Thêm bài viết
      </button>

      {/* Bảng danh sách bài viết */}
      <table className="min-w-full bg-white shadow border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tiêu đề</th>
            <th className="border p-2">Tác giả</th>
            <th className="border p-2">Ngày đăng</th>
            <th className="border p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} className="hover:bg-gray-50">
              <td className="border p-2">{a.id}</td>
              <td className="border p-2">{a.title}</td>
              <td className="border p-2">{a.author}</td>
              <td className="border p-2">{new Date(a.created_at).toLocaleDateString()}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(a)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup thêm/sửa bài viết */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Thêm/Sửa bài viết</h2>

            <input className="border w-full p-2 mb-2" placeholder="Tiêu đề" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} />
            <input className="border w-full p-2 mb-2" placeholder="Mô tả" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} />
            <input className="border w-full p-2 mb-2" placeholder="Tác giả" value={formData.author} onChange={(e) => handleInputChange("author", e.target.value)} />
            <input className="border w-full p-2 mb-2" placeholder="Ảnh chính (URL)" value={formData.image_url} onChange={(e) => handleInputChange("image_url", e.target.value)} />

            {formData.contentBlocks.map((block, index) => (
              <div key={index} className="mb-4">
                <div
                  contentEditable
                  className="border p-2 min-h-[100px] bg-white rounded outline-none"
                  dangerouslySetInnerHTML={{ __html: block }}
                  onInput={(e) => handleBlockChange(index, e.currentTarget.innerHTML)}
                />
                <div className="flex gap-2 mt-2 mb-2">
                  <input className="border p-1 w-1/2" placeholder="Link hình ảnh" value={formData.interleavedImages[index]?.url || ""} onChange={(e) => handleImageInputChange(index, "url", e.target.value)} />
                  <input className="border p-1 w-1/2" placeholder="Mô tả" value={formData.interleavedImages[index]?.caption || ""} onChange={(e) => handleImageInputChange(index, "caption", e.target.value)} />
                </div>
                <button onClick={() => handleRemoveBlock(index)} className="text-red-500 text-sm">Xoá đoạn</button>
              </div>
            ))}

            <div className="flex gap-2 mb-4">
              <button onClick={handleAddBlock} className="bg-gray-300 px-3 py-1 rounded">+ Thêm đoạn nội dung</button>
              <button onClick={handleAddFooterInfo} className="bg-purple-500 text-white px-3 py-1 rounded">+ Thêm thông tin footer</button>
            </div>

            <h3 className="font-semibold mb-2">Hình phụ:</h3>
            {formData.additional_images.map((img, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input className="border p-1 w-1/2" placeholder="Link hình" value={img.url} onChange={(e) => handleRelatedImageChange(index, "url", e.target.value)} />
                <input className="border p-1 w-1/2" placeholder="Mô tả" value={img.caption} onChange={(e) => handleRelatedImageChange(index, "caption", e.target.value)} />
                <button onClick={() => handleRemoveRelatedImage(index)} className="text-red-500 text-xs">Xoá</button>
              </div>
            ))}
            <button onClick={handleAddRelatedImage} className="bg-gray-300 text-sm px-3 py-1 rounded mb-4">+ Thêm hình phụ</button>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPopup(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Huỷ</button>
              <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Lưu bài viết</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticleManager;
