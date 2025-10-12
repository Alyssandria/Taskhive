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

export default function Show({server} : ShowProps) {
    console.log(server);
    return (
        <div className="size-full ">
            <div className="flex justify-between items-center">
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
            </div>
        </div>
    );
}