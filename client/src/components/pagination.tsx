import React from "react";
import {
  ChevronRight,
  ChevronsRight,
  ChevronLeft,
  ChevronsLeft,
} from "lucide-react";

interface PaginationProps {
  page: {
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    totalPages: number;
  };
  handlePageChange: (page: number) => void;
  className?: string;
}

// --------------------------
// MAIN PAGINATION LOGIC
// --------------------------
const getPageWindow = (current: number, total: number, windowSize = 5) => {
  const half = Math.floor(windowSize / 2); 

  let start = current - half; 
  let end = current + half;  
 
  if (start < 1) {
    start = 1;
    end = windowSize; 
  }

 
  if (end > total) {
    end = total;
    start = total - windowSize + 1;
    if (start < 1) start = 1;
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  handlePageChange,
  className,
}) => {
  if (!page?.totalPages) return null;

  const numbers = getPageWindow(page.currentPage, page.totalPages);

  return (
    <div className={`join ${className}`}>
      {/* First Page */}
      <button
        className="join-item btn"
        onClick={() => handlePageChange(1)}
        disabled={page.currentPage === 1}
      >
        <ChevronsLeft />
      </button>

      {/* Previous Page */}
      <button
        className="join-item btn"
        onClick={() => page.previousPage && handlePageChange(page.previousPage)}
        disabled={!page.previousPage}
      >
        <ChevronLeft />
      </button>

      {/* Window Pages */}
      {numbers.map((num) => (
        <button
          key={num}
          className={`join-item btn ${
            page.currentPage === num ? "btn-active" : ""
          }`}
          onClick={() => handlePageChange(num)}
        >
          {num}
        </button>
      ))}

      {/* Next Page */}
      <button
        className="join-item btn"
        onClick={() => page.nextPage && handlePageChange(page.nextPage)}
        disabled={!page.nextPage}
      >
        <ChevronRight />
      </button>

      {/* Last Page */}
      <button
        className="join-item btn"
        onClick={() => handlePageChange(page.totalPages)}
        disabled={page.currentPage === page.totalPages}
      >
        <ChevronsRight />
      </button>
    </div>
  );
};

export default Pagination;
