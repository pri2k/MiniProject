import dotenv from 'dotenv'
import fetch from 'node-fetch';

dotenv.config();

export const extractEntities = async (text) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const requestBody = {
        contents: [{
            parts: [{
                text: `Extract important named entities related to mental health from this text: ${text}. Output only the entities as a comma-separated list.`
            }]
        }]
    };

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text.split(",").map(entity => entity.trim());
    } else {
        return [];
    }
};


