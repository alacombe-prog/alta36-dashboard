"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Inbox, Trello, Calendar, Bot, Settings, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Inbox",
        href: "/inbox",
        icon: Inbox,
    },
    {
        title: "Pipeline",
        href: "/pipeline",
        icon: Trello,
    },
    {
        title: "Meetings",
        href: "/meetings",
        icon: Calendar,
    },
    {
        title: "AI Agent",
        href: "/agent",
        icon: Bot,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card text-card-foreground">
            <div className="flex h-16 items-center px-6 border-b">
                <div className="flex items-center gap-2 font-bold text-xl text-primary-500">
                    {/* Placeholder for Logo */}
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white">
                        A
                    </div>
                    <span>Alta 36</span>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid gap-1 px-2">
                    {sidebarItems.map((item, index) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary-500 text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="border-t p-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
