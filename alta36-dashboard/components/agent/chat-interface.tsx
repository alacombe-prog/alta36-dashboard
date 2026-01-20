"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: 'Bonjour ! Je suis l\'assistant Alta 36. Comment puis-je vous aider avec vos prospects aujourd\'hui ?' }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsLoading(true)

        try {
            const res = await fetch('/api/agent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            })
            const data = await res.json()

            const agentMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.reply || "Désolé, je n'ai pas pu traiter votre demande."
            }
            setMessages(prev => [...prev, agentMsg])
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="flex flex-col h-[calc(100vh-140px)] shadow-lg">
            <div className="p-4 border-b bg-primary-500 text-primary-foreground rounded-t-xl flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-full">
                    <Sparkles className="h-5 w-5 text-accent-400" />
                </div>
                <div>
                    <h3 className="font-bold">Alta 36 Agent</h3>
                    <p className="text-xs text-primary-200">Powered by Claude 3.5 Sonnet</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                {messages.map((msg) => (
                    <div key={msg.id} className={cn("flex gap-3", msg.role === 'user' ? "justify-end" : "justify-start")}>
                        {msg.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                                <Bot className="h-5 w-5 text-primary-600" />
                            </div>
                        )}
                        <div className={cn(
                            "max-w-[80%] rounded-lg p-3 text-sm shadow-sm",
                            msg.role === 'user'
                                ? "bg-primary-600 text-white rounded-tr-none"
                                : "bg-white border rounded-tl-none"
                        )}>
                            {msg.content}
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center shrink-0">
                                <User className="h-5 w-5 text-accent-700" />
                            </div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3 justify-start animate-pulse">
                        <div className="w-8 h-8 rounded-full bg-primary-100 shrink-0" />
                        <div className="h-10 w-24 bg-white rounded-lg" />
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t bg-card rounded-b-xl">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Posez une question sur votre pipeline..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button type="submit" disabled={isLoading || !input}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </Card>
    )
}
