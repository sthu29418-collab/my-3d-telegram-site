import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://nfngeklmyyvvrqblvgcg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_BfAagtaG1jv2BOTegSXCZQ_Cp1Y2mRM'; // မင်းရဲ့ Anon Key ပြန်ထည့်ပါ

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // လူပို့တာရော၊ Channel က Auto တက်တာရော နှစ်မျိုးလုံးဖမ်းမယ်
    const post = body.channel_post || body.message;

    if (post && post.text) {
      const { error } = await supabase
        .from('messages')
        .insert([
          { 
            user: post.chat?.title  post.from?.first_name  'News Bot', 
            text: post.text 
          }
        ]);

      if (error) {
        console.error('Supabase Error:', error);
        return NextResponse.json({ ok: false, error: error.message });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Webhook Error:', err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}