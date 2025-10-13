import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

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
