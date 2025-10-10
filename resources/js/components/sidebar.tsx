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
    SidebarSeparator,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { SharedData } from "@/types"
import { usePage } from "@inertiajs/react"
import { LogoIcon } from "./ui/logo";
import { ChevronDown, ChevronRight, HomeIcon, PlusIcon, PlusSquareIcon, SquareCheck, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Collapsible } from "./ui/collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

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

    console.log(auth);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="border-b">
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
                                    <Collapsible className="truncate group/collapsible p-2 flex flex-col gap-4 w-full">
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
                                                        <SidebarMenuSubItem className="flex items-center gap-2" key={project.id}>
                                                            <div className="bg-orange-400 size-2 rounded-full" />
                                                            <span>{project.name}</span>
                                                        </SidebarMenuSubItem>
                                                    )
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
