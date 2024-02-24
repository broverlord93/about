import { FC, PropsWithChildren } from "react";

const Main: FC<PropsWithChildren> = ({ children }) => {
  return <div className={"main-body"}>{children}</div>;
};

export default Main;
