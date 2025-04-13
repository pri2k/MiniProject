import { connect } from "@/dbConfig/dbConfig";
import Call from "@/models/Call"; // or "@/models/Call" if that's the name
import User from "@/models/User"; // to populate user name if needed
import Volunteer from "@/models/Volunteer"; // to populate volunteer name
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        console.log("userId", userId);

        if (!userId) {
        return NextResponse.json({ success: false, message: "Missing userId" }, { status: 400 });
        }

        const calls = await Call.find({
        $or: [{ userId }, { volunteerId: userId }]
        })
        .populate("userId", "name")
        .populate("volunteerId", "name");

        console.log("calls", calls);

        return NextResponse.json({ success: true, calls });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
