import { NextResponse } from "next/server";
import Volunteer from "@/models/Volunteer";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(req) {
    try {
        const data = await req.json();

        const existing = await Volunteer.findOne({ email: data.email });
        if (existing) {
            return NextResponse.json({ error: "Volunteer already exists" }, { status: 400 });
        }

        const newVolunteer = new Volunteer(data);
        await newVolunteer.save();

        return NextResponse.json({ message: "Volunteer registered successfully" }, { status: 200 });
    } catch (err) {
        console.error("Error registering volunteer:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
