import { useState } from "react";

import { cn } from "@cms/lib/utils";
import { Link } from "@inertiajs/react";
import { FaChevronDown } from "react-icons/fa";

import { NavItem } from "./Menu";
import { ExpandProps } from "./AuthenticatedLayout";

export default function SidebarItem({ expanded, ...props }: { expanded: ExpandProps } & NavItem) {
    const [subMenu, setSubMenu] = useState(false);

    const toggleSubMenu = (e: any) => {
        if (props.subMenu && props.subMenu.length) {
            e.preventDefault();
        }

        setSubMenu(!subMenu);
    };

    return (
        <li>
            <Link
                href={props.link || "#"}
                className={cn({
                    "relative flex items-center py-2 px-3 my-1 font-medium transition-all": true,
                    "rounded-md cursor-pointer transition-colors group": true,
                    "bg-secondary": props.active,
                    "hover:bg-secondary": !props.active,
                    "justify-center": !expanded.opened,
                })}
                onClick={toggleSubMenu}
            >
                {props.icon}
                <span
                    className={cn({
                        "overflow-hidden transition-all whitespace-nowrap": true,
                        "w-52 ml-3": expanded.opened,
                        "w-0": !expanded.opened
                    })}
                >
                    {props.title}
                </span>
                {props.alert && (
                    <div
                        className={cn({
                            "absolute right-2 w-2 h-2 rounded bg-primary": true,
                            "top-2": !expanded.opened,
                        })}
                    />
                )}
                {props.subMenu && props.subMenu.length > 0 && (
                    <FaChevronDown
                        className={cn({
                            "absolute right-2 transition-all": true,
                            "rotate-180": subMenu,
                            "w-0": !expanded.opened
                        })}
                    />
                )}
            </Link>
            {props.subMenu && props.subMenu.length > 0 && (
                <ul
                    className={cn({
                        "transition-all overflow-hidden pl-5": true,
                        "max-h-60": subMenu && !expanded.opened,
                        "max-h-0": !subMenu || !expanded.opened,
                    })}
                >
                    {props.subMenu.map((item, index) => (
                        <SidebarItem key={index} {...item} expanded={expanded} />
                    ))}
                </ul>
            )}
        </li>
    )
}