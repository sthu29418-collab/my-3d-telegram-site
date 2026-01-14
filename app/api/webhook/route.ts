import { NextResponse } from 'next/server';

let messages: any[] = [];

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("🔥 RECEIVED DATA:", body);

        // Channel က စာဖြစ်ဖြစ်၊ Bot ဆီ တိုက်ရိုက်ပို့တဲ့ စာဖြစ်ဖြစ် လက်ခံမယ်
        const msg = body.channel_post || body.message;

        if (msg && msg.text) {
            messages.push({
                id: Date.now(),
                // Channel စာဆိုရင် Channel နာမည်ပြမယ်၊ Chat ဆိုရင် လူနာမည်ပြမယ်
                user: body.channel_post ? body.channel_post.chat.title : msg.from.first_name,
                text: msg.text
            });
        }
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json(messages);
}