"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Placeholder type definition suitable for UI dev before Supabase types are generated
type Reply = {
    id: string
    prospect_name: string
    company_name: string
    sentiment: 'positive' | 'neutral' | 'negative'
    received_at: string
}

const mockReplies: Reply[] = [
    { id: '1', prospect_name: 'Alice Dubois', company_name: 'TechFlow', sentiment: 'positive', received_at: '2m ago' },
    { id: '2', prospect_name: 'Jean Martin', company_name: 'BuildIt', sentiment: 'neutral', received_at: '15m ago' },
    { id: '3', prospect_name: 'Sarah Connor', company_name: 'Cyberdyne', sentiment: 'negative', received_at: '1h ago' },
]

export function RecentReplies() {
    return (
        <Card className="col-span-4 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Replies</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/inbox">
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockReplies.map((reply) => (
                        <div key={reply.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                                    {reply.prospect_name.charAt(0)}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{reply.prospect_name}</p>
                                    <p className="text-xs text-muted-foreground">{reply.company_name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge variant={
                                    reply.sentiment === 'positive' ? 'success' :
                                        reply.sentiment === 'negative' ? 'destructive' : 'secondary'
                                }>
                                    {reply.sentiment}
                                </Badge>
                                <div className="text-xs text-muted-foreground">{reply.received_at}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
