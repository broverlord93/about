import * as palette from "../../assets/scss/palette.module.scss";
import GithubIcon from "../../components/icons/GithubIcon.tsx";
import { NavLinkProps } from "./types.ts";

export const navLinks: NavLinkProps[] = [
  {
    label: "Github",
    icon: () => (
      <GithubIcon
        className={"main-nav__icon"}
        color={palette.dark}
        id={"github-icon"}
      />
    ),
    path: "https://github.com/broverlord93",
  },
  {
    label: "LinkedIn",
    icon: null,
    path: "https://www.linkedin.com/in/anthonylimani",
  },
];
