import DebouncedInput from "@components/ui/DebouncedInput";
import type { Column, RowData } from "@tanstack/react-table";
import { X } from "lucide-react";

const DefaultTextFilter = <TData extends RowData, TValue = unknown>({
  column: { getFilterValue, setFilterValue },
}: {
  column: Column<TData, TValue>;
}) => {
  return (
    <div className="relative mb-4 flex items-stretch">
      <div className="relative">
        <DebouncedInput
          debounce={250}
          onDebouncedChange={(value) => setFilterValue(value)}
          placeholder={"Search..."}
          value={(getFilterValue() as string) || ""}
        />
        <span
          className={
            "absolute right-2.5 top-2.5 h-5 w-5 text-lemon-chiffon-900"
          }
          onClick={() => setFilterValue(undefined)}
          style={{ cursor: "pointer" }}
        >
          <X />
        </span>
      </div>
    </div>
  );
};

export default DefaultTextFilter;
