export const STATUSES = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
  SAVING: "saving",
  DELETING: "deleting",
} as const;

export type Statuses = typeof STATUSES;
export type Status = Statuses[keyof Statuses];
