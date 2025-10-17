import { Role, RoleSlugs } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const ROLE_HEIRARCHY : RoleSlugs[] = ['admin', 'manager', 'member'];

export function formatDate(date: string) {
    const _date = new Date(date.replace(' ', 'T'));
    const now = new Date();
    const tommorow = new Date(now);
    tommorow.setDate(now.getDate() + 1)

    const isTommorow =
        _date.getDate() === tommorow.getDate() &&
        _date.getMonth() === tommorow.getMonth() &&
        _date.getFullYear() === tommorow.getFullYear()

    if (isTommorow) {
        return "Tomorrow";
    }

    const sameMonth = _date.getMonth() === now.getMonth();
    const dayName = _date.toLocaleString("en-US", { weekday: "short" });
    const monthName = _date.toLocaleString("en-US", { month: "short" });

    const day = _date.getDate();

    if (sameMonth) {
        return `${dayName} ${day}`;
    }

    return `${monthName} ${day} ${_date.getFullYear()}`;
}

export const getHighestRole = (roles: Role[]) : RoleSlugs | null => {
    for (const roleName of ROLE_HEIRARCHY) {
        if(roles.find(role => role.slug === roleName)) {
            return roleName;
        }
    }
    return null;
}

export const formatCase = (str: string) => {
    const _s = str.split(' ');

    if(!_s.length){
        return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`
    }

    return _s.map(s => `${s.charAt(0).toUpperCase()}${s.slice(1).toLowerCase()}`).join(' ');
}
