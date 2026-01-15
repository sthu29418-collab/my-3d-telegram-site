import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const SUPABASE_URL = 'https://nfngeklmyyvvrqblvgcg.supabase.co'; // မင်းရဲ့ URL ပြန်ထည့်ပါ
const SUPABASE_ANON_KEY = 'sb_publishable_BfAagtaG1jv2BOTegSXCZQ_Cp1Y2mRM'; // မင်းရဲ့ Key ပြန်ထည့်ပါ

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // လူပို့တဲ့စာ (message) ရော၊ Channel က Auto စာ (channel_post) ကိုပါ ဖမ်းမယ်
    const post = body.channel_post || body.message;

    if (post && post.text) {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          { 
            user: post.chat?.title  post.from?.first_name  'System', 
            text: post.text 
          }
        ]);

      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true, message: 'No text content' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
  }
}