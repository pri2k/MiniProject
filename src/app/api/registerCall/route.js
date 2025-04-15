import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import nodemailer from "nodemailer";
import Call from "@/models/Call";
import User from "@/models/User";
import Volunteer from "@/models/Volunteer";

connect();

export async function POST(req) {
    try {
        const r = await req.json();
        const { userId, volunteerId, time, duration, roomUrl } = r;

        const user = await User.findById(userId);
        const volunteer = await Volunteer.findById(volunteerId);

        if (!user || !volunteer) {
            return NextResponse.json({ success: false, message: "User or volunteer not found" }, { status: 404 });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const emailContent = (receiverName, partnerName) => `

        Hi ${receiverName},

        Your video call with ${partnerName} has been scheduled.

        🕒 Time: ${new Date(time).toLocaleString()}
        ⏱ Duration: ${duration} minutes
        🔗 Join Link: ${roomUrl}

        Please be ready on time. Click the link above to join the call when it starts.
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Call Booked Successfully",
            text: emailContent(user.username, volunteer.name),
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: volunteer.email,
            subject: "You Have a New Call Booking",
            text: emailContent(volunteer.name, user.username),
        });

        return NextResponse.json({ success: true, message: "Call registered and notifications sent" });
    } catch (error) {
        console.error("Call registration error:", error);
        return NextResponse.json({ success: false, message: "Failed to register call" }, { status: 500 });
    }
}