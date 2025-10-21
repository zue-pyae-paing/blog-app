import Container from "./container";
import ThemeBtn from "./theme-btn";

const Navbar = () => {
  return (
    <Container>
      <div className=" navbar flex justify-between">
        <div className=" font-bold md:text-3xl text-xl text-primary">Logo</div>
        <div>
          <ThemeBtn />
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
