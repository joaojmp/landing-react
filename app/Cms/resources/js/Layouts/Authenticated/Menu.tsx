import { ReactNode } from "react";

import { RiPagesLine } from "react-icons/ri";
import { FaEnvelope, FaUsers } from "react-icons/fa";

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
        title: "Leads",
        link: route("leads.index"),
        icon: <FaEnvelope className="flex-none" />,
    },
    {
        title: "Usuários",
        link: route("users.index"),
        icon: <FaUsers className="flex-none" />,
    },
];