import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

const AdminPagination = ({
  totalPages,
  currentPage,
  handlePageChange,
  hasPreviousPage,
  hasNextPage,
}: {
  totalPages: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  handlePageChange: (page: number) => void;
}) => {
  return (
    <div className="join">
      <button
        className=" join-item btn btn-sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
      >
        <ChevronsLeftIcon className="h-5 w-5" />
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={` join-item btn btn-sm ${
            currentPage === index + 1 ? "btn-active" : ""
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className=" join-item btn btn-sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        <ChevronsRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AdminPagination;
