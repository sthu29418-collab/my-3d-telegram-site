import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Telegram Message Received:", body);
        return NextResponse.json({ status: 'success' });
    } catch (error) {
        return NextResponse.json({ status: 'error' }, { status: 500 });
    }
}