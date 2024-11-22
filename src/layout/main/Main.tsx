import { Button } from "@components/ui/button";
import { FC, PropsWithChildren } from "react";

const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={"bg-lemon-chiffon-50 h-dvh"}>
      {children}
      <Button>Button</Button>
    </div>
  );
};

export default Main;
