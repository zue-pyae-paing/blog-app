import { BanIcon, Check, MoreHorizontal, Trash2 } from "lucide-react";
import type { AdminUser } from "../../../../types/user";
import { format } from "date-fns";

const UserRow = ({
  user,
  loading,
  handleBan,
  handleActive,
  handleDeleteUser,
}: {
  user: AdminUser;
  loading: boolean;
  handleBan: (userId: string) => void;
  handleActive: (userId: string) => void;
  handleDeleteUser: (userId: string) => void;
}) => {
  return (
    <tr>
      <td className=" font-semibold capitalize">{user?.username}</td>
      <td>{user?.email}</td>
      <td>
        <span
          className={` badge  badge-soft capitalize text-xs ${
            user?.role === "admin" ? "badge-error" : "badge-primary"
          }`}
        >
          {user?.role}
        </span>
      </td>
      <td>
        <span
          className={` badge  badge-soft capitalize text-xs ${
            user?.status === "active" ? "badge-success" : "badge-warning"
          } `}
        >
          {user?.status}
        </span>
      </td>
      <td>{format(new Date(user?.createdAt), "dd/MM/yyyy")}</td>
      <td className=" text-end">{user?.totalBlogs}</td>
      <td className="text-center">
        <div className="dropdown dropdown-center">
          <div tabIndex={0} role="button" className=" ">
            <MoreHorizontal size={16} />
          </div>
          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-primary-content rounded-box z-1 w-34 p-2 shadow-sm"
          >
            {user?.status === "active" ? (
              <li>
                <div
                  className=" text-warning"
                  onClick={() => handleBan(user._id)}
                >
                  <BanIcon size={16} />
                  {loading ? <p>Loading...</p> : <p>Ban</p>}
                </div>
              </li>
            ) : (
              <li>
                <div
                  className=" text-success"
                  onClick={() => handleActive(user._id)}
                >
                  <Check size={16} />
                  {loading ? <p>Loading...</p> : <p>Unban</p>}
                </div>
              </li>
            )}
            <li>
              <div
                className=" text-error"
                onClick={() => handleDeleteUser(user._id)}
              >
                <Trash2 size={16} />
                {loading ? <p>Loading...</p> : <p>Delete</p>}
              </div>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
