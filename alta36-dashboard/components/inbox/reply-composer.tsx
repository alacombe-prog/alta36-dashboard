"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wand2, Send } from "lucide-react"

interface ReplyComposerProps {
    conversationId: string
    prospectName: string
}

export function ReplyComposer({ conversationId, prospectName }: ReplyComposerProps) {
    const [draft, setDraft] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerate = async () => {
        setIsGenerating(true)
        // Simulate AI generation delay
        setTimeout(() => {
            setDraft(`Bonjour ${prospectName},\n\nMerci pour votre retour.\n\nJe comprends votre point de vue. Seriez-vous disponible mardi à 14h pour en discuter 10 minutes ?\n\nCordialement,\nAlain`)
            setIsGenerating(false)
        }, 1500)
    }

    return (
        <div className="flex flex-col h-full gap-2">
            <div className="relative flex-1">
                <textarea
                    className="w-full h-full p-3 resize-none rounded-md border text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 bg-background"
                    placeholder="Écrivez votre réponse..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                />
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 left-2 text-accent-600 hover:text-accent-700 hover:bg-accent-50"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                >
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? "Génération..." : "Générer avec IA"}
                </Button>
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDraft("")}>
                    Brouillon
                </Button>
                <Button disabled={!draft}>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer
                </Button>
            </div>
        </div>
    )
}
