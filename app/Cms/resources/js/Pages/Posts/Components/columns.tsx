import axios from "axios";

import { Post } from "@/src/Posts/Types/Post";
import { Link, router } from "@inertiajs/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@cms/Components/ui/button";
import { toast } from "@cms/Components/ui/use-toast";
import { DataTableColumnHeader } from "@cms/Components/datatable/DataTableColumnHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cms/Components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@cms/Components/ui/alert-dialog";

export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Data" />
        ),
        cell: ({ row }) => {
            return new Intl.DateTimeFormat("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
            }).format(new Date(row.getValue("date")))
        }
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="título" />
        ),
    },
    {
        accessorKey: "subjectId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Assunto" />
        ),
        cell: ({ row }: any) => {
            return row.original.subject.title;
        }
    },
    {
        id: "actions",
        cell: ({ row, ...props }: any) => {
            const post = row.original;

            const remove = () => {
                axios.delete(route('api.posts.destroy', { 'id': post.id }), {
                    headers: {
                        'Authorization': `Bearer ${props.user.api_token}`,
                    }
                }).then(() => {
                    router.visit(route("posts.index"), {
                        only: ['objects'],
                        onSuccess: () => {
                            toast({
                                title: "Sucesso.",
                                description: "Publicação removida com sucesso!",
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
                                    <Link href={route("posts.edit", { "id": post.id })}>
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
                                    Essa ação não pode ser desfeita, isso excluirá permanentemente a publicação
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