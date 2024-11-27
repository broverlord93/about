import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/card.js";
import { FC, PropsWithChildren } from "react";

const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main
      className={
        "fixed left-[var(--sidebar-width)] top-[var(--header-height)] h-[calc(100vh_-_var(--header-height))] w-[calc(100vw_-_var(--sidebar-width))]"
      }
    >
      <Card className={"bg-lemon-chiffon-50 mx-5 my-5 h-dvh shadow-md"}>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
};

export default Main;
