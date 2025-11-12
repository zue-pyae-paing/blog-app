import { Search } from "lucide-react";
import useBlog from "../hooks/useBlog";

const BlgoFilter = () => {
  const { searchRef, handleSearchInput, clearSearchInput } = useBlog();
  return (
    <div className=" w-1/4 bg-accent mt-4 border card">
      <div className=" card-body">
        <h1 className="text-3xl font-bold card-title">Filter</h1>
        <label className=" input">
          <Search />
          <input
            ref={searchRef}
            type="text"
            placeholder="Type here"
            className="grow"
            onChange={(e) => handleSearchInput(e)}
          />
          {searchRef.current?.value && (
            <button
              className=" btn btn-square btn-sm"
              onClick={clearSearchInput}
            >
              x
            </button>
          )}
        </label>
      </div>
    </div>
  );
};

export default BlgoFilter;
