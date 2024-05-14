export type User = {
    id: number;
    photo?: string;
    old_photo?: string;
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
    api_token?: string;
}