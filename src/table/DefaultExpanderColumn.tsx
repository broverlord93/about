import { Row, Table } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";

const DefaultExpanderColumn = <TData,>() => {
  return {
    id: "expander",
    cell: ({ row: { getIsExpanded, toggleExpanded } }: { row: Row<TData> }) => {
      return (
        <>
          {
            <div className={"cursor-pointer"} onClick={() => toggleExpanded()}>
              {getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
            </div>
          }
        </>
      );
    },
    enableColumnFilter: false,
    header: ({
      table: { getIsAllRowsExpanded, getToggleAllRowsExpandedHandler },
    }: {
      table: Table<TData>;
    }) => {
      return (
        <div
          className={"cursor-pointer"}
          onClick={getToggleAllRowsExpandedHandler()}
        >
          {getIsAllRowsExpanded() ? <ChevronDown /> : <ChevronRight />}
        </div>
      );
    },
    size: 75,
  };
};

export default DefaultExpanderColumn;
