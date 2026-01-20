"use client"

import { Bell, Search } from "lucide-react"

export function Header() {
    return (
        <header className="flex h-16 items-center border-b bg-card px-6">
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search prospects..."
                        className="w-full rounded-lg bg-background pl-9 pr-4 py-2 text-sm outline-none ring-1 ring-border focus:ring-2 focus:ring-primary-500"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 hover:bg-muted transition-colors">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-500" />
                </button>
                <div className="h-8 w-8 rounded-full bg-primary-100 border border-primary-200" />
            </div>
        </header>
    )
}
