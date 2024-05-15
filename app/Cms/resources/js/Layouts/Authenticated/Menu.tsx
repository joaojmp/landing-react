import { ReactNode } from "react";

import { FaUsers } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";

export type NavItem = {
    title: string;
    link?: string;
    icon: ReactNode;
    active?: boolean;
    alert?: boolean;
    subMenu?: NavItem[];
};

export const menu: NavItem[] = [
    {
        title: "Landings",
        link: route("landings.index"),
        icon: <RiPagesLine className="flex-none" />,
    },

    {
        title: "Usuários",
        link: route("users.index"),
        icon: <FaUsers className="flex-none" />,
    },
];