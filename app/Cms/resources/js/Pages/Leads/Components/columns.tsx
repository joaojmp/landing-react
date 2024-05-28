import axios from "axios";

import { Lead } from "@/src/Leads/Types/Lead";
import { Link, router } from "@inertiajs/react";
import { FaEye, FaTrash } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@cms/Components/ui/button";
import { toast } from "@cms/Components/ui/use-toast";
import { DataTableColumnHeader } from "@cms/Components/datatable/DataTableColumnHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cms/Components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@cms/Components/ui/alert-dialog";

export const columns: ColumnDef<Lead>[] = [
    {
        accessorKey: "landing_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Página" />
        ),
        cell: ({ row }: any) => {
            return row.original.landing.title;
        }
    },
    {
        accessorKey: "data",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Campo 1" />
        ),
        cell: ({ row }: any) => {
            const lead = row.original;

            return Object.values(lead.data)[0] ?? "";
        }
    },
    {
        accessorKey: "data",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Campo 2" />
        ),
        cell: ({ row }: any) => {
            const lead = row.original;

            return Object.values(lead.data)[1] ?? "";
        }
    },
    {
        accessorKey: "data",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Campo 3" />
        ),
        cell: ({ row }: any) => {
            const lead = row.original;

            return Object.values(lead.data)[2] ?? "";
        }
    },
    {
        id: "actions",
        cell: ({ row, ...props }: any) => {
            const lead = row.original;

            const remove = () => {
                axios.delete(route('api.leads.destroy', { 'id': lead.id }), {
                    headers: {
                        'Authorization': `Bearer ${props.user.api_token}`,
                    }
                }).then(() => {
                    router.visit(route("leads.index"), {
                        only: ['objects'],
                        onSuccess: () => {
                            toast({
                                title: "Sucesso.",
                                description: "Lead removido com sucesso!",
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
                                    <Link href={route("leads.edit", { "id": lead.id })}>
                                        <FaEye />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Ver dados</p>
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
                                    <p>Remover dados</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Essa ação não pode ser desfeita, isso excluirá permanentemente o lead
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