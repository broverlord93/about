import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { FC, PropsWithChildren } from "react";

const Body: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main
      className={
        "fixed left-[var(--sidebar-width)] top-[var(--header-height)] h-[calc(100vh-var(--header-height))] w-[calc(100vw-var(--sidebar-width))] px-2 py-2"
      }
    >
      <Card className={"h-full shadow-md"}>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
};

export default Body;
