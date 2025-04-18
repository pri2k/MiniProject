// "use client";

// import { useEffect, useState, useContext } from 'react';
// import { UserContext } from '@/context/UserContext';
// import Card from '@/components/Card';

// export default function MyCallsPage() {
//     const { user } = useContext(UserContext);
//     const [userCalls, setUserCalls] = useState([]);
//     const [volunteerCalls, setVolunteerCalls] = useState([]);

//     useEffect(() => {
//         async function fetchCalls() {
//             const res = await fetch(`/api/myCalls?userId=${user?.id}`);
//             const data = await res.json();
//             if (data.success) {
//                 setUserCalls(data.userCalls || []);
//                 setVolunteerCalls(data.volunteerCalls || []);
//             }
//         }

//         if (user?.id) {
//             fetchCalls();
//         }
//     }, [user]);

//     function canJoinCall(call) {
//         const callTime = new Date(call.time);
//         const now = new Date();
//         return now >= callTime && now <= new Date(callTime.getTime() + call.duration * 60000);
//     }

//     function isCallOver(call) {
//         const callTime = new Date(call.time);
//         return new Date() > new Date(callTime.getTime() + call.duration * 60000);
//     }

//     async function handleJoinCall(call) {
//         let roomUrl = call.roomUrl;
//         if (!roomUrl) {
//             const res = await fetch('/api/createRoom');
//             const data = await res.json();
//             roomUrl = data.url;
//         }
//         window.open(roomUrl, '_blank', 'width=800,height=600');
//     }

//     function renderCallCard(call, otherPerson, isVolunteerView) {

//         // console.log('otherPerson:', otherPerson);
//         // console.log('isVolunteerView:', isVolunteerView);
//         return (
//             <Card key={call._id} className="p-4 mb-4 cursor-pointer hover:bg-gray-100 flex gap-4 items-center">
//                 <img
//                     src={otherPerson?.image || '/images/default.jpg'}
//                     alt={isVolunteerView ? 'User' : 'Volunteer'}
//                     width={50}
//                     height={50}
//                     className="rounded-full"
//                 />
//                 <div>
//                     <p>
//                         <strong>{isVolunteerView ? 'User' : 'Volunteer'}:</strong> {otherPerson?.username || 'N/A'}
//                     </p>
//                     <p><strong>Time:</strong> {new Date(call.time).toLocaleString()}</p>
//                     <p><strong>Duration:</strong> {call.duration} mins</p>

//                     {isCallOver(call) ? (
//                         <span className="text-red-500">Call time over</span>
//                     ) : canJoinCall(call) ? (
//                         <button onClick={() => handleJoinCall(call)}>Join Call</button>
//                     ) : (
//                         <span>Call not started</span>
//                     )}
//                 </div>
//             </Card>
//         );
//     }

//     console.log('userCalls:', userCalls);
//     console.log('volunteerCalls:', volunteerCalls);

//     return (
//         <div className="mt-[10em] px-4">
//             <h1 className="text-2xl font-bold mb-6">Your Scheduled Calls</h1>
//             <div>
//                 <h2 className="text-xl font-semibold mb-4">As User</h2>
//                 {userCalls.length === 0 ? (
//                     <p>No calls where you're the user.</p>
//                 ) : (
//                     userCalls.map(call => {
//                         let volunteerInfo = null;
//                         if (call.userId) {
//                             volunteerInfo = call.userId;
//                         }
//                         // console.log('call.userId',  call.userId); // This will log each volunteerInfo during render
//                         // console.log('volunteerInfo',  volunteerInfo); // This will log each volunteerInfo during render
//                         return renderCallCard(call, volunteerInfo, false);
//                     })
//                 )}
//             </div>


//             <div className="mt-8">
//                 <h2 className="text-xl font-semibold mb-4">As Volunteer</h2>
//                 {volunteerCalls.length === 0 ? (
//                     <p>No calls where you're a volunteer.</p>
//                 ) : (
//                     volunteerCalls.map(call => {
//                         const userInfo = call.userId;
//                         return renderCallCard(call, userInfo, true);
//                     })
//                 )}
//             </div>
//         </div>
//     );
// }


"use client";

import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import Card from '@/components/Card';

export default function MyCallsPage() {
    const { user } = useContext(UserContext);
    const [userCalls, setUserCalls] = useState([]);
    const [volunteerCalls, setVolunteerCalls] = useState([]);

    useEffect(() => {
        async function fetchCalls() {
            const res = await fetch(`/api/myCalls?userId=${user?.id}`);
            const data = await res.json();
            if (data.success) {
                setUserCalls(data.userCalls || []);
                setVolunteerCalls(data.volunteerCalls || []);
            }
        }

        if (user?.id) {
            fetchCalls();
        }
    }, [user]);

    function canJoinCall(call) {
        const callTime = new Date(call.time);
        const now = new Date();
        return now >= callTime && now <= new Date(callTime.getTime() + call.duration * 60000);
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
        window.open(roomUrl, '_blank', 'width=800,height=600');
    }

    function renderCallCard(call, otherPerson, roleLabel) {
        return (
            <Card key={call._id} className="p-4 mb-4 cursor-pointer hover:bg-gray-100 flex gap-4 items-center">
                <img
                    src={otherPerson?.image || '/images/default.jpg'}
                    alt={roleLabel}
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <div>
                    <p><strong>{roleLabel}:</strong> {otherPerson?.username || 'N/A'}</p>
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

    return (
        <div className="mt-[10em] px-4">
            <h1 className="text-2xl font-bold mb-6">Your Scheduled Calls</h1>

            <div>
                <h2 className="text-xl font-semibold mb-4">As User</h2>
                {userCalls.length === 0 ? (
                    <p>No calls where you're the user.</p>
                ) : (
                    userCalls.map(call => {
                        const volunteerInfo = call.volunteerId;
                        return renderCallCard(call, volunteerInfo, "Volunteer");
                    })
                )}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">As Volunteer</h2>
                {volunteerCalls.length === 0 ? (
                    <p>No calls where you're a volunteer.</p>
                ) : (
                    volunteerCalls.map(call => {
                        const userInfo = call.userId;
                        return renderCallCard(call, userInfo, "User");
                    })
                )}
            </div>
        </div>
    );
}
