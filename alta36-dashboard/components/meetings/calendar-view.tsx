"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Clock, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

type Meeting = {
    id: string
    title: string
    prospect: string
    date: string
    time: string
    type: 'Discovery' | 'Demo' | 'Audit'
    status: 'Scheduled' | 'Completed' | 'Canceled'
}

const mockMeetings: Meeting[] = [
    { id: '1', title: 'Strategy Call', prospect: 'TechFlow', date: '2025-05-14', time: '14:00', type: 'Discovery', status: 'Scheduled' },
    { id: '2', title: 'Demo', prospect: 'BuildCo', date: '2025-05-15', time: '10:00', type: 'Demo', status: 'Scheduled' },
    { id: '3', title: 'Process Audit', prospect: 'Logistix', date: '2025-05-10', time: '16:00', type: 'Audit', status: 'Completed' },
]

export function CalendarView() {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Calendar Widget Placeholder - usually would use 'react-day-picker' */}
                <Card className="col-span-1 border-primary-100 bg-primary-50/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5" /> Calendar
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center text-muted-foreground bg-white/50 rounded-lg border border-dashed">
                            [Calendar Widget Mock]
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming List */}
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Upcoming Sessions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockMeetings.map(meeting => (
                                <div key={meeting.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-primary-100 text-primary-700 font-bold text-sm">
                                            <span>{meeting.date.split('-')[2]}</span>
                                            <span className="text-[10px] uppercase">May</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{meeting.title}</h4>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <Clock className="h-3 w-3" /> {meeting.time}
                                                <span>•</span>
                                                <Users className="h-3 w-3" /> {meeting.prospect}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                                        <Badge variant="outline">{meeting.type}</Badge>
                                        <Button size="sm" variant="secondary">
                                            <FileText className="mr-2 h-4 w-4" /> Prep
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
