import Container from "../../../components/container";

import { LogOut, Trash2 } from "lucide-react";
import ChangeEmail from "../components/change-email";
import ChangePassword from "../components/change-password";
import ChangeAvatar from "../components/change-avatar";
import ChangeUserName from "../components/change-username";
import useAccountStore from "../../../store/useAccountStore";
import { useNavigate } from "react-router";

const SettingPage = () => {
  const logout = useAccountStore((state) => state.logout);
  const navigate = useNavigate()
  const handleLogout = () => {
    logout();
    navigate('/login')
  }
  return (
    <Container className=" flex flex-col gap-y-3 max-w-3xl mt-20">
      <div>
        <h1 className=" text-xl md:text-3xl font-bold text-primary">
          Edit Profile
        </h1>
        <p className="">
          Keep your personal details private. Information you add here is
          visible to anyone who can view your profile.
        </p>
      </div>
      <ChangeAvatar />

      <ChangeUserName />
      <h1 className=" text-xl md:text-3xl font-bold text-primary">
        Account Security
      </h1>
      <p>Make changes to your personal information or account type.</p>
      <ChangeEmail />
      <ChangePassword />
      <div className=" space-y-3">
        <h1 className=" text-xl md:text-3xl font-bold text-red-500">
          Delete Account and Data
        </h1>
        <div className=" flex md:items-center items-start md:justify-between md:flex-row flex-col gap-y-2 ">
          <div className="w-3/4">
            <h2 className=" text-lg font-bold text-secondary"> Account Logout</h2>
            <p>
              You can logout from your account. This action is permanent and
              cannot be undone.
            </p>
          </div>
          <button className=" btn btn-error md:btn-md btn-sm " onClick={handleLogout}>
            <LogOut />
            Logout
          </button>
        </div>
        <div className=" flex  md:items-center items-start justify-between md:flex-row flex-col gap-y-3">
          <div className="w-3/4">
            <h3 className=" text-lg font-bold text-secondary">Delete your data and account</h3>
            <p>
              You can delete your data and account. This action is permanent and
              cannot be undone.
            </p>
          </div>
          <button className=" btn btn-error md:btn-md btn-sm">
            <Trash2 />
            Delete account
          </button>
        </div>
      </div>
    </Container>
  );
};
export default SettingPage;
