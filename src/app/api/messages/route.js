import { NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import Message from "../../../models/Message";

connect();

export async function POST(req) {
    try {
        const { senderId, receiverId, text } = await req.json();
        const newMessage = await Message.create({ senderId, receiverId, text});
        return NextResponse.json({
            success: true, 
            message: newMessage
        }, {
            status: 201
        });
    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err.message
        }, {
            status: 500
        });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const senderId = searchParams.get('senderId');
    const receiverId = searchParams.get('receiverId');

    try {
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ createdAt: 1});

        return NextResponse.json({ success: true, messages });
    } catch (err) {
        return NextResponse.json({
            success: false, 
            error: err.message 
        }, {
            status: 500
        });
    }
}