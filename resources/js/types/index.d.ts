export interface Auth {
    user: User;
    roles: Role[];
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

export type RoleSlugs = 'admin' | 'manager' | 'member';

export interface Role {
    id: number;
    name: string;
    slug: string;
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
    users: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        avatar?: string;
    }[],
    status: Status,
    project_id: number;
}

export interface Status {
    id: number;
    name: string;
    description: string;
    slug: string;
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
