import { NextResponse } from 'next/server'
import { connect } from "@/dbConfig/dbConfig";
import Call from '@/models/Call'
import User from '@/models/User'
import Volunteer from '@/models/Volunteer'

connect();

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
        return NextResponse.json({ success: false, message: 'Missing userId' })
    }

    try {
        const calls = await Call.find({
            $or: [
                { userId: userId },
                { volunteerId: userId }
            ]
        })
        .populate({
            path: 'userId',
            model: User,
            select: 'username image'
        })
        .populate({
            path: 'volunteerId',
            model: Volunteer,
            select: 'name image'
        })

        return NextResponse.json({ success: true, calls })
    } catch (err) {
        console.error('Error fetching calls:', err)
        return NextResponse.json({ success: false, message: 'Server error' })
    }
}
