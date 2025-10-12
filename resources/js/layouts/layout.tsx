import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { ComponentProps } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/components/ui/search-icon"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePage } from "@inertiajs/react"
import { SharedData } from "@/types"

export default function Layout({ children }: ComponentProps<"div">) {
    const { auth } = usePage<SharedData>().props;
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
                <header className="flex items-center justify-between p-4">
                    <div className="flex items-center w-1/2 gap-6">
                        <SidebarTrigger />
                        <form className="w-full">
                            <label className="relative" htmlFor="search">
                                <span className="sr-only">Search for anything</span>
                                <SearchIcon id={"search"} className="absolute left-4 top-1/2 size-5 -translate-y-1/2" />
                                <Input
                                    className="p-6 pl-12 placeholder:text-lg rounded-full"
                                    placeholder="Search for anything..."
                                />
                            </label>
                            <Button type="submit" className="sr-only">Submit</Button>
                        </form>
                    </div>
                    <div className="flex gap-4 items-center">
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
                <main>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
