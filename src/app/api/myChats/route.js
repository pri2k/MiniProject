import { NextResponse } from "next/server";
import ChatContact from "../../../models/ChatContact";

export async function POST(req) {
    const { senderId, receiverId } = await req.json();

    try {
        await ChatContact.findOneAndUpdate(
            { user : senderId },
            { $addToSet : { contacts: receiverId}},
            { upsert : true, new : true}
        )
        await ChatContact.findOneAndUpdate(
            { user : receiverId },
            { $addToSet : { contacts: senderId}},
            { upsert : true, new : true}
        )

        return NextResponse.json({ success : true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success : false,
            message : "Failed to update contacts"
        })
    }
}

export async function GET (req) {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ success: false, message: "Missing userId"});
    }

    try {
        const chatContact = await ChatContact.findOne({ user: userId })
                                .populate('contacts', 'name image _id')
        return NextResponse.json({
            success: true, 
            contacts: chatContact?.contacts || []
        })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ success: false, message: "Failed to fetch contacts" })
    }
}