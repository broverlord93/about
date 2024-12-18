import AppSidebar from "@components/app-sidebar";
import { SidebarProvider } from "@components/ui/sidebar";
import type { FC, PropsWithChildren } from "react";
import Body from "./Body";
import Header from "./Header";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider className={"bg-lemon-chiffon-100"}>
      <Header />
      <AppSidebar />
      <Body>{children}</Body>
    </SidebarProvider>
  );
};

export default Layout;
