import Body from "@/Body";
import Header from "@/Header";
import AppSidebar from "@components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@components/ui/sidebar";
import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <SidebarInset className="overflow-auto bg-[radial-gradient(circle_at_center,var(--color-glacier-100),var(--color-white))]">
          <Body>{children}</Body>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
