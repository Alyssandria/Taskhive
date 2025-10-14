import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { SharedData } from "@/types"
import { Link, usePage } from "@inertiajs/react"
import { LogoIcon } from "./ui/logo";
import {  ChevronRight, HomeIcon, PlusSquareIcon, SquareCheck, Users } from "lucide-react";
import { Collapsible } from "./ui/collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

const navigation = [
    {
        icon: <HomeIcon />,
        label: "Home"
    },
    {
        icon: <SquareCheck />,
        label: "My Tasks"
    },
    {
        icon: <Users />,
        label: "Members"
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props
    const {url} = usePage();

    const isOpen = (team: {
        id: number,
        name: string,
        description: string,
        projects: {
            name: string,
            id: number
        }[]
    }
    ) => {
        return team.projects.some(el => url === `/project/${el.id}`);
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b p-4">
                <SidebarMenu className="flex flex-row">
                    <SidebarMenuButton>
                        <LogoIcon />
                        <span className="font-extrabold text-xl">TaskHive</span>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup className="border-b">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.map(el => {
                                return (
                                    <SidebarMenuItem key={el.label}>
                                        <SidebarMenuButton>
                                            <div>
                                                {el.icon}
                                            </div>
                                            <span>{el.label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="space-y-4">
                    <SidebarGroupLabel>Teams</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <PlusSquareIcon />
                    </SidebarGroupAction>
                    <SidebarMenu>
                        {auth.teams.map((team) => {
                            return (
                                <SidebarMenuItem className="bg-gray-100 rounded-sm group-data-[collapsible=icon]:rounded-tr-none rounded-br-none" key={team.id}>
                                    <Collapsible defaultOpen={isOpen(team)} className="truncate group/collapsible p-2 flex flex-col gap-4 w-full">
                                        <div className="cursor-pointer flex items-center gap-2">
                                            <div className="bg-orange-400 size-2 rounded-full" />
                                            <CollapsibleTrigger className="cursor-pointer flex w-full justify-between items-center">
                                                <span className="font-bold truncate">{team.name}</span>
                                                <ChevronRight className="size-4 ease-in transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                            </CollapsibleTrigger>
                                        </div>
                                        <CollapsibleContent>
                                            <SidebarMenuSub className="space-y-2">
                                                {team.projects.map((project) => {
                                                    return (
                                                        <SidebarMenuSubItem
                                                            className={cn(
                                                                'flex items-center gap-2 px-2 rounded-sm',
                                                                url === `/project/${project.id}` ? 'font-bold bg-gray-200' : 'bg-transparent font-normal',
                                                            )}
                                                            key={project.id}
                                                        >
                                                            <Link href={`project/${team.id}/${project.id}`} className="flex w-full items-center gap-2 truncate">
                                                                <div className="size-2 rounded-full bg-orange-400" />
                                                                <span className="block w-full truncate">{project.name}</span>
                                                            </Link>
                                                        </SidebarMenuSubItem>
                                                    );
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </SidebarMenuItem>
                            )

                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
