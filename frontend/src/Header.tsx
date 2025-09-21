import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@components/ui/navigation-menu";
import type { FC, PropsWithChildren } from "react";

const Header: FC<PropsWithChildren> = () => {
  return (
    <header
      className={
        "fixed right-0 top-0 z-50 flex h-[var(--header-height)] w-[calc(100vw_-_var(--sidebar-width))] flex-col bg-sugar-cane-700 text-sugar-cane-100 drop-shadow-lg"
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
