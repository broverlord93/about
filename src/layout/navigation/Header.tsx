import HeaderBrand from "@layout/navigation/HeaderBrand.tsx";
import NavBar from "./NavBar.tsx";

const Header = () => {
  return (
    <div className={"main-header"}>
      <HeaderBrand className={"main-header__brand"} />
      <NavBar />
    </div>
  );
};

export default Header;
