import { useEffect, useState } from "react";
import useBlog from "../feature/home/hooks/useBlog";
import type { Category } from "../feature/blog/components/blog-filter";

const CategoriesBar = ({ categories }: { categories: Category[] }) => {
  console.log(categories,'categories var')
  const [selected, setSelected] = useState<string>("All");
  const { handleCategoryChange } = useBlog();

  useEffect(() => {
    handleCategoryChange({ target: { value: selected === "All" ? "" : selected } } as any);
  }, [selected]);

  return (
    <div className=" flex flex-wrap gap-2 overflow-y-auto w-full scrrollbar-hide lg:h-40 md:h-auto">
      <button
        className={`btn btn-sm btn-soft w-fit ${
          selected === "All" ? "btn-primary" : "btn-secondary"
        }`}
        onClick={() => setSelected("All")}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.slug}
          className={`btn btn-sm btn-soft capitalize w-fit ${
            selected === category.name ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setSelected(category.slug)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoriesBar;
