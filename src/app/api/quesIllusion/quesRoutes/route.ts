import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Question from "@/models/question"; // Adjust the path to your model

connect();

export async function GET(req: NextRequest) {
    try {
      
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        if (!category) {
            return NextResponse.json({ error: "Category is required" }, { status: 400 });
        }

        // Fetch 2 random questions from the given category
        const questions = await Question.aggregate([
            { $match: { category } }, 
            { $sample: { size: 2 } }
        ]);

        return NextResponse.json(questions, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error", details: error }, { status: 500 });
    }
}
