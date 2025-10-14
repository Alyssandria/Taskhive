import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Task } from "@/types"
import { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn, formatDate } from "@/lib/utils";
import { Calendar,  MessageCircleMore, } from "lucide-react";
import { Link } from "@inertiajs/react";

type TaskCardProps = {
    task: Task;
} & ComponentProps<"div">
export const TaskCard = ({ className, task, ...props }: TaskCardProps) => {
    return (
        <Link href={`/task/${task.id}`} className="block">
            <Card className={cn('relative z-10 flex max-w-[250px] flex-col justify-between gap-2 pt-4 pb-4 shadow', className)} {...props}>
                <div className="absolute -bottom-[5px] z-[-10] size-full rounded-2xl border-b" />
                <CardHeader>
                    <CardTitle className="text-xl font-bold">{task.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <CardDescription className="line-clamp-4 w-full">{task.description}</CardDescription>
                    <div className="flex self-end">
                        {task.users.slice(0, 5).map((user) => {
                            return (
                                <Avatar className="-ml-2 size-8 border-3 border-white" key={user.id}>
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="text-sm"></AvatarFallback>
                                </Avatar>
                            );
                        })}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t text-muted-foreground">
                    <div>
                        <MessageCircleMore className="size-4" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="size-4" />
                        <span className="block text-xs">{formatDate(task.due)}</span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
