import { useMemo } from "react"
import { DataTable } from "../ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Task, User } from "@/types"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ButtonGroup } from "../ui/button-group"
import { Button } from "../ui/button"
import { ArrowDown, ArrowUp, PenIcon, Trash2Icon } from "lucide-react"
import { Checkbox } from "../ui/checkbox"

type TasksDataTableProps = {
    data: Task[]
}
export const TasksDataTable = ({ data }: TasksDataTableProps) => {

    const columns = useMemo(() => {
        const cols: ColumnDef<Task>[] = [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="select-all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="select-all"
                    />

                ),
                enableSorting: false,
                enableHiding: false
            },
            {
                header: ({ column }) => (
                    <Button
                        className="pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        variant={"ghost"}
                    >
                        Task
                        {column.getIsSorted() === "asc" && <ArrowUp />}
                        {column.getIsSorted() === "desc" && <ArrowDown />}
                    </Button>
                ),


                accessorKey: 'title',
            },
            {
                accessorKey: 'status.name',
                header: ({ column }) => (
                    <Button
                        className="pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        variant={"ghost"}
                    >
                        Status
                        {column.getIsSorted() === "asc" && <ArrowUp />}
                        {column.getIsSorted() === "desc" && <ArrowDown />}
                    </Button>
                ),
            },
            {
                header: ({ column }) => (
                    <Button
                        className="pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        variant={"ghost"}
                    >
                        Users
                        {column.getIsSorted() === "asc" && <ArrowUp />}
                        {column.getIsSorted() === "desc" && <ArrowDown />}
                    </Button>
                ),
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
                header: ({ column }) => (
                    <Button
                        className="pl-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        variant={"ghost"}
                    >
                        About
                        {column.getIsSorted() === "asc" && <ArrowUp />}
                        {column.getIsSorted() === "desc" && <ArrowDown />}
                    </Button>
                ),
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
