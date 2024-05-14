import { useState } from "react";

import { MoreVertical } from "lucide-react";

import { cn } from "@cms/lib/utils";
import { Link } from "@inertiajs/react";
import { FaSpinner } from "react-icons/fa";
import { User } from "@/src/Users/Types/User";
import { Avatar, AvatarFallback, AvatarImage } from "@cms/Components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@cms/Components/ui/dropdown-menu";

import { menu } from "./Menu";
import SidebarItem from "./SidebarItem";
import { ExpandProps } from "./AuthenticatedLayout";

export default function Sidebar({ expanded, setExpanded, user }: { expanded: ExpandProps, setExpanded: ({ blocked, opened }: ExpandProps) => void, user: User }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            {isLoading && (
                <div className="fixed z-50 w-screen h-screen bg-background flex items-center justify-center">
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Carregando...
                </div>
            )}
            <aside
                onMouseEnter={() => !expanded.blocked && setExpanded({
                    blocked: expanded.blocked,
                    opened: true
                })}
                onMouseLeave={() => !expanded.blocked && setExpanded({
                    blocked: expanded.blocked,
                    opened: false
                })}
                className={cn({
                    "fixed z-10 h-screen transition-all bg-card": true,
                    "w-72": expanded.opened,
                    "w-20": !expanded.opened
                })}
            >
                <nav className="h-full flex flex-col border-r shadow-sm">
                    <div className="py-4 px-5 flex items-center border-b transition-all">
                        <Link href={route("cms.home")} className="transition-all font-bold m-auto block whitespace-nowrap">
                            {expanded.opened ? import.meta.env.VITE_APP_NAME : import.meta.env.VITE_APP_NAME.charAt(0)}
                        </Link>
                    </div>

                    <ul className="flex-1 px-3 py-2 overflow-x-hidden overflow-y-scroll scrollbar-hide">
                        {menu.map((item, index) => (
                            <SidebarItem key={index} {...item} expanded={expanded} />
                        ))}
                    </ul>

                    <div className="border-t flex p-4">
                        <Avatar>
                            {user.photo && <AvatarImage src={`/storage/users/${user.photo}` || ""} />}
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div
                            className={cn({
                                "flex justify-between items-center overflow-hidden transition-all": true,
                                "w-52 ml-3": expanded.opened,
                                "w-0": !expanded.opened
                            })}
                        >
                            <div className="leading-4">
                                <h4 className="font-semibold">
                                    {user.name}
                                </h4>
                                <span className="text-xs">
                                    {user.email}
                                </span>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="cursor-pointer">
                                    <MoreVertical />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuLabel>Opções:</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="cursor-pointer w-full" asChild>
                                            <Link href={route("users.edit", user.id)}>
                                                Meus dados
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer w-full" asChild>
                                            <Link href={route('cms.logout')} method="post" as="button" onClick={() => setIsLoading(true)}>
                                                Sair
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    )
}
