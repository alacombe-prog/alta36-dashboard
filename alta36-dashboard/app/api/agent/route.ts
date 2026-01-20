import { askAgent } from "@/lib/claude-agent";

export async function POST(request: Request) {
    try {
        const { message } = await request.json();

        // Pass user message to Claude wrapper
        const response = await askAgent(message);

        let replyText = "I encountered an error.";
        if (response.content && response.content[0]?.text) {
            replyText = response.content[0].text;
        } else if (response.error) {
            replyText = `API Error: ${response.error.message}`;
        }

        return Response.json({ reply: replyText });

    } catch (error) {
        console.error("Agent API Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
