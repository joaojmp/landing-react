export type Lead = {
    id: number;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message?: string;
    origin: string;
    ip: string;
    created_at: Date;
}