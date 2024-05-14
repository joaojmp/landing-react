import { useState } from "react";

import { MoreVertical } from "lucide-react";

import { cn } from "@cms/lib/utils";
import { Link } from "@inertiajs/react";
import { User } from "@/src/Users/Types/User";
import { Button } from "@cms/Components/ui/button";
import ModeToggle from "@cms/Components/ModeToggle";
import { FaChevronLeft, FaSitemap, FaSpinner } from "react-icons/fa";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@cms/Components/ui/dropdown-menu";

import { ExpandProps } from "./AuthenticatedLayout";

export default function Topbar({ expanded, setExpanded, user }: { expanded: ExpandProps, setExpanded: ({ blocked, opened }: ExpandProps) => void, user: User }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <>
            {isLoading && (
                <div className="fixed z-50 w-screen h-screen bg-background flex items-center justify-center">
                    <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Carregando...
                </div>
            )}
            <nav className={cn({
                "fixed z-10 p-3 border-b flex items-center justify-between transition-all bg-card": true,
                "w-[calc(100%_-_18rem)] ms-72": expanded.opened,
                "w-[calc(100%_-_5rem)] ms-20": !expanded.opened
            })}>
                <FaChevronLeft
                    className={cn({
                        "transition-all cursor-pointer": true,
                        "flip-y": !expanded.opened
                    })}
                    onClick={() => setExpanded({
                        blocked: !expanded.blocked,
                        opened: !expanded.opened
                    })}
                />
                <div className="flex items-center gap-5">
                    <Button type="button" variant="secondary" className="d-flex gap-2 max-h-8" asChild>
                        <a href="/" target="_blank" rel="noopener noreferrer">
                            <FaSitemap /> Site
                        </a>
                    </Button>
                    <ModeToggle />
                    {!expanded.opened && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="cursor-pointer">
                                <MoreVertical />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
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
                    )}
                </div>
            </nav>
        </>
    );
};