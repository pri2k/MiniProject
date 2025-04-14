import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import EmailVerification from "@/models/EmailVerification";

connect();

export async function POST(req) {
    try {
        const { email, code } = await req.json();

        const record = await EmailVerification.findOne({ email, code });

        if (!record) {
        return NextResponse.json({ verified: false });
        }

        // If valid, delete the code so it can't be reused
        await EmailVerification.deleteMany({ email });

        return NextResponse.json({ verified: true });
    } catch (err) {
        console.error("Verification failed:", err);
        return NextResponse.json({ verified: false }, { status: 500 });
    }
}
