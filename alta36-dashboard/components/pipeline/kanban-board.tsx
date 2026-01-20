"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"

type Stage = 'New' | 'Replied' | 'Interested' | 'Meeting Booked' | 'Proposal' | 'Won' | 'Lost'

interface Prospect {
    id: string
    name: string
    company: string
    value: string
    stage: Stage
    source: string
}

const stages: Stage[] = ['New', 'Replied', 'Interested', 'Meeting Booked', 'Proposal', 'Won']

const mockProspects: Prospect[] = [
    { id: '1', name: 'Alice', company: 'TechFlow', value: '$2,000', stage: 'Replied', source: 'PlusVibe' },
    { id: '2', name: 'Bob', company: 'BuildCo', value: '$5,000', stage: 'Interested', source: 'Manual' },
    { id: '3', name: 'Carol', company: 'AeroDyn', value: '$10,000', stage: 'Meeting Booked', source: 'Calendar' },
    { id: '4', name: 'Dave', company: 'SoftSys', value: '$3,500', stage: 'New', source: 'PlusVibe' },
]

export function KanbanBoard() {
    return (
        <div className="flex h-full gap-4 overflow-x-auto pb-4">
            {stages.map((stage) => (
                <div key={stage} className="min-w-[280px] w-[280px] flex flex-col bg-secondary/30 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="font-semibold text-sm">{stage}</h3>
                        <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                            {mockProspects.filter(p => p.stage === stage).length}
                        </Badge>
                    </div>

                    <div className="flex-1 flex flex-col gap-3">
                        {mockProspects.filter(p => p.stage === stage).map((prospect) => (
                            <Card key={prospect.id} className="p-3 cursor-grab hover:shadow-card-hover transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-medium text-sm">{prospect.company}</span>
                                    <button className="text-muted-foreground hover:text-foreground">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="text-xs text-muted-foreground mb-3">{prospect.name}</div>
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-[10px] h-5 font-normal text-muted-foreground">
                                        {prospect.source}
                                    </Badge>
                                    <span className="text-sm font-semibold">{prospect.value}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
