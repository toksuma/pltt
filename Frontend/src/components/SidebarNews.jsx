const SidebarNews = ({ articles }) => {
  const latestArticles = [...articles]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">Bài viết mới</h3>
      <ul className="space-y-2">
        {latestArticles.map((article) => (
          <li
            key={article.id}
            className="hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          >
            {article.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarNews;