import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import nodemailer from "nodemailer";
import User from "@/models/User";
import Volunteer from "@/models/volunteer";

connect();

export async function POST(req) {
    try {
        const r = await req.json();
        const { userId, volunteerId, time, duration, roomUrl } = r;

        const user = await User.findById(userId);
        const volunteer = await Volunteer.findById(volunteerId).populate('userId'); // Populate userId in Volunteer model

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

        // Log the email details before sending the emails
        console.log("Sending email to the user:", user.email);
        console.log("Sending email to the volunteer:", volunteer.userId.email); // Access email from the populated userId

        // Send email to the user
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Call Booked Successfully",
            text: emailContent(user.username, volunteer.userId.username),
        });

        // Send email to the volunteer (using the email from the populated userId)
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: volunteer.userId.email, // Use the volunteer's email from the populated userId
            subject: "You Have a New Call Booking",
            text: emailContent(volunteer.userId.username, user.username),
        });

        return NextResponse.json({ success: true, message: "Call registered and notifications sent" });
    } catch (error) {
        console.error("Call registration error:", error);
        return NextResponse.json({ success: false, message: "Failed to register call" }, { status: 500 });
    }
}
