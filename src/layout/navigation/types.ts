export interface NavLinkProps {
  icon?: (() => JSX.Element) | null;
  label: string;
  path: string;
}
