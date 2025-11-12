import useUserActions from "../hooks/useUserActions";

const ChangeAvatar = () => {
  const {
    initial,
    avatar,
    fileRef,
    clickFileInput,
    handleFileChange,
    loading,
  } = useUserActions();
  return (
    <div className=" flex gap-y-2  flex-col">
      <h2 className=" text-lg font-bold text-secondary ">Change Avatar</h2>
      <div className=" flex gap-x-2 items-center">
        <div className="w-20 h-20 border border-primary rounded-full overflow-hidden flex items-center justify-center bg-secondary-content">
          {avatar ? (
            <img
              src={avatar}
              alt={"avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <h1 className=" text-3xl font-bold text-primary ">{initial}</h1>
          )}
        </div>
        <input type="file" hidden onChange={handleFileChange} ref={fileRef} />

        <button className=" btn btn-outline btn-sm" onClick={clickFileInput}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default ChangeAvatar;
