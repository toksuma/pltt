import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/news/${article.id}`}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden group transition-all duration-300">
        <div className="overflow-hidden h-48">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold capitalize group-hover:text-blue-600 transition-colors duration-300">
            {article.title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
