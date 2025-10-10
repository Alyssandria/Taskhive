export interface Auth {
    user: User;
    teams: {
        id: number,
        name: string,
        description: string,
        projects: {
            name: string,
            id: number
        }[],
    }[]
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
