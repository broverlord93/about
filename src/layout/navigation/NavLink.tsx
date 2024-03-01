import { FC } from "react";
import { NavLinkProps } from "./types.ts";

const NavLink: FC<NavLinkProps> = ({ icon, label, path }) => {
  return (
    <li className={"nav-item"}>
      <a href={path}>
        {icon && icon()}
        {label && <span className={"nav-item__label"}>{label}</span>}
      </a>
    </li>
  );
};

export default NavLink;
