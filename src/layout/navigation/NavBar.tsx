import { navLinks } from "./navLinks.ts";
import NavLink from "./NavLink.tsx";

const NavBar = () => {
  return (
    <div className={"main-nav"}>
      <div className={"main-nav__links"}>
        {navLinks.map(({ label, path }, index) => {
          return (
            <NavLink key={`${index}-${label}`} label={label} path={path} />
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
