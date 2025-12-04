import { MoveDown, MoveUp, Search } from "lucide-react";
import CategoryRow from "./category-row";
import useAdminCategory from "../../hooks/useAdminCategory";
import AdminPagination from "../admin-pagination";

const CategorySection = () => {
  const {
    
    handleSearchInput,
    searchRef,
    totalPages,
    categories,
    handleSort,
    ascDate,
    handlePageChange,
    hasNextPage,
    hasPreviousPage,
    currentPage,
  } = useAdminCategory();

  return (
    <div className=" border rounded-2xl p-4 flex flex-col gap-4 items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <label className="input input-primary">
          <Search />
          <input
            type="search"
            ref={searchRef}
            onChange={handleSearchInput}
            className=" input-bordered input-sm  ml-2 w-64"
            required
            placeholder="Search blog title and category"
          />
        </label>
      </div>

      <table className=" table table-zebra  w-full">
        <thead className=" ">
          <th className=" flex items-center gap-x-2">Title</th>
          <th>Slug</th>
          <th className=" text-center">Post</th>

          <th className=" flex items-center gap-x-2">
            <div className=" flex items-center gap-x-2  ml-auto">
              {" "}
              <span>Created</span>
              {ascDate ? (
                <MoveUp size={14} onClick={() => handleSort("asc")} />
              ) : (
                <MoveDown size={14} onClick={() => handleSort("desc")} />
              )}
            </div>
          </th>
          <th className=" text-center">Actions</th>
        </thead>
        <tbody>
          {categories.length === 0 && (
            <tr>
              <td colSpan={5} className=" text-center ">
                No categories found.
              </td>
            </tr>
          )}
          {categories.map((category) => (
            <CategoryRow key={category._id} category={category} />
          ))}
        </tbody>
      </table>
      <div className=" w-full text-end">
        <AdminPagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>
    </div>
  );
};

export default CategorySection;
