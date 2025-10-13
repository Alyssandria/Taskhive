import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Task } from "@/types"
import { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatDate } from "@/lib/utils";
import { Calendar, Calendar1Icon, MessageCircleMore, SpeechIcon } from "lucide-react";

type TaskCardProps = {
    task: Task & {
        users: {
            avatar: string,
            email: string,
            id: number
        }[]
    };
} & ComponentProps<"div">
export const TaskCard = ({ task }: TaskCardProps) => {
    console.log(task);
    console.log(formatDate(task.due));
    return (
        <Card className="max-w-[250px] flex flex-col shadow justify-between gap-2 pt-4 pb-4">
            <CardHeader>
                <CardTitle className="font-bold">{task.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <CardDescription className="w-full line-clamp-4">{task.description}</CardDescription>
                <div className="">
                    {
                        task.users.slice(0, 5).map(user => {
                            return (
                                <Avatar className="-ml-2 size-8 border-3 border-white" key={user.id}>
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="text-sm"></AvatarFallback>
                                </Avatar>
                            )
                        })
                    }
                </div>
            </CardContent>
            <CardFooter className="border-t flex justify-between text-muted-foreground">
                <div>
                    <MessageCircleMore className="size-4" />
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span className="block text-xs">{formatDate(task.due)}</span>
                </div>
            </CardFooter>
        </Card >
    )
}
