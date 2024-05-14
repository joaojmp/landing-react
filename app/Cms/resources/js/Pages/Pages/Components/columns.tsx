import axios from "axios";

import { Page } from "@/src/Pages/Types/Page";
import { Link, router } from "@inertiajs/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@cms/Components/ui/button";
import { toast } from "@cms/Components/ui/use-toast";
import { DataTableColumnHeader } from "@cms/Components/datatable/DataTableColumnHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cms/Components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@cms/Components/ui/alert-dialog";

export const columns: ColumnDef<Page>[] = [
    {
        accessorKey: "url",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Página" />
        ),
    },
    {
        id: "actions",
        cell: ({ row, ...props }: any) => {
            const page = row.original;

            const remove = () => {
                axios.delete(route('api.pages.destroy', { 'id': page.id }), {
                    headers: {
                        'Authorization': `Bearer ${props.user.api_token}`,
                    }
                }).then(() => {
                    router.visit(route("pages.index"), {
                        only: ['objects'],
                        onSuccess: () => {
                            toast({
                                title: "Sucesso.",
                                description: "Página removida com sucesso!",
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
                                    <Link href={route("pages.edit", { "id": page.id })}>
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
                                    Essa ação não pode ser desfeita, isso excluirá permanentemente a página
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