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
        const { userId, volunteerId, time, duration } = r;
        console.log("r", r);

        const user = await User.findById(userId);
        const volunteer = await Volunteer.findById(volunteerId);

        if (!user || !volunteer) {
            return NextResponse.json({ success: false, message: "User or volunteer not found" }, { status: 404 });
        }

        // Save the call in the database
        const newCall = await Call.create({
            userId,
            volunteerId,
            time,
            duration
        });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Send to user
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Call Booked Successfully",
            text: `Hi ${user.username}, your call has been booked with ${volunteer.name} at ${time} for ${duration} minutes.`,
        });

        // Send to volunteer
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: volunteer.email,
            subject: "You Have a New Call Booking",
            text: `Hi ${volunteer.name}, you have been booked by ${user.name} at ${time} for ${duration} minutes.`,
        });

        return NextResponse.json({ success: true, message: "Call registered and notifications sent" });
    } catch (error) {
        console.error("Call registration error:", error);
        return NextResponse.json({ success: false, message: "Failed to register call" }, { status: 500 });
    }
}
