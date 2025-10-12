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

export interface Project {
    id: number;
    name: string;
    description: string;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status_id: number;
    start: string;
    due: string;
    project_id: number;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
    created_at: string;
    updated_at: string;
}
