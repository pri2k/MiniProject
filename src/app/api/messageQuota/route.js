import { NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import FreeMessageQuota from "../../../models/FreeMessageQuota";

connect();

export async function GET(req) {
    console.log( " here " );
    
    const { searchParams } = new URL(req.url);
    console.log( " " );
    console.log("searchParams in messageQuota: ", searchParams);
    console.log( " " );
    const senderId = searchParams.get('senderId');
    const receiverId = searchParams.get('receiverId');

    if (!senderId || !receiverId) {
        return NextResponse.json({
            success: false, 
            error: "Missing parameters"
        }, {
            status:400
        });
    }

    let quota = await FreeMessageQuota.findOne({ senderId, receiverId });

    if (!quota) {
        quota = await FreeMessageQuota.create({ senderId, receiverId, remainingMessages: 5 });
    }

    return NextResponse.json({ success: true, remainingMessages: quota.remainingMessages });
}


export async function POST(req) {
    console.log( " here " );

    const body = await req.json();
    console.log( " " );
    
    console.log("body in quota ", body);
    console.log( " " );

    const { senderId, receiverId } = body;

    if (!senderId || !receiverId) {
        return NextResponse.json({
            success: false, 
            error: "Missing parameters"
        }, {
            status: 400
        });
    }

    const quota = await FreeMessageQuota.findOne({ senderId, receiverId });

    if (quota && quota.remainingMessages > 0) {
        quota.remainingMessages -= 1;
        await quota.save();
        return NextResponse.json({ 
            success: true, 
            remainingMessages: quota.remainingMessages 
        });
    } else {
        return NextResponse.json({ 
            success: false, 
            error: 'No remaining messages'
        }, {
            status:403
        });
    }
}