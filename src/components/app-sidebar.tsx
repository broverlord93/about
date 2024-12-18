import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Settings } from "lucide-react";
import type { FC } from "react";
import Brand from "./Brand";
import GithubIcon from "./icons/GithubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Github",
    url: "https://github.com/broverlord93",
    icon: GithubIcon,
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/anthonylimani",
    icon: LinkedInIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const AppSidebar: FC = () => {
  return (
    <Sidebar className={"shadow-md"}>
      <SidebarHeader>
        <Brand className={"brand"} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className={"h-2 w-2"} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
