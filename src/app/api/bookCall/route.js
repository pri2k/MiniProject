import { connect } from "@/dbConfig/dbConfig";
import Call from "@/models/Call";
import { NextResponse } from "next/server";
import { createRoom } from "@/utils/createHMSRoom";

export async function POST(req) {
    try {
        await connect();

        const r = await req.json();
        const { userId, volunteerId, time, duration } = r;
        console.log("Request data:", r);

        const startTime = new Date(time);
        const endTime = new Date(startTime.getTime() + duration * 60000);

        // Check if the volunteer is already booked during the desired time
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
                message: "Volunteer is already booked at this time. Please choose another time."
            }, { status: 409 });
        }

        // ✅ Only now create the room
        const roomUrl = await createRoom();

        if (!roomUrl) {
            return NextResponse.json({
                success: false,
                message: "Failed to create room URL"
            }, { status: 500 });
        }

        const newCall = await Call.create({
            userId,
            volunteerId,
            time: startTime,
            duration,
            roomUrl
        });

        // 🔁 Trigger mail/send notifications
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/registerCall`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId,
                volunteerId,
                time: startTime,
                duration,
                roomUrl
            })
        });

        return NextResponse.json({ success: true, call: newCall });

    } catch (err) {
        console.error("API Error:", err);
        return NextResponse.json({ success: false, message: "Server error occurred" }, { status: 500 });
    }
}
