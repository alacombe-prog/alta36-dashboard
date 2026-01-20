"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Conversation = {
    id: string
    prospect: string
    company: string
    subject: string
    preview: string
    time: string
    unread: boolean
    sentiment: 'positive' | 'neutral' | 'negative'
}

interface ConversationListProps {
    conversations: Conversation[]
    selectedId: string | null
    onSelect: (id: string) => void
}

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
    return (
        <div className="flex flex-col h-full border-r">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Inbox</h2>
                <p className="text-sm text-muted-foreground">Recent replies</p>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                    <div
                        key={conv.id}
                        className={cn(
                            "flex flex-col gap-2 p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors",
                            selectedId === conv.id ? "bg-muted" : "bg-card",
                            conv.unread ? "border-l-4 border-l-primary-500 pl-[1.5rem]" : "pl-4"
                        )}
                        onClick={() => onSelect(conv.id)}
                    >
                        <div className="flex items-center justify-between">
                            <span className={cn("text-sm font-medium", conv.unread && "font-bold")}>
                                {conv.prospect}
                            </span>
                            <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>{conv.company}</span>
                            <Badge variant={
                                conv.sentiment === 'positive' ? 'success' :
                                    conv.sentiment === 'negative' ? 'destructive' : 'secondary'
                            } className="py-0 px-1 text-[10px] h-5">
                                {conv.sentiment}
                            </Badge>
                        </div>
                        <div className="text-sm font-medium truncate">{conv.subject}</div>
                        <div className="text-xs text-muted-foreground truncate">
                            {conv.preview}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
