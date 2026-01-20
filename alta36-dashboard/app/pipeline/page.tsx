"use client"

import { KanbanBoard } from "@/components/pipeline/kanban-board"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function PipelinePage() {
    return (
        <div className="flex flex-col h-[calc(100vh-100px)]">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Pipeline</h1>
                <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Prospect
                </Button>
            </div>
            <div className="flex-1 overflow-auto">
                <KanbanBoard />
            </div>
        </div>
    )
}
