import React from "react";
import NavLink from "./NavLink.tsx";
import { navLinks } from "./navLinks.ts";

const NavBar: React.FC = () => {
  return (
    <div className={"main-nav"}>
      <ul className={"main-nav__links"}>
        {navLinks.map(({ label, path }, index) => {
          return (
            <NavLink key={`${index}-${label}`} label={label} path={path} />
          );
        })}
      </ul>
    </div>
  );
};

export default NavBar;
