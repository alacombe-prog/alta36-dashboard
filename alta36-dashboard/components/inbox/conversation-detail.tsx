"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ReplyComposer } from "./reply-composer"

interface Message {
    id: string
    sender: 'prospect' | 'user'
    content: string
    timestamp: string
}

interface ProspectInfo {
    name: string
    company: string
    email: string
    campaign: string
    brief: string
}

interface ConversationDetailProps {
    conversationId: string
    prospect: ProspectInfo
    history: Message[]
}

export function ConversationDetail({ conversationId, prospect, history }: ConversationDetailProps) {
    return (
        <div className="flex flex-col h-full bg-background/50">
            {/* Header Info */}
            <div className="p-6 border-b bg-card">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold">{prospect.name}</h3>
                        <p className="text-sm text-primary-500">{prospect.company}</p>
                        <div className="text-xs text-muted-foreground mt-1 flex gap-2">
                            <span>{prospect.email}</span>
                            <span>•</span>
                            <span>{prospect.campaign}</span>
                        </div>
                    </div>
                    <Badge variant="outline">Brief: {prospect.brief}</Badge>
                </div>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {history.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-lg p-4 ${msg.sender === 'user'
                                ? 'bg-primary-500 text-primary-foreground rounded-tr-none'
                                : 'bg-card border rounded-tl-none shadow-sm'
                            }`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            <p className={`text-[10px] mt-2 text-right ${msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                {msg.timestamp}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Reply Area */}
            <div className="p-4 border-t bg-card h-64 sticky bottom-0">
                <ReplyComposer conversationId={conversationId} prospectName={prospect.name} />
            </div>
        </div>
    )
}
