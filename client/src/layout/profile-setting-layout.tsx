import { Link, Outlet } from "react-router";
import Container from "../components/container";

const ProfileSettingLayout = () => {
  return (
    <>
      <Container className=" space-x-3">
        <Link className=" btn btn-primary btn-sm btn-dash" to="/setting">Edit Profile</Link>
        <Link className=" btn btn-primary btn-sm btn-dash" to="/setting/account">Manage Account</Link>
      </Container>
      <Outlet />
    </>
  );
};

export default ProfileSettingLayout;
