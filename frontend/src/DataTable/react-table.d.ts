import type { Column, RowData } from "@tanstack/react-table";
import { JSX } from "react";

declare module "@tanstack/react-table" {
  export interface ColumnMeta<TData extends RowData, TValue = unknown> {
    Filter?: ({ column }: { column: Column<TData, TValue> }) => JSX;
    isExportable?: boolean;
  }
}
