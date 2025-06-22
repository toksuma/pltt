import React, { useEffect, useState } from "react";
import ArticleCard from "../../components/ArticleCard";
import SearchBar from "../../components/SreachBar"; 
import SidebarNews from "../../components/SidebarNews";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔁 Gọi API khi trang vừa mở
  useEffect(() => {
    fetch("http://localhost:5000/api/articles")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err));
  }, []);

  // 🔎 Lọc bài viết theo ô tìm kiếm
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-10 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-10">
        TIN TỨC MỚI NHẤT
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Bên trái: danh sách bài viết */}
        <div className="flex-1">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Bên phải: bài viết mới nhất */}
        <div className="w-full lg:w-1/4">
          <SidebarNews articles={articles} />
        </div>
      </div>
    </div>
  );
};

export default News;