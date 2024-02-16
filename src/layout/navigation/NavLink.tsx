import React from "react";

const NavLink: React.FC<{ label: string; path: string }> = ({
  label,
  path,
}) => {
  return (
    <a className={"main-nav__link"} href={path}>
      {label}
    </a>
  );
};

export default NavLink;
