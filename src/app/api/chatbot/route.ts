import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Client as GradioClient } from '@gradio/client';

interface Section {
  _id: string;
  section_text: string;
  keywords_found: string[];
  embedding: number[];
}

interface ScoredSection extends Section {
  score: number;
}

// Initialize Gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// const availableModels = await genAI.ListModels();
// console.log("Available models:", availableModels);


// Connect to MongoDB
const client = new MongoClient(process.env.MONGO_URI!);
const db = client.db('test');
const collection = db.collection<Section>('sections'); // typed collection

// Cosine similarity function
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dot = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dot / (normA * normB);
}

export async function POST(req: Request) {
  try {
    console.log("🟢 Received request");

    const { message, history } = await req.json();
    console.log("📨 Message:", message);
    console.log("🕘 History:", history);

    // Instead of calling a local server, use @gradio/client to invoke your Gradio Space
    const grClient = await GradioClient.connect("priya2k/mentalbertEmbedder");
    // Call the predict endpoint (typically '/predict') with the message
    const grResult = await grClient.predict("/predict", { text: message });
    // console.log("📦 Gradio result:", grResult.data);

    // // Check the returned data type
    // const embedding: number[] = 
    //   typeof grResult.data === 'string'
    //     ? grResult.data.split(',').map((val: string) => parseFloat(val.trim()))
    //     : grResult.data;

    let embedding: number[];

    if (typeof grResult.data === 'string') {
      embedding = grResult.data.split(',').map((val: string) => parseFloat(val.trim()));
    } else if (Array.isArray(grResult.data)) {
      embedding = grResult.data as number[];
    } else {
      throw new Error("Unexpected embedding format from Gradio.");
    }


    // console.log("🧠 Got Embedding:", embedding);

    // Fetch all documents from MongoDB that contain an embedding
    const allDocs = await collection.find({ embedding: { $exists: true } }).toArray();
    // console.log("📚 Total docs fetched:", allDocs.length);

    // Compute cosine similarity for each document
    const scoredDocs: ScoredSection[] = allDocs.map((doc) => ({
      ...doc,
      score: cosineSimilarity(embedding, doc.embedding),
    }));

    // Select top 3 documents
    const topMatches = scoredDocs.sort((a, b) => b.score - a.score).slice(0, 3);
    const context = topMatches.map((doc) => doc.section_text).join('\n\n');
    console.log("📖 Context prepared");

    // Format chat history for the prompt
    const formattedHistory = (history || [])
      .map((msg: any) => `${msg.sender === 'user' ? 'User' : 'Bot'}: ${msg.text}`)
      .join('\n');
    console.log("🗣️ Formatted history ready");

    // Create the prompt to send to Gemini
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
    
    // console.log("🔮 Prompt for Gemini:", prompt);

    // Generate the reply using Gemini
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
