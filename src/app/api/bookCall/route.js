import { connect } from "@/dbConfig/dbConfig";
import Call from "@/models/call";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connect();
        const r = await req.json();
        const { userId, volunteerId, time, duration } = r;
        console.log(r);
        const startTime = new Date(time);
        const endTime = new Date(startTime.getTime() + duration * 60000);

        const overlappingCall = await Call.findOne({
            volunteerId,
            time: { $lt: endTime },
            $expr: {
                $gt: [
                    { $add: ["$time", { $multiply: ["$duration", 60000] }] },
                    startTime
                ]
            },
            status: { $in: ["pending", "confirmed"] }
        });

        if (overlappingCall) {
            return NextResponse.json({
                success: false,
                message: "Volunteer is already booked at this time. Please choose another time or volunteer."
            }, { status: 409 });
        }

        const newCall = await Call.create({
            userId,
            volunteerId,
            time: startTime,
            duration
        });

        return NextResponse.json({ success: true, call: newCall });
    } catch (err) {
        console.error("API Error:", err)
        return NextResponse.json({ success: false, message: "Server error occurred" }, { status: 500 });
    }
}
