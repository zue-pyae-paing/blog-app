import { Edit2, Trash2 } from "lucide-react";
import type { AdminCategory } from "../../../../types/blog";
import { format } from "date-fns";
import useAdminCategoryActions from "../../hooks/useAdminCategoryActions";

const CategoryRow = ({
  category,
  showModal,
}: {
  category: AdminCategory;
  showModal: (isCreate: boolean) => void;
}) => {
  const { loading, handleDeleteCategory,loadingDelete } = useAdminCategoryActions();
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
        {format(new Date(category?.createdAt), "dd/MM/yyyy")}
      </td>

      <td className="text-center space-x-2">
        <button
          className=" btn btn-ghost btn-square text-primary"
          onClick={() => showModal(false, category?.slug)}
        >
          <Edit2 size={16} />
        </button>
        <button
          disabled={loadingDelete}
          className=" btn btn-ghost btn-square text-error"
          type="button"
          onClick={() => handleDeleteCategory(category?.slug)}
        >
          {loadingDelete ? "Deleting..." : <Trash2 size={16} />}
        </button>
      </td>
    </tr>
  );
};

export default CategoryRow;
