import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/card.js";
import { FC, PropsWithChildren } from "react";

const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={"h-dvh w-dvw bg-lemon-chiffon-100"}>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default Main;
