import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Key တွေကို Environment Variables အနေနဲ့ သုံးတာ ပိုကောင်းပါတယ်
const supabase = createClient(
  process.env.SUPABASE_URL  'https://nfngeklmyyvvrqblvgcg.supabase.co',
  process.env.SUPABASE_ANON_KEY  'sb_publishable_BfAagtaG1jv2BOTegSXCZQ_Cp1Y2mRM'
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Channel Post သို့မဟုတ် Message ကို စနစ်တကျ ဖမ်းယူခြင်း
    const update = body.channel_post || body.message;

    // စာသားပါမှသာ Database ထဲ ထည့်မည်
    if (!update?.text) {
      return NextResponse.json({ ok: true, skipped: "No text content" });
    }

    const { error } = await supabase
      .from('messages')
      .insert([{ 
        user: update.chat?.title  update.from?.first_name  'News Bot', 
        text: update.text,
        created_at: new Date().toISOString() // အချိန်ပါ ထည့်သွင်းခြင်း
      }]);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // Error Logging ကို ပိုမို ပြည့်စုံအောင် လုပ်ခြင်း
    console.error('Webhook Failure:', err.message);
    return NextResponse.json({ ok: false, error: "Server Error" }, { status: 500 });
  }
}