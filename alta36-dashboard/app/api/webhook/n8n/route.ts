import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { action, payload } = data;

        // Validate payload simply
        if (!action || !payload) {
            return Response.json({ error: "Missing action or payload" }, { status: 400 });
        }

        let result;

        switch (action) {
            case 'create_prospect':
                // Upsert based on email to prevent duplicates if relevant, or insert
                result = await supabase.from('prospects').upsert(payload, { onConflict: 'email' });
                break;
            case 'update_prospect':
                if (!payload.id) return Response.json({ error: "Missing ID for update" }, { status: 400 });
                result = await supabase.from('prospects').update(payload).eq('id', payload.id);
                break;
            case 'create_meeting':
                result = await supabase.from('meetings').insert(payload);
                break;
            case 'create_proposal':
                result = await supabase.from('proposals').insert(payload);
                break;
            default:
                return Response.json({ error: `Unknown action: ${action}` }, { status: 400 });
        }

        if (result.error) {
            console.error("Supabase Error:", result.error);
            return Response.json({ error: result.error.message }, { status: 500 });
        }

        return Response.json({ success: true, data: result.data });

    } catch (error) {
        console.error("Webhook Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
