import { Post } from "./Post";

export type Subject = {
    id: number;
    title: string;
    order: number;
    posts: Post[];
}
