import Container from "../../../components/container";
import UserOwnBlogsSection from "../components/user-blogs-section";
import UserDetail from "../components/user-detial";

const ProfilePage = () => {
  return (
    <Container className=" space-y-4 md:w-5xl mt-20  ">
      <div className="space-y-3">
        <UserDetail />
        <UserOwnBlogsSection />
      </div>
    </Container>
  );
};

export default ProfilePage;
