import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { FC, PropsWithChildren } from "react";

const Body: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full flex-col p-2">
      <Card className={"shadow-md bg-card/75 backdrop-blur-sm"}>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default Body;
