import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { ComponentProps } from "react"

export default function Layout({ children }: ComponentProps<"div">) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <header className="md:h-[55px] flex items-center">
                    <SidebarTrigger />
                </header>
                {children}
            </main>
        </SidebarProvider>
    )
}
