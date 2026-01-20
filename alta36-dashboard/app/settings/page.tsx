"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Check, X, AlertTriangle } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

            {/* Supabase */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Supabase Database
                        <Badge variant="success">Connected</Badge>
                    </CardTitle>
                    <CardDescription>Manage your database connection string and keys.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Project URL</label>
                        <div className="flex gap-2">
                            <Input value={process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xxx.supabase.co'} readOnly className="bg-muted text-muted-foreground" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Public API Key</label>
                        <div className="flex gap-2">
                            <Input value={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '•'.repeat(20) : 'Not configured'} readOnly className="bg-muted text-muted-foreground" />
                            <Button variant="outline">Test</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Anthropic / AI */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Claude API
                        <Badge variant="warning">Setup Required</Badge>
                    </CardTitle>
                    <CardDescription>Configure Anthropic API key for the AI agent.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">API Key</label>
                        <div className="flex gap-2">
                            <Input type="password" placeholder="sk-ant-..." className="font-mono" />
                            <Button>Save</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* PlusVibe */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        PlusVibe Integration
                        <Badge variant="secondary">Optional</Badge>
                    </CardTitle>
                    <CardDescription>Connect to PlusVibe MCP for prospecting actions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">MCP URL</label>
                        <Input placeholder="https://mcp.plusvibe.ai/..." />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
