import { Search } from "lucide-react";
import useBlog from "../hooks/useBlog";
import CategoriesBar from "../../../components/categories-bar";
import { useEffect, useState } from "react";
import { getCategory } from "../../../services/auth.service";

const BlogFilter = () => {
  const { searchRef, handleSearchInput, clearSearchInput } = useBlog();
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      const data = await response.json();
      setCategories(data.data);
      console.log("after fatching data", data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className=" md:block hidden lg:w-64 md:w-full h-auto  px-3 space-y-2">
      <label className=" input border-accent outline-none">
        <Search />
        <input
          ref={searchRef}
          type="text"
          placeholder="Search"
          className="grow"
          onChange={handleSearchInput}
        />
        {searchRef.current?.value && (
          <button onClick={clearSearchInput} className=" btn btn-square btn-xs">
            x
          </button>
        )}
      </label>
      <div className="w-full border border-accent rounded-lg p-4">
        <h2 className=" font-bold text-xl mb-2">Categories</h2>

        <CategoriesBar categories={categories} />
      </div>
    </div>
  );
};

export default BlogFilter;
