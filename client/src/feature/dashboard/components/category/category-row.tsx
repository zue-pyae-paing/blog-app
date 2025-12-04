import { Edit2, Trash2 } from "lucide-react";

import type { AdminCategory } from "../../hooks/useAdminCategory";
import { format } from "date-fns";
import useAdminCategoryActions from "../../hooks/useAdminCategoryActions";

const CategoryRow = ({ category }: { category: AdminCategory }) => {
  const { loading, handleDeleteCategory } = useAdminCategoryActions();
  return (
    <tr>
      <td className=" font-medium capitalize">{category?.name}</td>
      <td className=" text-nowrap ">{category?.slug}</td>
      <td className=" capitalize text-center">
        <span className=" badge badge-primary badge-soft">
          {category?.value}
        </span>
      </td>

      <td className=" text-end">
        {format(new Date(category?.date), "dd/MM/yyyy")}
      </td>

      <td className="text-center space-x-2">
        <button className=" btn btn-ghost btn-square text-primary">
          <Edit2 size={16} />
        </button>
        <button
          disabled={loading}
          className=" btn btn-ghost btn-square text-error"
          type="button"
          onClick={() => handleDeleteCategory(category?.slug)}
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export default CategoryRow;
