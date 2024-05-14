import { Post } from "./Post";

export type Description = {
    id: number;
    title?: string;
    image?: string;
    old_image?: string;
    url?: string;
    text?: Array<any>;
    order: number;
    post_id: number;
    post: Post;
}
