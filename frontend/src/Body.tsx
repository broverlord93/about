import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { FC, PropsWithChildren } from "react";

const Body: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col h-full p-2">
      <Card className={"h-full shadow-md"}>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default Body;
