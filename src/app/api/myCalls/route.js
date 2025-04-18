import { NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import Call from '@/models/Call';
import User from '@/models/User';

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

        console.log('User Calls:', userCalls);
        console.log('Volunteer Calls:', volunteerCalls);

        return NextResponse.json({ success: true, userCalls, volunteerCalls });
    } catch (error) {
        console.error('Error fetching calls:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' });
    }
}



// import { NextResponse } from 'next/server'
// import { connect } from "@/dbConfig/dbConfig";
// import Call from '@/models/Call'

// connect();

// export async function GET(req) {
//     try {
//         const { searchParams } = new URL(req.url)
//         const userId = searchParams.get('userId')

//         if (!userId) {
//             return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 })
//         }

//         const allCalls = await Call.find({}).lean()

//         const userCalls = []
//         const volunteerCalls = []

//         for (const call of allCalls) {
//             const volunteerId = call.volunteerId?._id?.toString?.() || call.volunteerId?.toString?.()
//             const plainUserId = call.userId?._id?.toString?.() || call.userId?.toString?.()

//             if (volunteerId === userId) {
//                 volunteerCalls.push(call)
//             } else if (plainUserId === userId) {
//                 userCalls.push(call)
//             }
//         }

//         const formattedUserCalls = userCalls.map(call => ({
//             _id: call._id,
//             time: call.time,
//             duration: call.duration,
//             status: call.status,
//             roomUrl: call.roomUrl,
//             createdAt: call.createdAt,
//             updatedAt: call.updatedAt,
//             person: {
//                 _id: call.volunteerId._id,
//                 username: call.volunteerId.username,
//                 image: call.volunteerId.image
//             }
//         }))

//         const formattedVolunteerCalls = volunteerCalls.map(call => ({
//             _id: call._id,
//             time: call.time,
//             duration: call.duration,
//             status: call.status,
//             roomUrl: call.roomUrl,
//             createdAt: call.createdAt,
//             updatedAt: call.updatedAt,
//             person: {
//                 _id: call.userId._id,
//                 username: call.userId.username,
//                 image: call.userId.image
//             }
//         }))

//         console.log("formattedUserCalls", formattedVolunteerCalls);
//         console.log("formattedVolunteerCalls", formattedVolunteerCalls);

//         return NextResponse.json({
//             success: true,
//             userCalls: formattedUserCalls,
//             volunteerCalls: formattedVolunteerCalls
//         })
//     } catch (error) {
//         console.error('Error fetching calls:', error)
//         return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
//     }
// }
