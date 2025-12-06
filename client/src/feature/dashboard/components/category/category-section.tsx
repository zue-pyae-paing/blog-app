import { MoveDown, MoveUp, Search } from "lucide-react";
import CategoryRow from "./category-row";
import useAdminCategory from "../../hooks/useAdminCategory";
import AdminPagination from "../admin-pagination";
import EmptyStage from "../empty-blog-stage";

const CategorySection = ({
  showModal,
}: {
  showModal: (isCreate: boolean) => void;
}) => {
  const {
    handleSearchInput,
    searchRef,
    totalPages,
    categories,
    handleSort,
    ascDate,
    handlePageChange,
    hasNextPage,
    hasPrevPage,
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

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th className="text-center">Post</th>

            <th className="text-right">
              <div className="flex items-center justify-end gap-x-2">
                <span>Created</span>
                {ascDate ? (
                  <MoveUp size={14} onClick={() => handleSort("desc")} />
                ) : (
                  <MoveDown size={14} onClick={() => handleSort("asc")} />
                )}
              </div>
            </th>

            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
                
          {categories.length === 0 && (
            <EmptyStage message="Categories"  />
          )}

          {categories.map((c) => (
            <CategoryRow key={c._id} category={c} showModal={showModal} />
          ))}
        </tbody>
      </table>

      <div className=" w-full text-end">
        <AdminPagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      </div>
    </div>
  );
};

export default CategorySection;
