import { MoveDown, MoveUp, Search } from "lucide-react";
import UserRow from "./user-row";
import useAdminUser from "../../hooks/useAdminUser";
import useAdminUserActions from "../../hooks/useAdminUserActions";
import AdminPagination from "../admin-pagination";
import EmptyStage from "../empty-blog-stage";

const UserSection = () => {
  const {
    users,
    handleSort,
    ascUsername,
    ascDate,
    ascEmail,
    handleFilterChange,
    handleSearchInput,
    searchRef,
    meta,
    handlePageChange,
  } = useAdminUser();
  const { handleDeleteUser, handleBan, handleActive, loading } =
    useAdminUserActions();
  return (
    <div className=" border rounded-2xl p-4 flex flex-col gap-4 items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <label className="input input-primary">
          <Search />
          <input
            onChange={handleSearchInput}
            ref={searchRef}
            type="search"
            required
            placeholder="Search blog title and category"
          />
        </label>
        <select
          onChange={handleFilterChange}
          name=""
          className="select select-primary w-25"
          id=""
        >
          <option className=" text-primary" value="">
            All
          </option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
        </select>
      </div>

      <table className=" table table-zebra  w-full">
        <thead>
          <th className=" flex items-center gap-x-2">
            <span>Name</span>
            {ascUsername ? (
              <MoveUp size={14} onClick={() => handleSort("username", "asc")} />
            ) : (
              <MoveDown
                size={14}
                onClick={() => handleSort("username", "desc")}
              />
            )}
          </th>
          <th>
            <div className=" flex items-center gap-x-2">
              <span>Email</span>
              {ascEmail ? (
                <MoveUp size={14} onClick={() => handleSort("email", "asc")} />
              ) : (
                <MoveDown
                  size={14}
                  onClick={() => handleSort("email", "desc")}
                />
              )}
            </div>
          </th>
          <th>Role</th>
          <th>Status</th>
          <th>
            <div className=" flex items-center gap-x-2">
              <span>Join Date</span>
              {ascDate ? (
                <MoveUp
                  size={14}
                  onClick={() => handleSort("createdAt", "asc")}
                />
              ) : (
                <MoveDown
                  size={14}
                  onClick={() => handleSort("createdAt", "desc")}
                />
              )}
            </div>
          </th>
          <th className=" text-end">Total Blogs</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {loading && <tr>Loading...</tr>}
          {!loading && users.length === 0 && <EmptyStage message="Users" />}
          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              loading={loading}
              handleDeleteUser={handleDeleteUser}
              handleBan={handleBan}
              handleActive={handleActive}
            />
          ))}
        </tbody>
      </table>
      <div className=" w-full text-end">
        <AdminPagination
          totalPages={meta.totalPages}
          currentPage={meta.currentPage}
          handlePageChange={handlePageChange}
          hasNextPage={meta.hasNextPage}
          hasPrevPage={meta.hasPrevPage}
        />
      </div>
    </div>
  );
};

export default UserSection;
