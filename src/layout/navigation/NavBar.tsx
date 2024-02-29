import React from "react";
import NavLink from "./NavLink.tsx";
import { navLinks } from "./navLinks.tsx";

const NavBar: React.FC = () => {
  return (
    <div className={"main-nav"}>
      <ul className={"main-nav__links"}>
        {navLinks.map(({ icon, label, path }, index) => {
          return (
            <NavLink
              key={`${index}-${label}`}
              icon={icon}
              label={label}
              path={path}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default NavBar;
