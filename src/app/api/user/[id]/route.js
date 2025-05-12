import { NextResponse } from "next/server";
import User from "../../../../models/User";
import { connect } from "../../../../dbConfig/dbConfig";

connect();


export async function GET(req, context) {
    const { id } = await context.params;
    try {
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "User found",
            user,
        });
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        return NextResponse.json({
            success: false,
            message: "Error fetching user",
            error: error.message,
        }, { status: 500 });
    }
}