import { ComponentType, FC, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";

import { useDrag, useDrop } from "react-dnd";

import { User } from "@/src/Users/Types/User";
import { flexRender } from "@tanstack/react-table";
import { TableCell, TableRow } from "@cms/Components/ui/table";

const DataTableDraggableRow: FC<{ row: any, reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void, user: User }> = ({ row, reorderRow, user }) => {
    const [, dropRef] = useDrop({
        accept: 'row',
        drop: (draggedRow: any) => reorderRow(draggedRow.index, row.index),
    });

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => row,
        type: 'row',
    });

    return (
        <TableRow ref={previewRef} style={{ opacity: isDragging ? 0.5 : 1 }} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell: {
                id: Key | null | undefined; column: {
                    id: string; columnDef: { cell: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | ComponentType<any> | null | undefined; };
                }; getContext: () => any;
            }) => cell.column.id === 'order' ? (
                <TableCell key={cell.id} ref={dropRef} className="text-center">
                    <button ref={dragRef}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </button>
                </TableCell>
            ) : (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, { ...cell.getContext(), user })}
                    </TableCell>
                )
            )}
        </TableRow>
    )
};

export default DataTableDraggableRow;