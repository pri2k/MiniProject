import { NextResponse } from 'next/server';
import { connect } from "../../../dbConfig/dbConfig";
import Call from '../../../models/call';

connect();

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ success: false, message: 'User ID is required' });
        }

        const allCalls = await Call.find({
            $or: [
                { userId: userId },
                { volunteerId: userId }
            ]
        })
        .populate({
            path: 'userId',
            model: 'User',
            select: 'username image'
        })
        .populate({
            path: 'volunteerId',
            model: 'User',
            select: 'username image'
        });

        console.log('All Calls:', allCalls);
        const userCalls = [];
        const volunteerCalls = [];

        for (const call of allCalls) {
            console.log("user ID:", userId);
            console.log("Call User ID:", call.userId?._id?.toString());
            console.log("Call Volunteer ID:", call.volunteerId?._id?.toString());
            if (call.volunteerId?._id.toString() === userId) {
                volunteerCalls.push(call);
            } else if (call.userId?._id.toString() === userId) {
                userCalls.push(call);
            }
        }

        return NextResponse.json({ success: true, userCalls, volunteerCalls });
    } catch (error) {
        console.error('Error fetching calls:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' });
    }
}