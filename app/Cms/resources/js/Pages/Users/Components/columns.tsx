import axios from "axios";

import { User } from "@/src/Users/Types/User";
import { Link, router } from "@inertiajs/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@cms/Components/ui/button";
import { toast } from "@cms/Components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@cms/Components/ui/avatar";
import { DataTableColumnHeader } from "@cms/Components/datatable/DataTableColumnHeader";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@cms/Components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@cms/Components/ui/alert-dialog";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "photo",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Foto" />
        ),
        cell: ({ row }) => {
            const user = row.original;

            return (
                <Avatar>
                    {user.photo && <AvatarImage src={`/storage/users/${user.photo}` || ""} />}
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
            );
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
        id: "actions",
        cell: ({ row, ...props }: any) => {
            const user = row.original;

            const remove = () => {
                axios.delete(route('api.users.destroy', { 'id': user.id }), {
                    headers: {
                        'Authorization': `Bearer ${props.user.api_token}`,
                    }
                }).then(() => {
                    router.visit(route("users.index"), {
                        only: ['objects'],
                        onSuccess: () => {
                            toast({
                                title: "Sucesso.",
                                description: "Usuário removido com sucesso!",
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
                                    <Link href={route("users.edit", { "id": user.id })}>
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
                                        <Button type="button" variant="ghost" disabled={props.user.id === user.id}>
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
                                    Essa ação não pode ser desfeita, isso excluirá permanentemente o usuário
                                    e removerá seus dados de nossos servidores.
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