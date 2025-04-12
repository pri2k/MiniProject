// import Volunteer from '../../../models/volunteer';
// import mongoose from 'mongoose';
// import Card from '@/components/Card';
// import problemCategories from "../../../data/groups";

// async function getVolunteersByProblem(problemTitle) {
//     await mongoose.connect(process.env.MONGO_URI)
//     const volunteers = await Volunteer.find({ problem: { $in: [problemTitle] } })
//     return volunteers;
// }

// export default async function VolunteersPage({ params }) {
//     const { problemSlug } = await params;

//     const matchedCategory = problemCategories.find(cat => cat.slug === problemSlug)
//     const problemTitle = matchedCategory?.title || problemSlug.replace(/-/g, ' ')

//     const volunteers = await getVolunteersByProblem(problemTitle)

//     return (
//         <div className="max-w-4xl mx-auto px-4 py-6 mt-[10em] text-center">
//         <h1 className="text-2xl font-bold mb-6 capitalize">
//             Volunteers for: {problemTitle}
//         </h1>
//         {volunteers.length === 0 ? (
//             <p>No volunteers found for this issue.</p>
//         ) : (
//             <div className="grid gap-5 sm:grid-cols-2">
//             {volunteers.map((v) => (
//                 <Card key={v._id}>
//                 <div className="p-4 flex gap-4 items-start">
//                     <img
//                         src={v.image}
//                         alt={v.name}
//                         width={80}
//                         height={80}
//                         className="rounded-full object-cover"
//                     />
//                     <div>
//                     <h2 className="text-xl font-semibold">{v.name}</h2>
//                     <p className="text-sm text-gray-600 mb-2">{v.description}</p>
//                     <p className="text-sm text-gray-500">
//                         <strong>Age:</strong> {v.age} | <strong>Chats:</strong> {v.chatCnt}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                         <strong>Problems:</strong> {v.problem.join(', ')}
//                     </p>
//                     </div>
//                 </div>
//                 </Card>
//             ))}
//             </div>
//         )}
//         </div>
//     )
// }

'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Card from '@/components/Card'
import problemCategories from '../../../data/groups'

export default function VolunteersPage() {
    const { slug } = useParams()
    const [volunteers, setVolunteers] = useState([])
    const [selectedVolunteer, setSelectedVolunteer] = useState(null)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [duration, setDuration] = useState('30')

    const matchedCategory = problemCategories.find(cat => cat.slug === slug)
    const problemTitle = matchedCategory?.title || slug.replace(/-/g, ' ')

    useEffect(() => {
        async function fetchVolunteers() {
            const res = await fetch(`/api/volunteer/${slug}`)
            const data = await res.json()
            if (data.success) {
                setVolunteers(data.volunteers)
            }
        }
        fetchVolunteers()
    }, [slug])

    function handleBookCall() {
        console.log({
            volunteerId: selectedVolunteer._id,
            date,
            time,
            duration,
        })
        setSelectedVolunteer(null)
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 mt-[10em] text-center">
            <h1 className="text-2xl font-bold mb-6 capitalize">
                Volunteers for: {problemTitle}
            </h1>
            {volunteers.length === 0 ? (
                <p>No volunteers found for this issue.</p>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                    {volunteers.map((v) => (
                        <Card key={v._id} onClick={() => setSelectedVolunteer(v)} className="cursor-pointer">
                            <div className="p-4 flex gap-4 items-start">
                                <img
                                    src={v.image}
                                    alt={v.name}
                                    width={80}
                                    height={80}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold">{v.name}</h2>
                                    <p className="text-sm text-gray-600 mb-2">{v.description}</p>
                                    <p className="text-sm text-gray-500">
                                        <strong>Age:</strong> {v.age} | <strong>Chats:</strong> {v.chatCnt}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        <strong>Problems:</strong> {v.problem.join(', ')}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {selectedVolunteer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-2">Book Call with {selectedVolunteer.name}</h2>
                        <label className="block mb-2">
                            Date:
                            <input
                                type="date"
                                className="block w-full border border-gray-300 rounded px-2 py-1 mt-1"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </label>
                        <label className="block mb-2">
                            Time:
                            <input
                                type="time"
                                className="block w-full border border-gray-300 rounded px-2 py-1 mt-1"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </label>
                        <label className="block mb-4">
                            Duration (minutes):
                            <select
                                className="block w-full border border-gray-300 rounded px-2 py-1 mt-1"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            >
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="60">60</option>
                            </select>
                        </label>
                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleBookCall}
                            >
                                Confirm Booking
                            </button>
                            <button
                                className="text-gray-500 hover:text-black"
                                onClick={() => setSelectedVolunteer(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
