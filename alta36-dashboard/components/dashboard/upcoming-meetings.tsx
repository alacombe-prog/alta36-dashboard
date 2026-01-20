"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video } from "lucide-react"

type Meeting = {
    id: string
    title: string
    with: string
    time: string
    type: string
}

const mockMeetings: Meeting[] = [
    { id: '1', title: 'Discovery Call', with: 'Acme Corp', time: '14:00 Today', type: 'Zoom' },
    { id: '2', title: 'Demo Presentation', with: 'GlobalSol', time: '10:00 Tomorrow', type: 'Google Meet' },
]

export function UpcomingMeetings() {
    return (
        <Card className="col-span-4 lg:col-span-2">
            <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockMeetings.map((meeting) => (
                        <div key={meeting.id} className="flex flex-col space-y-2 rounded-lg border p-3">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm">{meeting.title}</span>
                                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded flex items-center gap-1">
                                    <Video className="h-3 w-3" />
                                    {meeting.type}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">w/ {meeting.with}</span>
                                <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <Clock className="h-3 w-3" />
                                    {meeting.time}
                                </div>
                            </div>
                            <Button size="sm" variant="outline" className="w-full mt-2 h-7 text-xs">
                                Prepare Brief
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
