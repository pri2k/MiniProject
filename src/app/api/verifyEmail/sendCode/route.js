import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import EmailVerification from "@/models/EmailVerification";
import nodemailer from "nodemailer";

connect();

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await EmailVerification.deleteMany({ email });
        await EmailVerification.create({ email, code });

        const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        });

        await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification Code",
        text: `Your verification code is: ${code}`,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending verification code:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
