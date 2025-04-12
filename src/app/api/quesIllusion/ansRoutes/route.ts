import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { UserResponse } from "@/models/UserResponse"

connect();

interface ResponseItem {
    questionId: string;
    score: number;
}

interface RequestBody {
    userId: string;
    category: string;
    responses: ResponseItem[];
}

export async function POST(req: NextRequest) {
    try {

        const body: RequestBody = await req.json();

        const { userId, category, responses } = body;

        // Calculate total score
        const totalScore = responses.reduce((sum, response) => sum + response.score, 0);

        const newResponse = new UserResponse({
            userId,
            category,
            responses,
            totalScore,
        });

        await newResponse.save();

        return NextResponse.json({ message: "Responses saved successfully", totalScore }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
