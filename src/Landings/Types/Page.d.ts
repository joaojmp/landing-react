import { Landing } from "./Landing";

export type Page = {
    id: number;
    name: string;
    html?: string;
    css?: string;
    js?: string;
    order: number;
    landing_id: number;
    landing: Landing;
}
