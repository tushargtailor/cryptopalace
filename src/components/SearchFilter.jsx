import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../store/slices/filterSlice";

const SearchFilter = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearch(input));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search crypto..."
        className="w-full max-w-md px-4 py-3 rounded-l-2xl outline-none  text-gray-900"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={handleSearch}
        className="bg-cyan-500 text-white px-6 py-3 rounded-r-2xl hover:bg-cyan-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
