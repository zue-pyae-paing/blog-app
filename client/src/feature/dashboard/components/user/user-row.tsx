import { Edit2, Eye, Trash2 } from "lucide-react";

const UserRow = () => {
  return (
    <tr>
      <td>React Basic</td>
      <td>Pyae Sone</td>
      <td>React</td>
      <td>Publish</td>
      <td>2/1/2023</td>
      <td>135</td>
      <td className=" space-x-3">
        <button className="btn btn-primary btn-outline btn-sm btn-square">
          <Eye size={16} />
        </button>
        <button className="btn btn-primary btn-outline btn-sm btn-square">
          <Edit2 size={16} />
        </button>
        <button className="btn btn-error btn-outline  btn-sm btn-square">
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
