import { Status, STATUSES } from "@src/constants";
import type {
  ColumnDef,
  HeaderGroup,
  Row,
  RowData,
} from "@tanstack/react-table";
import { useState } from "react";
import { utils as excel, writeFile } from "xlsx";

export interface Sheet {
  columns: ColumnDef<RowData>[];
  getData: <TData extends Record<string, unknown>>() => Promise<Row<TData>[]>;
  headerGroups: HeaderGroup<RowData>[];
  sheetName: string;
}

type useExcelProps = {
  fileName: string;
  sheets: Array<Sheet>;
};

const { ERROR, IDLE, LOADING } = STATUSES;

const isExportable = (column: ColumnDef<RowData>) =>
  !!column.meta?.isExportable;

const getHeaderData = (headerGroups: HeaderGroup<RowData>[]) => {
  const exportableColumns: ColumnDef<RowData>[] = [];
  const headers: string[][] = [];

  headerGroups.map((headerGroup) => {
    const headerRow = headerGroup.headers.reduce((array: string[], header) => {
      const { column, isPlaceholder } = header;
      if (isPlaceholder) return [...array, ""];

      if (isExportable(column.columnDef)) {
        exportableColumns.push(column.columnDef);
        return [...array, column.id];
      } else return [...array];
    }, []);

    headers.push(headerRow);
  });

  return {
    exportableColumns,
    headers,
  };
};

const getRowData = ({
  columns,
  rows,
}: {
  columns: ColumnDef<RowData>[];
  rows: Row<Record<string, unknown>>[];
}) => {
  const data: string[][] = [];

  for (const row of rows) {
    const values = [];

    for (const column of columns) {
      if (!isExportable(column)) continue;

      if ("original" in row) {
        if ("accessorKey" in column) {
          values.push(row.original[column.accessorKey] as string);
        }
        if ("accessorFn" in column) {
          values.push(column.accessorFn(row.original, row.index) as string);
        }
      }
    }

    data.push(values);
  }

  return data;
};

const prepareSheet = async (sheet: Sheet) => {
  const { getData, headerGroups } = sheet;

  const rawData = await getData();
  const { exportableColumns, headers } = getHeaderData(headerGroups);
  const rows = getRowData({ columns: exportableColumns, rows: rawData });

  return [...headers, ...rows];
};

const useExcelDownload = ({ fileName, sheets }: useExcelProps) => {
  const workbook = excel.book_new();

  const [status, setStatus] = useState<Status>(IDLE);

  const download = async () => {
    setStatus(LOADING);

    try {
      for (const sheet of sheets) {
        const sheetData = await prepareSheet(sheet);
        const excelSheet = excel.aoa_to_sheet(sheetData);

        excel.book_append_sheet(workbook, excelSheet, sheet.sheetName);
      }

      writeFile(workbook, `${fileName}.xlsx`);
    } catch (error) {
      console.log(error);
      setStatus(ERROR);
    }

    setStatus(IDLE);
  };

  return {
    download,
    status,
  };
};

export default useExcelDownload;
