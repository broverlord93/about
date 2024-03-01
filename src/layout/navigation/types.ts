export type NavLinkProps = {
  icon?: () => JSX.Element;
  label?: string;
  path: string;
} & (
  | {
      icon: () => JSX.Element;
    }
  | {
      label: string;
    }
);
