import { Page } from "./Page";
import { Lead } from "./Lead";

export type Landing = {
    id: number;
    slug: string;
    title: string;
    description?: string;
    image?: string;
    favicon?: string;
    emails?: string[];
    script_head?: string;
    script_body?: string;
    pages: Page[];
    leads: Lead[];
}
