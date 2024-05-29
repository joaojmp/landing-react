import { Landing } from "./Landing";

export type Page = {
    id: number;
    content?: string;
    html?: string;
    css?: string;
    js?: string;
    landing_id: number;
    landing: Landing;
}
