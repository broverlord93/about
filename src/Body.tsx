import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { FC, PropsWithChildren } from "react";

const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main
      className={
        "fixed left-[var(--sidebar-width)] top-[var(--header-height)] h-[calc(100vh_-_var(--header-height))] w-[calc(100vw_-_var(--sidebar-width))] px-5 py-2"
      }
    >
      <Card className={"bg-lemon-chiffon-50 h-full shadow-md"}>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
};

export default Main;
