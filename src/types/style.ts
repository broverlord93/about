export type Variant =
  | "light"
  | "dark"
  | "primary"
  | "secondary"
  | "info"
  | "warning"
  | "danger"
  | "success"
  | "light-primary"
  | "light-secondary"
  | "light-info"
  | "light-warning"
  | "light-danger"
  | "light-success"
  | "transparent"
  | "white";

export type ButtonDisplay =
  | {
      buttonDisplay: "text" | "icon" | "text-and-icon";
      buttonIconSize?: number;
      variant?: Variant;
    }
  | {
      buttonDisplay?: never;
      buttonIconSize?: never;
      variant?: never;
    };
