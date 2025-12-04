import { useState } from "react";
import { MoveDown, MoveUp, Search } from "lucide-react";
import UserRow from "./user-row";

const UserSection = () => {
  const [ascTiele, setAscTiele] = useState(true);
  const [ascDate, setAscDate] = useState(true);
  const [ascViews, setAscViews] = useState(true);

  const handleSort = (type: string) => {
    switch (type) {
      case "title":
        setAscTiele(!ascTiele);
        break;
      case "date":
        setAscDate(!ascDate);
        break;
      case "views":
        setAscViews(!ascViews);
        break;
    }
  };
  return (
    <div className=" border rounded-2xl p-4 flex flex-col gap-4 items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <label className="input input-primary">
          <Search />
          <input
            type="search"
            required
            placeholder="Search blog title and category"
          />
        </label>
        <select name="" className="select select-primary w-20" id="">
          <option className=" text-primary" value="1">
            All
          </option>
          <option value="2">Publish</option>
          <option value="3">Draft</option>
        </select>
      </div>

      <table className=" table table-zebra  w-full">
        <thead>
          <th className=" flex items-center gap-x-2">
            <span>Name</span>
            {ascTiele ? (
              <MoveUp size={14} onClick={() => handleSort("title")} />
            ) : (
              <MoveDown size={14} onClick={() => handleSort("title")} />
            )}
          </th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>
            <div className=" flex items-center gap-x-2">
              {" "}
              <span>Join Date</span>
              {ascDate ? (
                <MoveUp size={14} onClick={() => handleSort("date")} />
              ) : (
                <MoveDown size={14} onClick={() => handleSort("date")} />
              )}
            </div>
          </th>
          <th>
            <div className=" flex items-center gap-x-2">
              <span>Total Blogs</span>
              {ascViews ? (
                <MoveUp size={14} onClick={() => handleSort("views")} />
              ) : (
                <MoveDown size={14} onClick={() => handleSort("views")} />
              )}
            </div>
          </th>
          <th>Actions</th>
        </thead>
        <tbody>
          <UserRow />
        </tbody>
      </table>
      <div className=" flex items-center justify-between w-full">
        <p className=" text-sm ">Showing 1 to 10 of 100</p>
        <div className="join">
          <button className="join-item btn">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn btn-disabled">...</button>
          <button className="join-item btn">99</button>
          <button className="join-item btn">100</button>
        </div>
      </div>
    </div>
  );
};

export default UserSection;
