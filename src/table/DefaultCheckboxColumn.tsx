import IndeterminateCheckbox from "@components/ui/IndeterminateCheckbox";
import type { Row as TableRow, Table } from "@tanstack/react-table";

const DefaultCheckboxColumn = <TData,>({
  isPaginationEnabled = false,
}: {
  isPaginationEnabled: boolean;
}) => {
  return {
    id: "select",
    ...(isPaginationEnabled && {
      footer: ({ table }: { table: Table<TData> }) => {
        const { pagination } = table.getState();
        const checked = table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected();

        return (
          <div>
            <IndeterminateCheckbox
              checked={checked}
              onCheckedChange={table.getToggleAllPageRowsSelectedHandler()}
            />
            <span className={"text-start align-middle"}>
              Select All <br />
              {pagination?.pageSize && `Page Rows (${pagination.pageSize})`}
            </span>
          </div>
        );
      },
    }),
    header: ({ table }: { table: Table<TData> }) => (
      <div>
        <IndeterminateCheckbox
          checked={
            table.getIsSomeRowsSelected()
              ? "indeterminate"
              : table.getIsAllRowsSelected()
          }
          onCheckedChange={table.getToggleAllRowsSelectedHandler()}
        />
      </div>
    ),
    cell: ({ row }: { row: TableRow<TData> }) => (
      <div>
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={row.getToggleSelectedHandler()}
        />
      </div>
    ),
    size: isPaginationEnabled ? 250 : 100,
  };
};

export default DefaultCheckboxColumn;
