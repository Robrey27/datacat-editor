import { TablePaginationProps } from "@mui/material";
import { Pagination } from "./usePagination";
import { ChangeEvent } from "react";

type UsePagingOptions = {
    totalElements?: number,
    pagination: Pagination,
}

export default function usePaging(options: UsePagingOptions): Omit<TablePaginationProps<'td'>, 'component'> {
    const {
        totalElements,
        pagination: {
            pageNumber: [pageNumber, setPageNumber],
            pageSize: [pageSize, setPageSize]
        }
    } = options;

    return {
        count: totalElements ?? 0,
        page: totalElements ? pageNumber : 0,
        labelRowsPerPage: "Anzahl:",
        rowsPerPage: pageSize,
        rowsPerPageOptions: [10, 25, 50, 100],
        onRowsPerPageChange: (e: ChangeEvent<HTMLInputElement>) => setPageSize(parseInt(e.target.value, 10)),
        onPageChange: (e: unknown, num: number) => setPageNumber(num)
    };
};

