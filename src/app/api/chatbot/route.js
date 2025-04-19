import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Client } from "@gradio/client";
import '../../../models/Section';

// Initialize Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Connect to MongoDB
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('test');
const collection = db.collection('sections');

// Cosine similarity function
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dot / (normA * normB);
}

export async function POST(req) {
  try {
    console.log("🟢 Received request");

    const { message, history } = await req.json();
    console.log("📨 Message:", message);
    console.log("🕘 History:", history);

    const grClient = await Client.connect("priya2k/mentalbertEmbedder");
    const grResult = await grClient.predict("/predict",  { text: message });

    let embedding;

    if (typeof grResult.data === 'string') {
      embedding = grResult.data.split(',').map(val => parseFloat(val.trim()));
    } else if (Array.isArray(grResult.data)) {
      embedding = grResult.data;
    } else {
      throw new Error("Unexpected embedding format from Gradio.");
    }

    const allDocs = await collection.find({ embedding: { $exists: true } }).toArray();

    const scoredDocs = allDocs.map(doc => ({
      ...doc,
      score: cosineSimilarity(embedding, doc.embedding),
    }));

    const topMatches = scoredDocs.sort((a, b) => b.score - a.score).slice(0, 3);
    const context = topMatches.map(doc => doc.section_text).join('\n\n');
    console.log("📖 Context prepared");

    const formattedHistory = (history || [])
      .map(msg => `${msg.sender === 'user' ? 'User' : 'Bot'}: ${msg.text}`)
      .join('\n');
    console.log("🗣️ Formatted history ready");

    const prompt = `
    You are a compassionate mental health first-aid assistant for Indian users.
    Reply in a warm, empathetic, and calming tone using simple language that the user converses in. 
    Try to use latin letters only while conversing. Don't use Devanagri script.
    Keep your replies short (2-4 sentences max) and to the point.
    Avoid deep psychological advice. Just acknowledge the user's feelings and offer a small helpful tip or reassurance.
    
    Context:\n${context}
    
    ${formattedHistory}
    User: ${message}
    Bot:`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const resultGen = await model.generateContent(prompt);
    const response = await resultGen.response.text();
    console.log("✅ Got response from Gemini:", response);

    return NextResponse.json({ reply: response });
  } catch (error) {
    console.error("🔥 Chatbot Route Error:", error);
    return NextResponse.json({ reply: "Oops! Something went wrong 🥺" }, { status: 500 });
  }
}
