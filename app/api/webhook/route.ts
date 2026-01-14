import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ၁။ မင်းရဲ့ URL နဲ့ Key ကို ဒီနေရာမှာ အစားထိုးပါ
const SUPABASE_URL = 'https://nfngeklmyyvvrqblvgcg.supabase.co'; // မင်းရဲ့ URL ထည့်ပါ
const SUPABASE_SERVICE_ROLE_KEY = 'sb_publishable_BfAagtaG1jv2BOTegSXCZQ_Cp1Y2mRM'; // မင်းရဲ့ anon key အရှည်ကြီး ထည့်ပါ

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Incoming Telegram Data:", body);

        // Channel ကစာလား၊ Bot ဆီ တိုက်ရိုက်ပို့တဲ့စာလား စစ်မယ်
        const msg = body.channel_post  body.message;

        if (msg && msg.text) {
            // ၂။ Database ရဲ့ 'messages' table ထဲကို စာသွားသိမ်းမယ်
            const { error } = await supabase
                .from('messages')
                .insert([
                    { 
                        user: body.channel_post ? body.channel_post.chat.title : (msg.from?.first_name  'User'), 
                        text: msg.text 
                    }
                ]);

            if (error) {
                console.error("Supabase Insert Error:", error);
            }
        }
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Webhook POST Error:", error);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}

export async function GET() {
    try {
        // ၃။ Website က စာတွေတောင်းရင် Database ထဲကနေ ဆွဲထုတ်ပေးမယ်
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}