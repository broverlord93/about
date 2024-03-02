import * as palette from "@assets/scss/palette.module.scss";
import GithubIcon from "@components/icons/GithubIcon.tsx";
import LinkedInIcon from "@components/icons/LinkedInIcon.tsx";
import { NavLinkProps } from "./types.ts";

export const navLinks: NavLinkProps[] = [
  {
    label: "Github",
    icon: () => (
      <GithubIcon
        className={"nav-item__icon"}
        color={palette.dark}
        id={"github-icon"}
        size={"1.5rem"}
      />
    ),
    path: "https://github.com/broverlord93",
  },
  {
    label: "LinkedIn",
    icon: () => (
      <LinkedInIcon
        className={"nav-item__icon"}
        color={palette.dark}
        id={"linkedin-icon"}
        size={"1.5rem"}
      />
    ),
    path: "https://www.linkedin.com/in/anthonylimani",
  },
];
