import useUserActions from "../hooks/useUserActions";

const ChangeUserName = () => {
  const { username, handleUsernameChange } = useUserActions();
  return (
    <div className=" space-y-3">
      <h1 className=" text-lg font-bold text-secondary ">Change Username</h1>
      <input
        type="text"
        className=" input input-bordered w-full max-w-xs"
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
  );
};

export default ChangeUserName;
