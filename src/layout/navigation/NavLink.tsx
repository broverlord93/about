import React from "react";

// TODO: Take icon as a prop and render it
const NavLink: React.FC<{ label: string; path: string }> = ({
  label,
  path,
}) => {
  return (
    <li className={"main-nav__link"}>
      <a href={path}>{label}</a>
    </li>
  );
};

export default NavLink;
