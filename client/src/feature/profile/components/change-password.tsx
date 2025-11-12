import useUserActions from "../hooks/useUserActions";
import { Eye, EyeClosed } from "lucide-react";
const ChangePassword = () => {
  const {
    setCurrentPassword,
    setNewPassword,
    loading,
    handlePasswordChange,
    showNewPassword,
    showPassword,
    toggleShowNewPassword,
    toggleShowPassword,
  } = useUserActions();
  return (
    <div className=" mt-3 space-y-2">
      <h2 className=" text-lg font-bold text-secondary">Change Password</h2>
      <div className=" relative max-w-xs ">
        <input
          type={showPassword ? "text" : "password"}
          className=" input input-bordered w-full relative"
          placeholder="Current Password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {showPassword ? (
          <Eye
            size={20}
            className=" absolute top-1/2 -translate-y-1/2 right-2 z-10"
            onClick={toggleShowPassword}
          />
        ) : (
          <EyeClosed
            size={20}
            className=" absolute top-1/2 -translate-y-1/2 right-2 z-10"
            onClick={toggleShowPassword}
          />
        )}
      </div>
      <div className=" relative max-w-xs ">
        <input
          type={showNewPassword ? "text" : "password"}
          className=" input input-bordered w-full relative"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {showNewPassword ? (
          <Eye
            size={20}
            className=" absolute top-1/2 -translate-y-1/2 right-2 z-10"
            onClick={toggleShowNewPassword}
          />
        ) : (
          <EyeClosed
            size={20}
            className=" absolute top-1/2 -translate-y-1/2 right-2 z-10"
            onClick={toggleShowNewPassword}
          />
        )}
      </div>
      <button
        className=" btn btn-primary"
        disabled={loading}
        onClick={handlePasswordChange}
      >
        {loading ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default ChangePassword;
