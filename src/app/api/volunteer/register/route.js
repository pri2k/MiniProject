import { NextResponse } from "next/server";
import Volunteer from "@/models/Volunteer";
import { connect } from "@/dbConfig/dbConfig";
import { apiErrorResponse } from "@/lib/apiErrorResponse";

connect();

export async function POST(req) {
    try {
        const data = await req.json();

        const existing = await Volunteer.findOne({ userId: data.userId });
        if (existing) {
            return NextResponse.json(
                { error: "Volunteer already exists" },
                { status: 400 }
            );
        }

        const newVolunteer = new Volunteer({
            userId: data.userId,
            description: data.description,
            problem: data.problem,
        });

        await newVolunteer.save();

        return NextResponse.json(
            { message: "Volunteer registered successfully" },
            { status: 200 }
        );
    } catch (err) {
        return apiErrorResponse(err, "Failed to register volunteer");
    }
}
