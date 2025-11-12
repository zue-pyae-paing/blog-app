import { Link } from "react-router";
import useAccountStore from "../../../store/useAccountStore";
import { useState } from "react";
import { X } from "lucide-react";

const UserDetail = () => {
  const account = useAccountStore((state) => state.account);
  const [show, setShow] = useState(false);
  const initial = account.username
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toLocaleUpperCase();
  console.log(show);
  return (
    <div className=" flex items-center flex-col ">
      <div
        className="  w-30 h-30 border border-primary rounded-full overflow-hidden flex items-center justify-center bg-secondary-content"
        onClick={() => setShow(true)}
      >
        {account.avatar ? (
          <img
            src={account.avatar}
            alt={account.username}
            className="w-full h-full object-cover"
          />
        ) : (
          <h1 className=" text-5xl font-bold text-primary ">{initial}</h1>
        )}

        {show && (
          <div className=" w-[300px] h-[300px] absolute top-10 left-1/2 transfrom -translate-x-1/2 bg-red-400 z-10 transition-all duration-150 ease-in-out rounded-lg overflow-hidden">
            <img
              src={account.avatar}
              alt={account.username}
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShow(false);
              }}
              className=" btn btn-square text-red-800 absolute btn-sm right-0 top-0"
            >
              <X />
            </button>
          </div>
        )}
      </div>
      <h1 className=" capitalize font-bold text-2xl md:text-4xl">
        {account.username}
      </h1>
      <p className=" text-secondary">{account.email}</p>
      <div>
        <Link to="/setting" className="btn btn-secondary mt-4 md:btn-md btn-sm">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
