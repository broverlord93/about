import { FC } from "react";
import { NavLinkProps } from "./types.ts";

const NavLink: FC<NavLinkProps> = ({ icon, label, path }) => {
  return (
    <li className={"main-nav__link"}>
      {icon && icon()}
      <a href={path}>{label}</a>
    </li>
  );
};

export default NavLink;
