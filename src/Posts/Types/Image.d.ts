import { Post } from "./Post";

export type PostImage = {
    id: number;
    name: string;
    old_name?: string;
    legend?: string;
    post_id: number;
    order: number;
    post: Post;
}