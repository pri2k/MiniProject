import { connect } from "@/dbConfig/dbConfig";
import Volunteer from "../../../../models/volunteer"
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

connect();

export async function GET(req, context) {
    const problem = context.params.problem;

    if (!problem) {
        return NextResponse.json({ success: false, error: "Problem parameter is missing." }, { status: 400 });
    }

    try {
        const volunteers = await Volunteer.find({ problem });
        return NextResponse.json({ success: true, volunteers });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}