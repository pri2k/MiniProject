// const fs = require('fs');
import fs from 'fs';
import pdf from 'pdf-parse';
import mongoose from 'mongoose';
import { KnowledgeBase } from '../models/Knowledge.js';
import { extractEntities } from './nerExtractor.js';
import dotenv from 'dotenv'

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const pdfPath = "/Users/priyakeshri/Desktop/Recent/Projects/Mini Project/Gerald Corey - Theory and Practice of Counseling and Psychotherapy-Brooks Cole (2016).pdf";
const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(async function (data) {
    const rawText = data.text;
    const chunks = splitTextIntoChunks(rawText);

    for (const chunk of chunks) {
        const keywords = await extractEntities(chunk.text); 

        const entry = new KnowledgeBase({
            chapter: chunk.chapter,
            section: chunk.section,
            content: chunk.text,
            keywords: keywords
        });
        await entry.save();
    }

    console.log("Book data saved to MongoDB.");
    mongoose.connection.close();
});

function splitTextIntoChunks(text) {
    const sections = text.split("\n\n");
    let currentChapter = "Unknown";
    let structuredChunks = [];

    const chapterRegex = /(CHAPTER\s+\d+[:.-]?\s*([A-Za-z\s]+))/i; // Detects "CHAPTER 1: XYZ"
    
    for (const section of sections) {
        const trimmedSection = section.trim();

        const chapterMatch = trimmedSection.match(chapterRegex);
        if (chapterMatch) {
            currentChapter = chapterMatch[1]; 
            continue;
        }

        structuredChunks.push({
            chapter: currentChapter,
            section: `Section ${structuredChunks.length + 1}`,
            text: trimmedSection
        });
    }

    return structuredChunks;
}

