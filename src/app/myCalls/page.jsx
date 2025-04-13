'use client'

import { useEffect, useState, useContext } from 'react'
import { UserContext } from '@/context/UserContext'

export default function MyCallsPage() {
    const { user } = useContext(UserContext)
    const [calls, setCalls] = useState([])
    
    useEffect(() => {
        async function fetchCalls() {
            const res = await fetch(`/api/myCalls?userId=${user.id}`);
            const data = await res.json();
            // console.log("Calls data:", data);
            if (data.success) setCalls(data.calls);
        }
    
        if (user?.id) fetchCalls();
    }, [user]);

    // console.log("calls", calls);

    function handleJoinCall(url) {
        window.open(url, '_blank', 'width=800,height=600')
    }

    // Separate calls into two categories: one for volunteer and one for user
    const volunteerCalls = calls.filter(call => call.volunteerId.toString() === user.id);
    console.log("volunteer calls", volunteerCalls);
    const userCalls = calls.filter(call => call.userId.toString() === user.id);
    console.log("user calls", userCalls);

    return (
        <div className="mt-[10em] px-4">
            <h1 className="text-2xl font-bold mb-6">Your Scheduled Calls</h1>
            
            <div>
                <h2 className="text-xl font-semibold mb-4">As Volunteer</h2>
                {volunteerCalls.length === 0 ? (
                    <p>No calls where you're a volunteer.</p>
                ) : (
                    volunteerCalls.map(call => (
                        <div
                            key={call._id}
                            className="border p-4 rounded mb-4 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleJoinCall(call.roomUrl)}
                        >
                            <p><strong>With:</strong> {call.user?.name || 'User'}</p>
                            <p><strong>Time:</strong> {new Date(call.time).toLocaleString()}</p>
                            <p><strong>Duration:</strong> {call.duration} mins</p>
                        </div>
                    ))
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">As User</h2>
                {userCalls.length === 0 ? (
                    <p>No calls where you're the user.</p>
                ) : (
                    userCalls.map(call => (
                        <div
                            key={call._id}
                            className="border p-4 rounded mb-4 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleJoinCall(call.roomUrl)}
                        >
                            <p><strong>With:</strong> {call.volunteer?.name || 'Volunteer'}</p>
                            <p><strong>Time:</strong> {new Date(call.time).toLocaleString()}</p>
                            <p><strong>Duration:</strong> {call.duration} mins</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
