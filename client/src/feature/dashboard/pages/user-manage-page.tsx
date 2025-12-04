import { User } from "lucide-react";
import React from "react";
import UserSection from "../components/user/user-section";
import Container from "../../../components/container";

const UserManagePage = () => {
  return (
    <Container className=" space-y-4">
      <div>
        <h2 className=" font-bold text-3xl ">User Management</h2>
        <p>Manage system users and their roles</p>
      </div>
      <UserSection />
    </Container>
  );
};

export default UserManagePage;
