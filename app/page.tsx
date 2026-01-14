'use client';
import { useState, useEffect } from 'react';

export default function TelegramHome() {
  const [messages, setMessages] = useState([]);

  // ၂ စက္ကန့်တစ်ခါ စာအသစ်ရှိမရှိ API ဆီ လှမ်းမေးမယ် (Polling)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/webhook');
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-cyan-400">
        Telegram 3D Live Feed
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((msg: any) => (
          <div 
            key={msg.id}
            className="p-6 bg-gray-800 rounded-xl border border-cyan-500/30 shadow-[0_10px_20px_rgba(0,255,255,0.1)] transform hover:-translate-y-2 transition-all duration-300 hover:shadow-cyan-500/50"
          >
            <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-2">
              From: {msg.user}
            </p>
            <p className="text-xl text-gray-100 italic">
              "{msg.text}"
            </p>
          </div>
        ))}
      </div>
      
      {messages.length === 0 && (
        <p className="text-center text-gray-500 mt-20">No messages yet. Send something to your bot!</p>
      )}
    </main>
  );
}