import fs from "fs";
import pdf from "pdf-parse";
import dotenv from "dotenv";
import Tesseract from "tesseract.js";
import pdf2img from "pdf-poppler";

dotenv.config(); // Load environment variables

// Path to the PDF file
const pdfPath = "/Users/priyakeshri/Desktop/Recent/Projects/Mini Project/Gerald Corey - Theory and Practice of Counseling and Psychotherapy-Brooks Cole (2016).pdf";
const outputTxtPath = "./extracted_text.txt"; // Output file

// Function to extract text from PDF using native PDF parsing
async function extractTextFromPDF(pdfPath) {
    try {
        const data = fs.readFileSync(pdfPath);
        const pdfData = await pdf(data);
        const rawText = cleanText(pdfData.text);

        if (rawText.length < 1000) {
            console.warn("⚠️ Extracted text is too short! Using OCR instead...");
            return await extractTextUsingOCR(pdfPath);
        }

        return rawText;
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        console.warn("⚠️ Switching to OCR...");
        return await extractTextUsingOCR(pdfPath);
    }
}

// Convert PDF pages to images and run OCR
async function extractTextUsingOCR(pdfPath) {
    const outputDir = "./images";

    let opts = {
        format: 'png',
        out_dir: outputDir,
        out_prefix: 'page',
        page: null
    };

    try {
        await pdf2img.convert(pdfPath, opts);
        console.log("📄 PDF converted to images.");

        let imageFiles = fs.readdirSync(outputDir).filter(file => file.endsWith(".png"));
        let extractedText = "";

        for (let file of imageFiles) {
            let { data: { text } } = await Tesseract.recognize(`${outputDir}/${file}`, 'eng');
            extractedText += text + "\n";
        }

        return cleanText(extractedText);
    } catch (error) {
        console.error("OCR Extraction Error:", error);
        return "";
    }
}

// Function to clean extracted text
function cleanText(text) {
    return text
        .replace(/Copyright.*?Cengage Learning.*?\n?/gi, "") // Remove copyright notices
        .replace(/\d{5,}_\w+.*?\d{1,2}:\d{2} (AM|PM)/g, "") // Remove timestamps
        .replace(/www\.\S+/g, "") // Remove URLs
        .replace(/\b(Cengage Learning|MindTap|Source Code: \S+|All Rights Reserved)\b/gi, "") // Remove publisher mentions
        .replace(/\b(CHAPTER\s+\d+[:.-]?\s*[A-Za-z\s]+)\b/gi, "") // Remove chapter numbers
        .replace(/[^\w\s.,;:'"-]/g, "") // Remove special characters except basic punctuation
        .replace(/\s+/g, " ") // Normalize spaces
        .trim();
}

// Function to process the PDF and save extracted text to a file
(async function processPDF() {
    const extractedText = await extractTextFromPDF(pdfPath);
    if (!extractedText || extractedText.length < 500) {
        console.error("❌ Failed to extract meaningful content.");
        return;
    }

    // Write extracted text to a .txt file
    fs.writeFileSync(outputTxtPath, extractedText, "utf-8");
    console.log(`✅ Extracted text saved to ${outputTxtPath}`);
})();
