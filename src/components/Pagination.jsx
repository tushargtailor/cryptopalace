import React, { useState, useEffect } from "react";

const Pagination = ({ totalPages, page, setPage, maxVisible = 5 }) => {
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    // Adjust startPage if current page is outside visible window
    if (page < startPage) {
      setStartPage(page);
    } else if (page >= startPage + maxVisible) {
      setStartPage(page - maxVisible + 1);
    }
  }, [page, startPage, maxVisible]);

  const visiblePages = Array.from(
    { length: Math.min(maxVisible, totalPages - startPage + 1) },
    (_, i) => startPage + i
  );

  const handlePrev = () => setPage(Math.max(page - 1, 1));
  const handleNext = () => setPage(Math.min(page + 1, totalPages));

  return (
    <div className="flex justify-center gap-1 mt-4">
      <button
        className="px-3 py-1 rounded bg-gray-700 text-gray-300"
        onClick={handlePrev}
        disabled={page === 1}
      >
        Prev
      </button>

      {visiblePages.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded ${
            page === p ? "bg-cyan-500 text-white" : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="px-3 py-1 rounded bg-gray-700 text-gray-300"
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
