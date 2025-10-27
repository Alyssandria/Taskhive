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
    level: number;
    slug: string;
}

interface PaginationLinks {
    url: string | null
    label: string
    active: boolean
}

interface Paginated<T> {
    data: T[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
    links: PaginationLinks[]
}

export type AdminDashboardData = {
    cards: {
        totalProjects: number,
        totalTasks: number,
        totalTeams: number,
        totalUsers: number,
    },
    tables: {
        projects: {
            id: number,
            name: string,

            tasks: {
                total: number,
                completed: number
            }
            users: number,
            teams: number
        }[],
        teams: {
            id: number,
            name: string,
            projects_count: number,
            users_count: number
        }[],
    }
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

export type MemberDashboardData<T> = {
    cards: {
        uncompletedTasks: number,
        projects: number,
        teams: number
    },
    tables: Paginated<T>
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
