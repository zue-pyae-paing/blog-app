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

const Pagination: React.FC<PaginationProps> = ({
  page,
  handlePageChange,
  className,
}) => {
  if (!page?.totalPages) return null;

  return (
    <div className={`join ${className}`}>
      <button
        className="join-item btn"
        onClick={() => handlePageChange(1)}
        disabled={page.currentPage === 1}
      >
        <ChevronsLeft />
      </button>

      <button
        className="join-item btn"
        onClick={() => page.previousPage && handlePageChange(page.previousPage)}
        disabled={!page.previousPage}
      >
        <ChevronLeft />
      </button>

      {Array.from({ length: page.totalPages }, (_, i) => (
        <button
          key={i}
          className={`join-item btn ${
            page.currentPage === i + 1 ? "btn-active" : ""
          }`}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="join-item btn"
        onClick={() => page.nextPage && handlePageChange(page.nextPage)}
        disabled={!page.nextPage}
      >
        <ChevronRight />
      </button>

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
