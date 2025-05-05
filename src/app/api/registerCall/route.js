import { NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import nodemailer from "nodemailer";
import User from "../../../models/User";
import Volunteer from "../../../models/volunteer";

connect();

export async function POST(req) {
    try {
        const r = await req.json();
        const { userId, volunteerId, time, duration, roomUrl } = r;
        console.log("Received data:", r); // Log the received data

        const user = await User.findById(userId);
        // const volunteer = await Volunteer.findById(volunteerId).populate('userId');
        const volunteer = await Volunteer.findOne({ userId: volunteerId }).populate('userId'); // Find volunteer by userId and populate userId
        console.log("User found:", user); // Log the user found
        console.log("Volunteer found:", volunteer); // Log the volunteer found
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

        const formattedTime = new Date(time).toLocaleString();

        const emailContent = (receiverName, partnerName) => `
Hi ${receiverName},

Your video call with ${partnerName} has been successfully scheduled.

🕒 Time: ${formattedTime}
⏱ Duration: ${duration} minutes
🔗 Join the scheduled call on time directly from the website!

Please be on time and click the above link when the call is about to start.

Warm regards,  
Brighter Beyond Team
        `;

        console.log("Sending email to the user:", user.email);
        console.log("Sending email to the volunteer:", volunteer.userId.email); // Access email from the populated userId

        // Send email to user
        await transporter.sendMail({
            from: `"Brighter Beyond" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Your Video Call is Scheduled",
            text: emailContent(user.name, volunteer.userId.name, roomUrl)
        });

        // Send email to volunteer
        await transporter.sendMail({
            from: `"Brighter Beyond" <${process.env.EMAIL_USER}>`,
            to: volunteer.userId.email,
            subject: "A User Has Scheduled a Call with You",
            text: emailContent(volunteer.userId.name, user.name, roomUrl)
        });

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("Email sending error:", err);
        return NextResponse.json({ success: false, message: "Failed to send email notifications" }, { status: 500 });
    }
}
