import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setArticle(data);
        setNotFound(false);
      })
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl text-red-600 font-semibold">Không tìm thấy bài viết</h2>
        <Link to="/news" className="text-blue-600 underline mt-4 block">← Quay về tin tức</Link>
      </div>
    );
  }

  if (!article) return <div className="p-8 text-center">Đang tải dữ liệu...</div>;

  let additionalImages = [];
  try {
    if (article.additional_images) {
      additionalImages = JSON.parse(article.additional_images);
    }
  } catch {}

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/news" className="text-blue-600 underline block mb-4">← Quay lại</Link>

      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold text-blue-800 mb-2">{article.title}</h1>

      <p className="text-sm text-gray-500 mb-2">Tác giả: {article.author}</p>
      <p className="text-sm text-gray-500 mb-4">
        Ngày đăng: {new Date(article.created_at).toLocaleDateString()}
      </p>

      <p className="text-lg text-gray-800 mb-4">{article.description}</p>

      <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
        {article.content}
      </div>

      {additionalImages.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Hình ảnh liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {additionalImages.map((img, idx) => (
              <div key={idx} className="border rounded p-2">
                <img src={img.url} alt={img.caption} className="w-full h-48 object-cover rounded mb-2" />
                <p className="text-sm text-gray-600">{img.caption}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;
