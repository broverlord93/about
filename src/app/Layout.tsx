import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@components/app-sidebar";
import type { FC, PropsWithChildren } from "react";
import Header from "./Header";
import Main from "./Main";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider className={"bg-lemon-chiffon-100"}>
      <Header />
      <AppSidebar />
      <Main>{children}</Main>
    </SidebarProvider>
  );
};

export default Layout;
