import { DataTable, TableData } from "@/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import DateTimePicker from "@components/ui/DateTimePicker";
import { ScrollArea } from "@components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { createFileRoute } from "@tanstack/react-router";
import { ColumnDef, createColumnHelper, Row } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface Employee {
  id: number;
  name: string;
  title: string;
}

// const dataBasic: TableData<Employee>[] = [
//   {
//     id: 1,
//     name: "Anthony Limani",
//     title: "Software Engineer",
//   },
//   {
//     id: 2,
//     name: "Dustin Johnson",
//     title: "Principal Engineer",
//   },
//   {
//     id: 3,
//     name: "Jared Burke",
//     title: "Senior Software Engineer",
//   },
//   {
//     id: 4,
//     name: "Frank Ableson",
//     title: "Chief Technology Officer",
//   },
//   {
//     id: 5,
//     name: "Samara Augustin",
//     title: "Software Engineer",
//   },
//   {
//     id: 6,
//     name: "Chris Pane",
//     title: "Minecraft Connoisseur",
//   },
//   {
//     id: 7,
//     name: "Josh Ortiga",
//     title: "VIM Enthusiast",
//   },
//   {
//     id: 8,
//     name: "Jordan Li",
//     title: "Dunno, I'm Out of Ideas ¯\\_(ツ)_/¯",
//   },
// ];

const dataWithSubRows: TableData<Employee>[] = [
  {
    id: 1,
    name: "Anthony Limani",
    title: "Software Engineer",
  },
  {
    id: 2,
    name: "Dustin Johnson",
    title: "Principal Engineer",
  },
  {
    id: 3,
    name: "Jared Burke",
    title: "Senior Software Engineer",
    subRows: [
      {
        id: 1,
        name: "Anthony Limani",
        title: "Software Engineer",
      },
      {
        id: 5,
        name: "Samara Augustin",
        title: "Software Engineer",
      },
      {
        id: 6,
        name: "Chris Pane",
        title: "Minecraft Connoisseur",
      },
      {
        id: 7,
        name: "Josh Ortiga",
        title: "VIM Enthusiast",
      },
      {
        id: 8,
        name: "Jordan Li",
        title: "Dunno, I'm Out of Ideas ¯\\_(ツ)_/¯",
      },
    ],
  },
];

const columnHelper = createColumnHelper<TableData<Employee>>();

const makeColumns = ({
  isExportable = false,
  isFaceted = false,
  canFilter = false,
}) => {
  const hasMeta = isExportable || canFilter;

  return [
    columnHelper.accessor("id", {
      id: "id",
      enableMultiSort: false,
      filterFn: "equals",
      header: "ID",
      size: 500,
      ...(hasMeta && {
        meta: {
          ...(isExportable && { isExportable: true }),
          ...(canFilter && {
            Filter: ({
              column: {
                getFacetedUniqueValues,
                getFilterValue,
                setFilterValue,
              },
            }) => {
              interface Option {
                label: number | string;
                value: number;
              }

              const makeOptions = (): Option[] => {
                if (isFaceted) {
                  return Object.entries(getFacetedUniqueValues())
                    .map(([key, value]: [string, number]) => ({
                      label: key,
                      value,
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label));
                }

                return [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({
                  value: id,
                  label: id,
                }));
              };

              const filterValue = getFilterValue();

              const options = makeOptions();

              return (
                <Select
                  onValueChange={(value) => {
                    setFilterValue(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        options.find(({ value }) => value === filterValue)
                          ?.label
                      }
                    ></SelectValue>
                    <SelectContent>
                      <SelectGroup>
                        {options.map(({ label, value }) => (
                          <SelectItem value={`${value}`}>{label}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              );
            },
          }),
        },
      }),
    }),
    columnHelper.accessor(({ name }) => name.split(" ")[0], {
      id: "firstName",
      header: `First Name ${canFilter ? "(Includes String)" : ""}`,
      filterFn: "includesString",
      cell: ({
        row: {
          original: { name },
        },
      }) => {
        const [firstName] = name.split(" ");

        return <>{firstName}</>;
      },
      size: 500,
      ...(isExportable && { meta: { isExportable: true } }),
    }),
    columnHelper.accessor(({ name }) => name.split(" ")[1], {
      id: "lastName",
      header: `Last Name ${canFilter ? "(Equals String)" : ""}`,
      filterFn: "equalsString",
      cell: ({
        row: {
          original: { name },
        },
      }) => {
        const [, lastName] = name.split(" ");

        return <>{lastName}</>;
      },
      size: 500,
      ...(isExportable && { isExportable: true }),
    }),
    columnHelper.accessor("title", {
      id: "title",
      header: `Title ${canFilter ? "(Includes String Case Sensitive)" : ""}`,
      filterFn: "includesStringSensitive",
      size: 500,
      ...(isExportable && { meta: { isExportable: true } }),
    }),
  ] as ColumnDef<TableData<Employee>>[];
};

const expandedRowComponent = (row: Row<Employee>) => {
  return (
    <Card className={"bg-light-primary"}>
      <CardHeader>
        <CardTitle>Expanded Row Component</CardTitle>
      </CardHeader>
      <CardContent>
        <p>I'm an expanded row, check out my data!</p>
        <p>{JSON.stringify(row.original, null, "\t")}</p>
      </CardContent>
    </Card>
  );
};

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [value, setValue] = useState<Date | undefined>();

  const tableColumns = useMemo(
    () =>
      makeColumns({
        canFilter: true,
        isFaceted: false,
      }),
    [],
  );

  const tableData = useMemo(() => dataWithSubRows, []);

  return (
    <div>
      <div className={"w-full"}>
        {value && value.toISOString()}
        <DateTimePicker
          onChange={([date]) => {
            setValue(date);
          }}
        />
      </div>
      <div className={"w-full"}>
        <ScrollArea className={"h-96"}>
          <DataTable
            headerClassName={"bg-sugar-cane-100"}
            columns={tableColumns}
            data={tableData}
            isRowExpansionEnabled
            expandedRowComponent={expandedRowComponent}
          />
        </ScrollArea>
      </div>
    </div>
  );
}
