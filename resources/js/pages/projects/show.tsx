import { TaskCard } from "@/components/task-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Project, Task, User } from "@/types";
import { Users } from "lucide-react";
import { ComponentProps } from "react";

type ShowProps = {
    server: {
        project: Project;
        tasks: Task[];
        users: User[];
    };
} & ComponentProps<'div'>;

export default function Show({ server }: ShowProps) {
    console.log(server);
    return (
        <div className="flex flex-col  gap-10 size-full">
            <section className="flex justify-between items-center">
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold">{server.project.name}</h1>
                    <div className="flex">
                        {server.users.slice(0, 5).map((user, index) => {
                            return (
                                <Avatar className="-ml-2 size-10 border-3 border-white" key={user.id}>
                                    <AvatarImage src={user.avatar} />
                                    {
                                        index === 4 ?
                                            <AvatarFallback className="text-sm">{`+${server.users.length - 4}`}</AvatarFallback>
                                            :
                                            <AvatarFallback className="text-sm">{`${user.first_name[0].toUpperCase()} ${user.last_name[0].toUpperCase()}`}</AvatarFallback>
                                    }
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

            <section className="flex h-80 justify-between gap-12 overflow-hidden">
                <div className="size-full flex flex-col gap-4">
                    <div className="flex gap-2 border-b-3 border-black py-4 items-center w-1/2">
                        <span>Tasks</span>
                        <div className="px-2 text-xs flex items-center justify-center rounded-full border">{server.tasks.length}</div>
                    </div>
                    <div className="grid grid-cols-3 h-full gap-4 overflow-y-auto">
                        {server.tasks.map(el => {
                            return (
                                <TaskCard task={el} key={el.id} />
                            )
                        })}

                    </div>
                </div>
                <div className="w-3/5 h-full flex flex-col">
                    <div className="flex gap-2 border-b-3 border-green-400 py-4 items-center">
                        <span>Completed</span>
                        <div className="px-2 text-xs flex items-center justify-center rounded-full border">{server.tasks.filter(task => task.status.slug === 'completed').length}</div>
                    </div>
                    <div className="grid gap-4 overflow-y-scroll">
                        {server.tasks.map(el => {
                            return (
                                <TaskCard task={el} key={el.id} />
                            )
                        })}

                    </div>
                </div>
            </section>
        </div>
    );
}
