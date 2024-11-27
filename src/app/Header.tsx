import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@components/ui/navigation-menu";
import type { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header
      className={
        "bg-sugar-cane-700 text-sugar-cane-100 fixed right-0 top-0 z-50 flex h-[var(--header-height)] w-[calc(100vw_-_var(--sidebar-width))] flex-col drop-shadow-lg"
      }
    >
      <NavigationMenu className={"self-center"}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
