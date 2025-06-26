import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [recentArticles, setRecentArticles] = useState([]);

  // Lấy chi tiết bài viết
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

  // Lấy bài viết mới nhất
  useEffect(() => {
    fetch(`http://localhost:5000/api/articles`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((a) => a.id.toString() !== id)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);
        setRecentArticles(filtered);
      })
      .catch((err) => console.error("Lỗi lấy bài mới:", err));
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
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-10">
      {/* Nội dung bài viết - bên trái */}
      <div className="lg:w-2/3">
        <Link to="/news" className="text-blue-600 underline block mb-4">← Quay lại</Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">{article.title}</h1>
        <div className="text-sm text-gray-500 mb-4">
          Tác giả: <strong className="text-black">{article.author}</strong> |{" "}
          {new Date(article.created_at).toLocaleDateString("vi-VN")}
        </div>

        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full max-h-[500px] object-cover rounded-xl mb-8 shadow"
          />
        )}

        {article.description && (
          <p className="text-lg text-gray-700 font-medium italic mb-6 border-l-4 border-blue-600 pl-4">
            {article.description}
          </p>
        )}

        <div
          className="prose prose-lg max-w-none text-justify mb-10"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>

        {additionalImages.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Hình ảnh liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {additionalImages.map((img, idx) => (
                <figure key={idx} className="bg-gray-50 p-3 rounded-lg shadow">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-auto object-cover rounded"
                  />
                  {img.caption && (
                    <figcaption className="mt-2 text-sm text-gray-600 text-center italic">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bài viết mới nhất - bên phải */}
      <aside className="lg:w-1/3 w-full">
        <div className="bg-gray-100 p-5 rounded-lg shadow sticky top-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Bài viết mới nhất</h3>
          <ul className="space-y-4">
            {recentArticles.map((item) => (
              <li key={item.id} className="border-b pb-3">
                <Link
                  to={`/news/${item.id}`}
                  className="text-blue-700 hover:underline font-semibold text-sm block"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-gray-500">
                  {new Date(item.created_at).toLocaleDateString("vi-VN")}
                </p>
                {item.description && (
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {item.description.length > 100
                      ? item.description.substring(0, 100) + "..."
                      : item.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default ArticleDetail;
