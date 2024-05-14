import { ReactNode } from "react";

import { PiTextT } from "react-icons/pi";
import { SiPagespeedinsights } from "react-icons/si";
import { FaBlog, FaBook, FaCode, FaCog, FaCogs, FaEdit, FaEnvelope, FaImages, FaLink, FaMapSigns, FaNewspaper, FaUsers, FaWhatsapp } from "react-icons/fa";

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
        title: "Banners",
        link: route("banners.index"),
        icon: <FaImages className="flex-none" />,
    },
    {
        title: "Blog",
        icon: <FaBlog className="flex-none" />,
        subMenu: [
            {
                title: "Assuntos",
                link: route("subjects.index"),
                icon: <PiTextT className="flex-none" />,
            },
            {
                title: "Publicações",
                link: route("posts.index"),
                icon: <FaNewspaper className="flex-none" />,
            }
        ]
    },
    {
        title: "Leads",
        link: route("leads.index"),
        icon: <FaEnvelope className="flex-none" />,
    },
    {
        title: "Árvore de Links",
        icon: <FaMapSigns className="flex-none" />,
        subMenu: [
            {
                title: "Estilos & Logo",
                link: route("links.configs.index"),
                icon: <FaEdit className="flex-none" />,
            },
            {
                title: "Meus Links",
                link: route("links.index"),
                icon: <FaLink className="flex-none" />,
            }
        ]
    },
    {
        title: "Páginas",
        link: route("pages.index"),
        icon: <SiPagespeedinsights className="flex-none" />,
    },
    {
        title: "Políticas",
        link: route("policies.index"),
        icon: <FaBook className="flex-none" />,
    },
    {
        title: "Usuários",
        link: route("users.index"),
        icon: <FaUsers className="flex-none" />,
    },
    {
        title: "Configurações",
        icon: <FaCogs className="flex-none" />,
        subMenu: [
            {
                title: "Gerais",
                link: route("configs.index"),
                icon: <FaCog className="flex-none" />,
            },
            {
                title: "Whatsapp",
                link: route("configs.whatsapp.index"),
                icon: <FaWhatsapp className="flex-none" />,
            },
            {
                title: "Scripts",
                link: route("configs.scripts.index"),
                icon: <FaCode className="flex-none" />,
            }
        ]
    }
];