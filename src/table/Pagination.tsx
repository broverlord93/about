import {
  Pagination as _Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { FC, useMemo } from "react";

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

const Pagination: FC<PaginationProps> = ({
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
}) => {
  const pageOptions = useMemo(() => {
    const options = new Array<{ label: string; value: number }>(getPageCount());

    for (let i = 0; i < options.length; i++) {
      options[i] = {
        label: `${i + 1}`,
        value: i,
      };
    }

    return options;
  }, [getPageCount]);

  const pageSizeOptions = useMemo(() => {
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
  }, [defaultPageSize, getRowCount]);

  return (
    <_Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink onClick={firstPage}>First</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={!getCanPreviousPage()}
            onClick={previousPage}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-disabled={!getCanNextPage()}
            onClick={nextPage}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={lastPage}>Last</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <Select
            onValueChange={(value) => {
              setPageIndex(parseInt(value));
            }}
            value={`${getPageIndex()}`}
          >
            <SelectTrigger className={"border-none hover:bg-husk-100"}>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {pageOptions.map(({ label, value }) => {
                  return <SelectItem value={`${value}`}>{label}</SelectItem>;
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </PaginationItem>
        <PaginationItem>
          <Select
            onValueChange={(value) => {
              setPageSize(parseInt(value));
            }}
          >
            <SelectTrigger className={"border-none hover:bg-husk-100"}>
              <SelectValue placeholder={`${getPageSize()}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {pageSizeOptions.map(({ label, value }) => {
                  return <SelectItem value={`${value}`}>{label}</SelectItem>;
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </PaginationItem>
      </PaginationContent>
    </_Pagination>
  );
};

export default Pagination;
