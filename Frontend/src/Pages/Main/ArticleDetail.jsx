import React from "react";
import { useParams, Link } from "react-router-dom";
import fakeArticles from "../../data/fakeArticles";

const ArticleDetail = () => {
  const { id } = useParams();
  const article = fakeArticles.find((item) => item.id.toString() === id);

  if (!article) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl text-red-600 font-semibold">Không tìm thấy bài viết</h2>
        <Link to="/news" className="text-blue-600 underline mt-4 block">Quay về trang tin tức</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/news" className="text-blue-600 underline block mb-4">← Quay lại</Link>
      <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <h1 className="text-3xl font-bold text-blue-800 mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Ngày đăng: {article.createdAt}</p>
      <div className="text-gray-700 leading-relaxed">
        <p>
          Đây là nội dung mô tả tạm cho bài viết. Sau này bạn có thể lấy từ database
          và render từ backend. Bạn có thể thêm nội dung HTML hoặc markdown nếu muốn.
        </p>
      </div>
    </div>
  );
};

export default ArticleDetail;
