import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@components/app-sidebar";
import type { FC, ReactNode } from "react";
import Header from "./Header";
import Main from "./Main";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider className={"bg-lemon-chiffon-100"}>
      <Header />
      <AppSidebar />
      <Main>{children}</Main>
    </SidebarProvider>
  );
};

export default Layout;
