import { Pagination, PaginationContent } from "@components/ui/pagination";

interface PaginationProps {
  firstPage: () => void;
  lastPage: () => void;
  nextPage: () => void;
  previousPage: () => void;
  getCanNextPage: () => boolean;
  getCanPreviousPage: () => boolean;
  getPageCount: () => number;
  getPageIndex: () => number;
  getPageSize: () => number;
  getRowCount: () => number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  defaultPageSize?: number;
  tableName?: string;
}

const getPages = (count: number) => {
  const array = [];

  for (let i = 0; i < count; i++) {
    array.push(i);
  }

  return array;
};

const DefaultPagination = ({
  firstPage,
  nextPage,
  lastPage,
  previousPage,
  getCanNextPage,
  getCanPreviousPage,
  getPageCount,
  getPageIndex,
  getPageSize,
  getRowCount,
  setPageIndex,
  setPageSize,
  defaultPageSize = 20,
  variant = "primary",
}: PaginationProps) => {
  const getPageOptions = () => {
    const nextTen = getRowCount() + (10 - (getRowCount() % 10));
    const options = new Set([
      5,
      10,
      20,
      50,
      100,
      250,
      500,
      1000,
      nextTen,
      defaultPageSize,
    ]);

    return Array.from(options)
      .filter((value) => {
        return nextTen < defaultPageSize
          ? value <= defaultPageSize
          : value <= nextTen;
      })
      .sort((a, b) => a - b)
      .map((value) => ({ label: `${value}`, value }));
  };

  return (
    <Pagination>
      <PaginationContent></PaginationContent>
    </Pagination>
  );
};

export default DefaultPagination;
