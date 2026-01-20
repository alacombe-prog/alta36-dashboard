import { askAgent } from "@/lib/claude-agent";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const { prospectId, conversationHistory, prospectContext } = await request.json();

        // In a real scenario, we might fetch prospect details here if not passed in
        // const { data: prospect } = await supabase.from('prospects').select('*').eq('id', prospectId).single();

        // Construct Prompt
        const prompt = `
    Génère une réponse email pour ce prospect.
    
    Prospect: ${prospectContext?.name || 'Unknown'} de ${prospectContext?.company || 'Unknown'}
    Brief: ${prospectContext?.brief || 'N/A'}
    
    Historique:
    ${JSON.stringify(conversationHistory)}
    
    Génère une réponse courte (3-5 phrases maximum), personnalisée et orientée vers la prise de RDV.
    Ton: Professionnel, direct, chaleureux.
    `;

        const response = await askAgent(prompt);

        // Extract text from Claude response safely
        let replyText = "Sorry, I couldn't generate a reply.";
        if (response.content && response.content[0]?.text) {
            replyText = response.content[0].text;
        } else if (response.error) {
            replyText = `Error from AI: ${response.error.message}`;
        }

        return Response.json({ reply: replyText });

    } catch (error) {
        console.error("Error generating reply:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
