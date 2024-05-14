import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getLocalISODateTime() {
    let actualDate = new Date().toLocaleString();
    let date = actualDate.split(", ")[0].split("/");
    let time = actualDate.split(", ")[1].split(":");

    return `${date[2]}-${date[1]}-${date[0]}T${time[0]}:${time[1]}`;
}