
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  // You can later connect this to your RAG model here
  return NextResponse.json({
    reply: `You said: "${message}". I hear you 🌼`,
  });
}
