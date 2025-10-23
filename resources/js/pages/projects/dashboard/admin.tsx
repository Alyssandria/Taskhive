import { CompletionOverTime } from "@/components/charts/completion-over-time"
import { TaskPerStatus } from "@/components/charts/tasks-per-status"
import { DashboardCard } from "@/components/dashboard-card"
import { DashboardRow } from "@/components/dashboard-row"
import { DashboardSection } from "@/components/dashboard-section"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AdminDashboardData } from "@/types"
import { Briefcase, Flag, FolderPlus, Users } from "lucide-react"
import { useMemo } from "react"

type AdminDashboardProps = {
    data: AdminDashboardData
}
export const AdminDashboard = ({ data }: AdminDashboardProps) => {
    const formatData = useMemo(() => {
        return {
            cards: [
                {
                    icon: <Users className="size-5 text-[#16DBCC]" />,
                    label: "Total Users",
                    className: "",
                    iconBg: "bg-[#DCFAF8]",
                    value: data.cards.totalUsers
                },
                {
                    icon: <Briefcase className="size-5 text-[#F19EDC]" />,
                    label: "Total Teams",
                    className: "",
                    iconBg: "bg-[#FFE0EB]",
                    value: data.cards.totalTeams
                },
                {
                    icon: <FolderPlus className="size-5 text-[#396AFF]" />,
                    value: data.cards.totalProjects,
                    className: "",
                    iconBg: "bg-[#E7EDFF]",
                    label: "Total Projects",
                },
                {
                    icon: <Flag className="size-5 text-[#16DBCC]" />,
                    value: data.cards.totalTasks,
                    className: "",
                    iconBg: "bg-[#DCFAF8]",
                    label: "Total Tasks",
                },
            ],
        }
    }, [data]);

    return (
        <div className="size-full grid lg:grid-cols-4 gap-8">
            <DashboardSection title="Overview" className="col-span-full">
                <div className="flex flex-wrap gap-8 justify-between col-span-full">
                    {formatData.cards.map((el) => {
                        return (
                            <DashboardCard className="flex gap-2 items-center">
                                <div className={`size-10 flex items-center justify-center rounded-full ${el.iconBg}`}>
                                    {el.icon}
                                </div>
                                <div className="">
                                    <span className="block text-muted-foreground">{el.label}</span>
                                    <span className="block font-bold text-xl">{el.value}</span>
                                </div>
                            </DashboardCard>
                        )
                    })}
                </div>
            </DashboardSection>

            <DashboardSection title="Tasks completed over time" className="row-start-2 col-span-3">
                <CompletionOverTime />
            </DashboardSection>

            <DashboardSection title="Tasks per status" className="col-start-4 row-start-2">
                <TaskPerStatus />
            </DashboardSection>

            <DashboardSection title="Projects" className="row-start-3 col-span-full xl:col-span-2">
                <ScrollArea className=" max-h-[250px]">
                    <div className="flex flex-col gap-6">
                        {data.tables.projects.map((el, i) => {
                            return (
                                <DashboardRow key={el.id} className={i % 2 ? "bg-gray-200" : "bg-white"}>
                                    <DashboardRow.item>
                                        <DashboardRow.content>{el.name}</DashboardRow.content>
                                        <DashboardRow.label>Project</DashboardRow.label>
                                    </DashboardRow.item>
                                    <DashboardRow.item>
                                        <DashboardRow.content>{el.teams}</DashboardRow.content>
                                        <DashboardRow.label>Teams</DashboardRow.label>
                                    </DashboardRow.item>
                                    <DashboardRow.item>
                                        <DashboardRow.content>{el.users}</DashboardRow.content>
                                        <DashboardRow.label>Users</DashboardRow.label>
                                    </DashboardRow.item>
                                    <DashboardRow.item>
                                        <DashboardRow.content>{`${el.tasks.completed}/${el.tasks.total}`}</DashboardRow.content>
                                        <DashboardRow.label>Tasks</DashboardRow.label>
                                    </DashboardRow.item>
                                </DashboardRow>
                            )
                        })}
                    </div>
                </ScrollArea>
            </DashboardSection>

            <DashboardSection title="Teams" className="xl:col-start-3 col-span-full xl:col-span-2">
                <ScrollArea className=" max-h-[250px]">
                    <div className="flex flex-col gap-6">
                        {data.tables.teams.map((el, i) => {
                            return (
                                <DashboardRow key={el.id} className={i % 2 ? "bg-gray-200" : "bg-white"}>
                                    <DashboardRow.item>
                                        <DashboardRow.content>{el.name}</DashboardRow.content>
                                        <DashboardRow.label>Team</DashboardRow.label>
                                    </DashboardRow.item>
                                    <DashboardRow.item>
                                        <DashboardRow.content>{el.projects_count}</DashboardRow.content>
                                        <DashboardRow.label>Projects</DashboardRow.label>
                                    </DashboardRow.item>
                                    <DashboardRow.item>
                                        <DashboardRow.content>{el.users_count}</DashboardRow.content>
                                        <DashboardRow.label>Users</DashboardRow.label>
                                    </DashboardRow.item>
                                </DashboardRow>
                            )
                        })}
                    </div>
                </ScrollArea>
            </DashboardSection>
        </div >
    )
}
