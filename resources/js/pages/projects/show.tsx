import { TaskCard } from "@/components/task-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Project, Task, User } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import { Users } from "lucide-react";
import { ComponentProps } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type ShowProps = {
    server: {
        project: Project;
        tasks: Task[],
        users: User[];
        team: {
            id: number;
            name: string;
        };
    };
} & ComponentProps<'div'>;

export default function Show({ server }: ShowProps) {
    console.log(server);
    return (
        <div className="flex size-full flex-col justify-between gap-8 p-10">
            <section className="flex items-center justify-between">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={`/team/${server.team.id}`}>{server.team.name}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{server.project.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <h1 className="text-4xl font-bold">{server.project.name}</h1>
                        <span className="block text-muted-foreground">{server.project.description}</span>
                    </div>
                    <div className="flex">
                        {server.users.slice(0, 5).map((user, index) => {
                            return (
                                <Avatar className="-ml-2 size-10 border-3 border-white" key={user.id}>
                                    <AvatarImage src={user.avatar} />
                                    {index === 4 ? (
                                        <AvatarFallback className="text-sm">{`+${server.users.length - 4}`}</AvatarFallback>
                                    ) : (
                                        <AvatarFallback className="text-sm">{`${user.first_name[0].toUpperCase()} ${user.last_name[0].toUpperCase()}`}</AvatarFallback>
                                    )}
                                </Avatar>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <Button className="border bg-transparent text-black">
                        <Users />
                        <span>Share</span>
                    </Button>
                </div>
            </section>

            <section className="flex h-96 justify-between gap-12 overflow-hidden">
                <div className="flex size-full flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <span>Tasks</span>
                        <div className="flex items-center justify-center rounded-full border px-2 text-xs">{server.tasks.length}</div>
                    </div>
                    <Separator className="border-black border-b-3 md:w-2/5" />
                    <div className="flex h-full flex-wrap items-center justify-center gap-4 overflow-y-auto pr-6">
                        {server.tasks.map((el) => {
                            return <TaskCard task={el} key={el.id} className="transition-all ease-in  hover:scale-95 hover:shadow-2xl"/>;
                        })}
                    </div>
                </div>
                <div className="flex h-full flex-col gap-6 md:min-w-[250px]">
                    <div className="flex items-center gap-2 border-b-3 border-green-400 py-4">
                        <span>Completed</span>
                        <div className="flex items-center justify-center rounded-full border px-2 text-xs">
                            {server.tasks.filter((task) => task.status.slug === 'completed').length}
                        </div>
                    </div>
                    <div className="grid h-3/5 gap-4 overflow-y-scroll pr-6">
                        {server.tasks.map((el) => {
                            return <TaskCard task={el} key={el.id} />;
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
