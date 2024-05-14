import axios from "axios";

import { Lead } from "@/src/Leads/Types/Lead";
import { Link, router } from "@inertiajs/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@cms/Components/ui/button";
import { toast } from "@cms/Components/ui/use-toast";
import { DataTableColumnHeader } from "@cms/Components/datatable/DataTableColumnHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cms/Components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@cms/Components/ui/alert-dialog";

export const columns: ColumnDef<Lead>[] = [
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data de captura" />
        ),
        cell: ({ row }) => {
            return new Intl.DateTimeFormat("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
            }).format(row.getValue("createdAt"))
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nome" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="E-mail" />
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Telefone" />
        ),
        cell: ({ row }) => {
            return `+${row.getValue("phone")}`
        }
    },
    {
        accessorKey: "origin",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Origem" />
        ),
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