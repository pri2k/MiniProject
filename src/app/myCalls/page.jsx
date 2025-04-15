"use client";

import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import Card from '@/components/Card';

export default function MyCallsPage() {
    const { user } = useContext(UserContext);
    const [calls, setCalls] = useState([]);

    useEffect(() => {
        async function fetchCalls() {
            const res = await fetch(`/api/myCalls?userId=${user?.id}`);
            const data = await res.json();
            if (data.success) setCalls(data.calls);
        }

        if (user?.id) fetchCalls();
    }, [user]);

    const volunteerCalls = calls.filter(call => {
        const volunteerId = call.volunteerId?._id?.toString() || call.volunteerId?.toString();
        return volunteerId === user?.id;
    });

    const userCalls = calls.filter(call => {
        const userId = call.userId?._id?.toString() || call.userId?.toString();
        return userId === user?.id;
    });

    function canJoinCall(call) {
        const callTime = new Date(call.time);
        const now = new Date();
        return now >= callTime && now <= new Date(callTime.getTime() + call.duration * 60000);
    }

    function isUpcomingCall(call) {
        return new Date() < new Date(call.time);
    }

    function isCallOver(call) {
        const callTime = new Date(call.time);
        return new Date() > new Date(callTime.getTime() + call.duration * 60000);
    }

    async function handleJoinCall(call) {
        let roomUrl = call.roomUrl;
        if (!roomUrl) {
            const res = await fetch('/api/createRoom');
            const data = await res.json();
            roomUrl = data.url;
        }
        console.log("roomUrl", roomUrl);
        window.open(roomUrl, '_blank', 'width=800,height=600');
    }

    function renderCallCard(call, otherPerson, isVolunteerView) {
        return (
            <Card key={call._id} className="p-4 mb-4 cursor-pointer hover:bg-gray-100 flex gap-4 items-center">
                <img
                    src={otherPerson.image || '/images/default.jpg'}
                    alt={isVolunteerView ? 'User' : 'Volunteer'}
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div>
                    <p>
                        <strong>{isVolunteerView ? 'User' : 'Volunteer'}:</strong> {otherPerson.username || otherPerson.name || 'N/A'}
                    </p>
                    <p><strong>Time:</strong> {new Date(call.time).toLocaleString()}</p>
                    <p><strong>Duration:</strong> {call.duration} mins</p>

                    {isCallOver(call) ? (
                        <span className="text-red-500">Call time over</span>
                    ) : canJoinCall(call) ? (
                        <button onClick={() => handleJoinCall(call)}>Join Call</button>
                    ) : (
                        <span>Call not started</span>
                    )}
                </div>
            </Card>
        );
    }

    const sortedVolunteerCalls = [...volunteerCalls].sort((a, b) => new Date(a.time) - new Date(b.time));
    const sortedUserCalls = [...userCalls].sort((a, b) => new Date(a.time) - new Date(b.time));

    return (
        <div className="mt-[10em] px-4">
            <h1 className="text-2xl font-bold mb-6">Your Scheduled Calls</h1>

            <div>
                <h2 className="text-xl font-semibold mb-4">As Volunteer</h2>
                {sortedVolunteerCalls.length === 0 ? (
                    <p>No calls where you're a volunteer.</p>
                ) : (
                    sortedVolunteerCalls.map(call => {
                        const userInfo = call.userId;
                        return renderCallCard(call, userInfo, true);
                    })
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">As User</h2>
                {sortedUserCalls.length === 0 ? (
                    <p>No calls where you're the user.</p>
                ) : (
                    sortedUserCalls.map(call => {
                        const volunteerInfo = call.volunteerId;
                        return renderCallCard(call, volunteerInfo, false);
                    })
                )}
            </div>
        </div>
    );
}
