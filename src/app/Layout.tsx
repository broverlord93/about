import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@components/app-sidebar";
import type { FC, ReactNode } from "react";
import Main from "./Main";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <Main>{children}</Main>
    </SidebarProvider>
  );
};

export default Layout;
