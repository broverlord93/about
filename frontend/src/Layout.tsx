import Header from "@/Header";
import AppSidebar from "@components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";
import type { FC, PropsWithChildren } from "react";
import Body from "./Body";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <SidebarInset className="overflow-auto">
          <Body>{children}</Body>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
