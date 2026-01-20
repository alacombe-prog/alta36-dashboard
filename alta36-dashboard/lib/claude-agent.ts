export async function askAgent(userMessage: string, context?: any) {
  // If no API Key for Claude, return a mock response
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("ANTHROPIC_API_KEY not set. Returning mock response.")
    return {
      content: [
        { type: 'text', text: "Simulated AI response. Please configure ANTHROPIC_API_KEY." }
      ]
    }
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet-20240620", // Updated model name
      max_tokens: 1024,
      system: "You are the AI Sales Assistant for Alta 36.",
      messages: [
        { role: "user", content: userMessage }
      ],
      // Note: MCP Config would go here but usually requires a specific MCP client/proxy, 
      // direct calling via standard Anthropic API with "mcp_servers" is not standard public API yet 
      // unless using specific tooling. We will stick to the user's requested format but note this caveat.
    })
  });

  return response.json();
}
