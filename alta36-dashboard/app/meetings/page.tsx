"use client"

import { CalendarView } from "@/components/meetings/calendar-view"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function MeetingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Meeting
                </Button>
            </div>
            <CalendarView />
        </div>
    )
}
