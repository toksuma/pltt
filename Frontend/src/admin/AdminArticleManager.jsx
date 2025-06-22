import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  // Lấy danh sách bài viết
  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài viết:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Thêm bài viết
  const handleAddArticle = async () => {
    if (!newArticle.title || !newArticle.content)
      return alert("Vui lòng điền đủ thông tin");

    try {
      await axios.post("http://localhost:5000/api/articles", newArticle);
      setShowAddModal(false);
      setNewArticle({ title: "", content: "" });
      fetchArticles();
    } catch (error) {
      console.error("Lỗi khi thêm bài viết:", error);
    }
  };

  // Xóa bài viết
  const handleDelete = async (id) => {
    console.log("ID cần xóa:", id); // debug
    if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
      try {
        await axios.delete(`http://localhost:5000/api/articles/${id}`);
        fetchArticles();
      } catch (error) {
        console.error("Lỗi khi xóa bài viết:", error);
      }
    }
  };

  // Mở modal sửa
  const handleEdit = (article) => {
    console.log("Đang sửa bài viết:", article); // debug
    setEditMode(true);
    setEditingArticle(article);
    setNewArticle({ title: article.title, content: article.content });
    setShowAddModal(true);
  };

  // Cập nhật bài viết
  const handleUpdateArticle = async () => {
    console.log("ID cập nhật:", editingArticle?.id); // debug
    try {
      await axios.put(
        `http://localhost:5000/api/articles/${editingArticle.id}`,
        newArticle
      );
      setEditMode(false);
      setEditingArticle(null);
      setNewArticle({ title: "", content: "" });
      setShowAddModal(false);
      fetchArticles();
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Quản lý bài viết</h1>

      <button
        onClick={() => {
          setEditMode(false);
          setNewArticle({ title: "", content: "" });
          setShowAddModal(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Thêm bài viết
      </button>

      <table className="min-w-full bg-white shadow border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Tiêu đề</th>
            <th className="p-3 border">Nội dung</th>
            <th className="p-3 border">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="hover:bg-gray-50">
              <td className="p-3 border">{article.id}</td>
              <td className="p-3 border">{article.title}</td>
              <td className="p-3 border">{article.content}</td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() => handleEdit(article)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal thêm/sửa */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              {editMode ? "Sửa bài viết" : "Thêm bài viết"}
            </h2>
            <input
              type="text"
              placeholder="Tiêu đề"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
              className="border w-full p-2 mb-4"
            />
            <textarea
              placeholder="Nội dung"
              value={newArticle.content}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value })
              }
              className="border w-full p-2 mb-4 h-32"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Hủy
              </button>
              <button
                onClick={editMode ? handleUpdateArticle : handleAddArticle}
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
