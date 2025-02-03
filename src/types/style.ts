export type colors =
  | "blue-gray"
  | "gray"
  | "brown"
  | "deep-orange"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "light-green"
  | "green"
  | "teal"
  | "cyan"
  | "light-blue"
  | "blue"
  | "indigo"
  | "deep-purple"
  | "purple"
  | "pink"
  | "red";

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
