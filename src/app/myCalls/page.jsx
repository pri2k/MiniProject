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

    // Check if the current time is within the call's time window
    function canJoinCall(call) {
        const callTime = new Date(call.time);
        const now = new Date();
        return now >= callTime && now <= new Date(callTime.getTime() + call.duration * 60000);
    }

    // Fetch a new room URL if it doesn't exist
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

    return (
        <div className="mt-[10em] px-4">
            <h1 className="text-2xl font-bold mb-6">Your Scheduled Calls</h1>

            <div>
                <h2 className="text-xl font-semibold mb-4">As Volunteer</h2>
                {volunteerCalls.length === 0 ? (
                    <p>No calls where you're a volunteer.</p>
                ) : (
                    volunteerCalls.map(call => {
                        const userInfo = call.userId;
                        return (
                            <Card key={call._id} className="p-4 mb-4 cursor-pointer hover:bg-gray-100 flex gap-4 items-center">
                                <img
                                    src={userInfo.image || '/images/default.jpg'}
                                    alt="User"
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                                <div>
                                    <p><strong>User:</strong> {userInfo.username || 'User'}</p>
                                    <p><strong>Time:</strong> {new Date(call.time).toLocaleString()}</p>
                                    <p><strong>Duration:</strong> {call.duration} mins</p>

                                    {canJoinCall(call) ? (
                                        <button onClick={() => handleJoinCall(call)}>Join Call</button>
                                    ) : (
                                        <span>Call not started</span>
                                    )}
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">As User</h2>
                {userCalls.length === 0 ? (
                    <p>No calls where you're the user.</p>
                ) : (
                    userCalls.map(call => {
                        const volunteerInfo = call.volunteerId;
                        return (
                            <Card key={call._id} className="p-4 mb-4 cursor-pointer hover:bg-gray-100 flex gap-4 items-center">
                                <img
                                    src={volunteerInfo.image || '/images/default.jpg'}
                                    alt="Volunteer"
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                                <div>
                                    <p><strong>Volunteer:</strong> {volunteerInfo.name || 'Volunteer'}</p>
                                    <p><strong>Time:</strong> {new Date(call.time).toLocaleString()}</p>
                                    <p><strong>Duration:</strong> {call.duration} mins</p>

                                    {canJoinCall(call) ? (
                                        <button onClick={() => handleJoinCall(call)}>Join Call</button>
                                    ) : (
                                        <span>Call not started</span>
                                    )}
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}
