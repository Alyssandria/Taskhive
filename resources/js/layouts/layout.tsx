import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { ComponentProps } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/components/ui/search-icon"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePage } from "@inertiajs/react"
import { SharedData } from "@/types"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PlusSquare } from "lucide-react"
import { PopupIcon } from "@/components/ui/popup-icon"

export default function Layout({ children }: ComponentProps<"div">) {
    const { auth } = usePage<SharedData>().props;
    return (
        <SidebarProvider className="relative">
            <AppSidebar />
            <div className="relative flex w-full flex-col lg:h-screen lg:overflow-hidden">
                <header className="flex items-center justify-between p-4 px-10">
                    <div className="flex w-1/2 items-center gap-6">
                        <SidebarTrigger />
                        <form className="w-full">
                            <label className="relative" htmlFor="search">
                                <span className="sr-only">Search for anything</span>
                                <SearchIcon id={'search'} className="absolute top-1/2 left-4 size-5 -translate-y-1/2" />
                                <Input className="rounded-full p-6 pl-12 placeholder:text-lg" placeholder="Search for anything..." />
                            </label>
                            <Button type="submit" className="sr-only">
                                Submit
                            </Button>
                        </form>
                    </div>
                    <div className="flex items-center gap-4">
                        <div>
                            <span className="block font-bold">{`${auth.user.first_name} ${auth.user.last_name}`}</span>
                            <span className="block text-right text-muted-foreground">{`Manager`}</span>
                        </div>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </header>
                <main className="size-full p-4 bg-gray-100 rounded-[35px]">{children}</main>
                <Popover>
                    <PopoverTrigger className="absolute cursor-pointer border bg-white shadow-2xl size-10 rounded-full right-20 bottom-10 z-30">
                        <PopupIcon />
                    </PopoverTrigger>
                    <PopoverContent side="left" asChild>
                        <Button className="text-lg z-30 flex p-6 bg-blue-500 w-fit hover:bg-blue-600 text-white rounded-full self-start  items-center justify-start">
                            <PlusSquare />
                            New Task
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>
        </SidebarProvider>
    );
}
