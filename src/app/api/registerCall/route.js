// import { NextResponse } from "next/server";
// import { connect } from "../../../dbConfig/dbConfig";
// import nodemailer from "nodemailer";
// import User from "../../../models/User";
// import Volunteer from "../../../models/volunteer";

// connect();

// export async function POST(req) {
//     try {
//         const r = await req.json();
//         const { userId, volunteerId, time, duration } = r;

//         const user = await User.findById(userId);
//         const volunteer = await Volunteer.findById(volunteerId).populate('userId'); // Populate userId in Volunteer model

//         if (!user || !volunteer) {
//             return NextResponse.json({ success: false, message: "User or volunteer not found" }, { status: 404 });
//         }

//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         const emailContent = (receiverName, partnerName) => `
//         Hi ${receiverName},
        
//         Your video call with ${partnerName} has been scheduled.
        
//         🕒 Time: ${new Date(time).toLocaleString()}
//         ⏱ Duration: ${duration} minutes
//         🔗 Join the scheduled call on time directly from the website!
        
//         Please be ready on time. Click the link above to join the call when it starts.
//         `;

//         // Log the email details before sending the emails
//         console.log("Sending email to the user:", user.email);
//         console.log("Sending email to the volunteer:", volunteer.userId.email); // Access email from the populated userId

//         // Send email to the user
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: user.email,
//             subject: "Call Booked Successfully",
//             text: emailContent(user.username, volunteer.userId.username),
//         });

//         // Send email to the volunteer (using the email from the populated userId)
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: volunteer.userId.email, // Use the volunteer's email from the populated userId
//             subject: "You Have a New Call Booking",
//             text: emailContent(volunteer.userId.username, user.username),
//         });

//         return NextResponse.json({ success: true, message: "Call registered and notifications sent" });
//     } catch (error) {
//         console.error("Call registration error:", error);
//         return NextResponse.json({ success: false, message: "Failed to register call" }, { status: 500 });
//     }
// }


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

        const emailContent = (receiverName, partnerName, link) => `
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
            text: emailContent(user.username, volunteer.userId.username, roomUrl)
        });

        // Send email to volunteer
        await transporter.sendMail({
            from: `"Brighter Beyond" <${process.env.EMAIL_USER}>`,
            to: volunteer.userId.email,
            subject: "A User Has Scheduled a Call with You",
            text: emailContent(volunteer.userId.username, user.username, roomUrl)
        });

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error("Email sending error:", err);
        return NextResponse.json({ success: false, message: "Failed to send email notifications" }, { status: 500 });
    }
}
