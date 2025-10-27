import { DashboardCard } from "@/components/dashboard-card"
import { TasksDataTable } from "@/components/tables/tasks-data-table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { MemberDashboardData, SharedData, Task } from "@/types"
import { usePage } from "@inertiajs/react"
import { useState } from "react"

type MemberDashboardProps<T extends Task> = {
    data: MemberDashboardData<T>
}
export const MemberDashboard = <T extends Task>({ data }: MemberDashboardProps<T>) => {
    const [taskData, setTaskData] = useState<T[]>(data.tables.data);
    const { auth } = usePage<SharedData>().props;
    const formattedData = {
        cards: [
            {
                label: "Uncompleted Tasks",
                value: data.cards.uncompletedTasks,
                className: "",
            },
            {
                label: "Projects",
                value: data.cards.projects,
                className: "",
            },
            {
                label: "Teams",
                value: data.cards.teams,
                className: "",
            }
        ]
    }

    return (
        <div className="flex flex-col justify-around size-full">
            <div className="flex flex-col gap-8 w-full">
                <div>
                    <h2 className="block text-4xl font-bold">{`Welcome Back, ${auth.user.first_name}`}</h2>
                    <p className="text-muted-foreground">Track manage and forecast your tasks</p>
                </div>

                <div className="w-full flex justify-around gap-8">
                    {formattedData.cards.map(el => {
                        return (
                            <DashboardCard className="flex-1 flex gap-2 items-center">
                                <div className="space-y-6">
                                    <span className="block text-muted-foreground">{el.label}</span>
                                    <span className="block font-bold text-xl">{el.value}</span>
                                </div>
                            </DashboardCard>
                        )
                    })}
                </div>
            </div>
            <ScrollArea className="h-60 overflow-y-auto">
                <div className="w-52 md:w-96 lg:w-full">
                    <TasksDataTable data={taskData} />
                </div>
            </ScrollArea>
        </div>
    )
}
