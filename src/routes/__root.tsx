import { createRootRoute, Outlet } from "@tanstack/react-router";

const RootComponent = () => {
  return (
    <>
      <div>Hello "__root"!</div>
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
