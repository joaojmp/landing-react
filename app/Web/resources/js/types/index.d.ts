import { Page } from "@/src/Pages/Types/Page";
import { Config } from "@/src/Configs/Types/Config";
import { Policy } from "@/src/Policies/Types/Policy";

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    configs: Config[],
    policies: Policy[],
    footer: {
        policies: Policy[],
    },
    page: Page
};

export type Pagination = {
    "current_page": number,
    "first_page_url": string,
    "from": number,
    "last_page": number,
    "last_page_url": string,
    "next_page_url": string,
    "path": string,
    "per_page": number,
    "prev_page_url": string,
    "to": number,
    "total": number,
    "links": Array<any>,
}