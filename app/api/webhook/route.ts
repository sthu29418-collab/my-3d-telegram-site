import { NextResponse } from 'next/server';

// စာတွေကို ခေတ္တသိမ်းထားမယ့်နေရာ
let messages: any[] = [];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("🔥 NEW MESSAGE FROM TELEGRAM:", body); // ဒါက Logs မှာ ပေါ်လာစေမှာပါ

        if (body.message && body.message.text) {
            messages.push({
                id: Date.now(),
                text: body.message.text,
                user: body.message.from.first_name || 'Unknown'
            });
        }
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("❌ Error in Webhook:", error);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json(messages);
}