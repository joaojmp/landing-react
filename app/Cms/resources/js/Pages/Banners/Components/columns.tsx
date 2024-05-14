import axios from "axios";

import { Link, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@cms/Components/ui/button";
import { Banner } from "@/src/Banners/Types/Banner";
import { toast } from "@cms/Components/ui/use-toast";
import { FaArrowsAlt, FaEdit, FaTrash } from "react-icons/fa";
import { DataTableColumnHeader } from "@cms/Components/datatable/DataTableColumnHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cms/Components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@cms/Components/ui/alert-dialog";

export const columns: ColumnDef<Banner>[] = [
    {
        id: "order",
        cell: () => <FaArrowsAlt className="m-auto cursor-move" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Título" />
        ),
    },
    {
        id: "actions",
        cell: ({ row, ...props }: any) => {
            const banner = row.original;

            const remove = () => {
                axios.delete(route('api.banners.destroy', { 'id': banner.id }), {
                    headers: {
                        'Authorization': `Bearer ${props.user.api_token}`,
                    }
                }).then(() => {
                    router.visit(route("banners.index"), {
                        only: ['objects'],
                        onSuccess: () => {
                            toast({
                                title: "Sucesso.",
                                description: "Banner removido com sucesso!",
                            });
                        }
                    });
                }).catch((error) => {
                    toast({
                        title: "Ah! algo deu errado.",
                        description: error.response.data,
                    });
                });
            };

            return (
                <>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button type="button" variant="ghost" asChild>
                                    <Link href={route("banners.edit", { "id": banner.id })}>
                                        <FaEdit />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Editar registro</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <AlertDialog>
                        <TooltipProvider>
                            <Tooltip>
                                <AlertDialogTrigger asChild>
                                    <TooltipTrigger asChild>
                                        <Button type="button" variant="ghost">
                                            <FaTrash />
                                        </Button>
                                    </TooltipTrigger>
                                </AlertDialogTrigger>
                                <TooltipContent>
                                    <p>Remover registro</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Essa ação não pode ser desfeita, isso excluirá permanentemente o banner
                                    e removerá os dados de nossos servidores.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => remove()}>
                                    Continuar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )
        },
    },
];