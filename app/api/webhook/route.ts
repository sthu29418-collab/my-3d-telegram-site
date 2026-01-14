import { NextResponse } from 'next/server';

// စာတွေကို ခေတ္တသိမ်းထားမယ့် array (In-memory array)
let messages: any[] = [];

export async function POST(request: Request) {
    const body = await request.json();
    if (body.message) {
        // စာအသစ်ဝင်လာရင် array ထဲ ထည့်မယ်
        messages.push({
            id: Date.now(),
            text: body.message.text,
            user: body.message.from.first_name
        });
    }
    return NextResponse.json({ ok: true });
}

export async function GET() {
    // Website က လှမ်းတောင်းရင် စာရင်းကို ပြန်ပေးမယ်
    return NextResponse.json(messages);
}