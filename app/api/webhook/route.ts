import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// မင်းရဲ့ Supabase URL နဲ့ Anon Key ကို သေချာပြန်ထည့်ပါ
const SUPABASE_URL = 'https://nfngeklmyyvvrqblvgcg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_BfAagtaG1jv2BOTegSXCZQ_Cp1Y2mRM'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // လူပို့တဲ့စာ (message) ရော၊ Bot က auto တင်တဲ့စာ (channel_post) ကိုပါ စစ်မယ်
    const post = body.channel_post || body.message;

    if (post && post.text) {
      const { error } = await supabase
        .from('messages') // Table နာမည် 'messages' ဖြစ်ရပါမယ်
        .insert([{ 
          user: post.chat?.title  post.from?.first_name  'News Bot', 
          text: post.text 
        }]);

      if (error) throw error;
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook Error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}