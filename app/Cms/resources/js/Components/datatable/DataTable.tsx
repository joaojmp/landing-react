import { useState } from "react";

import axios from "axios";

import { router } from "@inertiajs/react";
import { User } from "@/src/Users/Types/User";
import { Input } from "@cms/Components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@cms/Components/ui/table";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";

import DataTableExport from "./DataTableExport";
import DataTableDraggableRow from "./DataTableDraggableRow";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    path?: string | undefined,
};

export function DataTable<TData, TValue>({ columns, data, path, user }: DataTableProps<TData, TValue> & { user: User }) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [loading, setLoading] = useState<boolean>(false);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    });

    const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
        setLoading(true);

        data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0] as any);

        axios.put(route(`api.${path}.reorder`), {
            ids: data.map((item: any) => item.id),
        }, {
            headers: {
                'Authorization': `Bearer ${user.api_token}`,
            }
        }).then(() => {
            router.visit(route(`${path}.index`), {
                only: ['objects'],
            });
        });
    }

    return (
        <>
            <div className="flex items-center justify-between pb-4">
                <DataTableExport fileData={data} />
                <Input placeholder="Pesquisar..." onChange={(event) => table.setGlobalFilter(event.target.value)} className="max-w-sm" />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">Carregando...</TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => <DataTableDraggableRow key={row.id} row={row} reorderRow={reorderRow} user={user} />)
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="p-3 text-center">
                                    Nenhum registro encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-4">
                <DataTablePagination table={table} />
            </div>
        </>
    )
}