import { useMemo } from "react"
import { DataTable } from "../ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Task, User } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui/button"
import { PenIcon, Trash2Icon } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"

type TasksDataTableProps = {
    data: Task[]
}
export const TasksDataTable = ({ data }: TasksDataTableProps) => {

    const columns = useMemo(() => {
        const cols: ColumnDef<Task>[] = [
            {
                header: 'Task',
                accessorKey: 'title',
            },
            {
                header: 'Status',
                accessorKey: 'status.name',
            },
            {
                header: 'Users',
                accessorKey: 'users',
                cell: ({ getValue }) => {
                    const users = getValue() as User[]
                    return (
                        <div className="flex">{
                            users.slice(0, 6).map((user, idx) => (
                                <Avatar key={idx}>
                                    {idx === 5 ? (
                                        <AvatarFallback>{`+${users.length - 5}`}</AvatarFallback>
                                    ) :
                                        (
                                            <>
                                                <AvatarImage src={user.avatar} alt="user avatar" />
                                                <AvatarFallback>{`${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`}</AvatarFallback>
                                            </>
                                        )

                                    }
                                </Avatar>
                            ))
                        }
                        </div >
                    )
                }
            },
            {
                header: 'About',
                accessorKey: 'description',
                cell: ({ getValue }) => {
                    const value = getValue() as string;
                    return (
                        <span className="block max-w-[80px] truncate text-muted-foreground">{value}</span>
                    )

                }
            },
            {
                id: 'actions',
                cell: ({ row }) => {
                    const id = row.original.id;
                    return (
                        <ButtonGroup className="flex justify-end w-full">
                            <Button variant={"outline"}><Trash2Icon /></Button>
                            <Button variant={"outline"}><PenIcon /></Button>
                        </ButtonGroup>

                    )
                }
            }
        ]
        return cols;
    }, []);

    return (
        <DataTable columns={columns} data={data} />
    )
}
