import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Response from "@/models/response"; // Adjust the path to your model

connect();

interface ResponseItem {
    questionId: string;
    points: number;
}

interface RequestBody {
    userId: string;
    responses: ResponseItem[];
}

// Route to submit user responses
export async function POST(req: NextRequest) {
    try {

        const body: RequestBody = await req.json();
        const { userId, responses } = body;

        if (!responses || !Array.isArray(responses)) {
            return NextResponse.json({ message: "Invalid responses format. It should be an array." }, { status: 400 });
        }

        // Calculate total points
        const totalPoints = responses.reduce((sum, r) => sum + (r.points || 0), 0);

        // Determine mood based on points
        let mood = "Neutral";
        if (totalPoints < 6) mood = "Stressed";
        else if (totalPoints > 10) mood = "Happy";

        // Create and save new response
        const newResponse = new Response({ userId, responses, totalPoints, mood });
        await newResponse.save();

        return NextResponse.json({ message: "Responses saved", mood, totalPoints }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error saving response", error }, { status: 500 });
    }
}

// Route to get user responses and mood
export async function GET(req: NextRequest) {
    try {

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "User ID is required." }, { status: 400 });
        }

        // Find the latest response for the user
        const response = await Response.findOne({ userId }).sort({ _id: -1 });

        if (!response) {
            return NextResponse.json({ message: "No results found for this user." }, { status: 404 });
        }

        return NextResponse.json({
            mood: response.mood,
            totalPoints: response.totalPoints,
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching results", error }, { status: 500 });
    }
}
