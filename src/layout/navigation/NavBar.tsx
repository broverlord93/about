import NavBranding from "@layout/navigation/NavBranding.tsx";
import React from "react";
import NavLink from "./NavLink.tsx";
import { navLinks } from "./navLinks.tsx";

const NavBar: React.FC = () => {
  return (
    <div className={"nav"}>
      <div className={"nav-branding"}>
        <NavBranding className={"nav-branding-canvas"} />
      </div>
      <ul className={"nav-items"}>
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
