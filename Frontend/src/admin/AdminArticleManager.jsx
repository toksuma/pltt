import React, { useEffect, useState } from "react";
import axios from "axios";
axios.get("http://localhost:5000/api/articles")

const AdminArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    image_url: "",
    author: "",
    additional_images: [{ url: "", caption: "" }],
  });
  

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/articles");
      setArticles(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy bài viết:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      return alert("Vui lòng điền tiêu đề và nội dung");
    }

    const payload = {
      ...formData,
      additional_images: JSON.stringify(
        formData.additional_images.filter((img) => img.url)
      ),
    };

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/articles/${editingId}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/articles", payload);
      }

      fetchArticles();
      setShowModal(false);
      setEditMode(false);
      setEditingId(null);
      resetForm();
    } catch (err) {
      console.error("Lỗi khi gửi dữ liệu:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xoá bài viết này?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/articles/${id}`);
      fetchArticles();
    } catch (err) {
      console.error("Lỗi khi xoá:", err);
    }
  };

  const handleEdit = (article) => {
    setEditMode(true);
    setEditingId(article.id);
    setShowModal(true);

    let additionalImages = [{ url: "", caption: "" }];
    try {
      if (article.additional_images) {
        additionalImages = JSON.parse(article.additional_images);
      }
    } catch (err) {
      console.warn("Lỗi parse hình phụ:", err);
    }

    setFormData({
      title: article.title || "",
      content: article.content || "",
      description: article.description || "",
      image_url: article.image_url || "",
      author: article.author || "",
      additional_images: additionalImages,
    });
  };

  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      additional_images: [...prev.additional_images, { url: "", caption: "" }],
    }));
  };

  const handleRemoveImage = (index) => {
    const updated = [...formData.additional_images];
    updated.splice(index, 1);
    setFormData({ ...formData, additional_images: updated });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      description: "",
      image_url: "",
      author: "",
      additional_images: [{ url: "", caption: "" }],
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Quản lý bài viết</h1>

      <button
        onClick={() => {
          setEditMode(false);
          setShowModal(true);
          resetForm();
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Thêm bài viết
      </button>

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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Sửa bài viết" : "Thêm bài viết"}
            </h2>

            {["title", "description", "author", "image_url"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.replace("_", " ")}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                className="border w-full p-2 mb-3"
              />
            ))}

            <textarea
              placeholder="Nội dung"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="border w-full p-2 mb-3 h-32"
            />

            <h3 className="font-semibold mb-2">Bai và mô tả:</h3>
            {formData.additional_images.map((img, index) => (
              <div key={index} className="mb-2 flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Link hình"
                  value={img.url}
                  onChange={(e) => {
                    const updated = [...formData.additional_images];
                    updated[index].url = e.target.value;
                    setFormData({ ...formData, additional_images: updated });
                  }}
                  className="border w-1/2 p-1"
                />
                <input
                  type="text"
                  placeholder="Mô tả"
                  value={img.caption}
                  onChange={(e) => {
                    const updated = [...formData.additional_images];
                    updated[index].caption = e.target.value;
                    setFormData({ ...formData, additional_images: updated });
                  }}
                  className="border w-1/2 p-1"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 text-xs ml-1"
                >
                  Xoá
                </button>
              </div>
            ))}

            <button
              onClick={handleAddImage}
              className="bg-gray-300 text-black text-sm px-3 py-1 rounded mb-3"
            >
              + Thêm hình phụ
            </button>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editMode ? "Cập nhật" : "Thêm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticleManager;
