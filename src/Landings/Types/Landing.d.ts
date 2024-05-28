import { Lead } from "../../Leads/Types/Lead";

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
    content?: string;
    html?: string;
    css?: string;
    js?: string;
    leads: Lead[];
}
