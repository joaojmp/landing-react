import { Subject } from "./Subject";
import { PostImage } from "./Image";
import { Description } from "./Description";

export type Post = {
    id: number;
    slug: string;
    title: string;
    short_description?: string;
    source?: string;
    image: string;
    old_image?: string;
    date: Date;
    subject_id: number;
    order: number;
    subject: Subject;
    descriptions?: Description[];
    images?: PostImage[];
}
