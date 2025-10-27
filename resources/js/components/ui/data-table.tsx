import { cn } from "@/lib/utils";
import { ColumnDef, flexRender, getCoreRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { ComponentProps, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
} & ComponentProps<"div">
export const DataTable = <TData, TValue>(
    {
        columns,
        data,
        className,
        ...props
    }: DataTableProps<TData, TValue>

) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        columns,
        getCoreRowModel: getCoreRowModel(),
        data,
        manualSorting: true,
        state: { sorting },
        onSortingChange: setSorting
    });

    return (
        <div className={cn("overflow-hidden border  rounded-md ", className)} {...props}>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroups) => (
                        <TableRow key={headerGroups.id}>
                            {headerGroups.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                No Results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table >
        </div >
    )

}
