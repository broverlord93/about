import { FC, PropsWithChildren } from "react";

const Main: FC<PropsWithChildren> = ({ children }) => {
  return <div className={"bg-lemon-chiffon-100 h-dvh w-dvw"}>{children}</div>;
};

export default Main;
