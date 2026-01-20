"use client"

import { useState } from "react"
import { ConversationList } from "@/components/inbox/conversation-list"
import { ConversationDetail } from "@/components/inbox/conversation-detail"

// Mock Data
const mockConversations = [
    {
        id: '1',
        prospect: 'Alice Dubois',
        company: 'TechFlow',
        subject: 'Re: Automatisation prospection',
        preview: 'Cela semble intéressant, comment ça marche ?',
        time: '14:30',
        unread: true,
        sentiment: 'positive' as const
    },
    {
        id: '2',
        prospect: 'Jean Martin',
        company: 'BuildIt',
        subject: 'Re: Partenariats',
        preview: 'Je ne suis pas intéressé pour le moment.',
        time: 'Hier',
        unread: false,
        sentiment: 'negative' as const
    },
    {
        id: '3',
        prospect: 'Sarah Connor',
        company: 'Cyberdyne',
        subject: 'Re: Futur de l\'IA',
        preview: 'Pouvons-nous planifier un appel ?',
        time: 'Lundi',
        unread: false,
        sentiment: 'neutral' as const
    },
]

const mockHistory = [
    { id: '1', sender: 'user' as const, content: 'Bonjour Alice,\n\nJe vous contacte concernant...', timestamp: '10:00' },
    { id: '2', sender: 'prospect' as const, content: 'Bonjour,\n\nCela semble intéressant, comment ça marche exactement ?', timestamp: '14:30' },
]

const mockProspect = {
    name: 'Alice Dubois',
    company: 'TechFlow',
    email: 'alice@techflow.io',
    campaign: 'Outbound Q1',
    brief: 'Responsable Marketing, cherche solutions scale'
}

export default function InboxPage() {
    const [selectedId, setSelectedId] = useState<string | null>('1')

    return (
        <div className="flex h-[calc(100vh-100px)] rounded-xl border bg-card shadow-sm overflow-hidden">
            <div className="w-1/3 min-w-[300px] max-w-[400px]">
                <ConversationList
                    conversations={mockConversations}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />
            </div>
            <div className="flex-1">
                {selectedId ? (
                    <ConversationDetail
                        conversationId={selectedId}
                        prospect={mockProspect} // In real app, fetch based on selectedId
                        history={mockHistory}
                    />
                ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                        Select a conversation
                    </div>
                )}
            </div>
        </div>
    )
}
