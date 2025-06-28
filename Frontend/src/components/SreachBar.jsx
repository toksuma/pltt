import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="mb-6 relative w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Tìm kiếm bài viết..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <FiSearch size={18} />
      </div>
    </div>
  );
};

export default SearchBar;