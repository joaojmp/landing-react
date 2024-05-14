export type CustomLink = {
    id: number;
    active: boolean;
    type: number | '';
    title: string;
    value: string;
    icon?: number | '';
    image?: string;
    old_image?: string;
    order: number;
}