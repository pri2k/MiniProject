'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Card from '@/components/Card'
import problemCategories from '../../../data/groups'
import { useContext } from 'react'
import { UserContext } from '@/context/UserContext'
// MUI Time Picker Imports
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

export default function VolunteersPage() {
    const { slug } = useParams()
    const [volunteers, setVolunteers] = useState([])
    const [selectedVolunteer, setSelectedVolunteer] = useState(null)
    const [date, setDate] = useState('')
    const [time, setTime] = useState(null)
    const [duration, setDuration] = useState('30')

    const matchedCategory = problemCategories.find(cat => cat.slug === slug)
    const problemTitle = matchedCategory?.title || slug.replace(/-/g, ' ')

    const { user } = useContext(UserContext);

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

    async function handleBookCall() {
        if (!date || !time) return alert('Please select both date and time.')
        if (!user) return alert('Please log in to book a call.')
    
        const selectedDateTime = new Date(`${date}T${time.format('HH:mm')}`)
    
        const res = await fetch('/api/bookCall', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                volunteerId: selectedVolunteer._id,
                time: selectedDateTime,
                duration: parseInt(duration),
            }),
        })
    
        const data = await res.json()
        if (data.success) {
            alert('Booking successful!')
            setSelectedVolunteer(null)
            setDate('')
            setTime(null)
            setDuration('30')
        } else {
            alert('Booking failed: ' + data.message)
        }
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-[8%]">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            Book Call with {selectedVolunteer.name}
                        </h2>

                        <div className="mb-4 text-center">
                            <img
                                src={selectedVolunteer.image}
                                alt={selectedVolunteer.name}
                                className="w-32 h-32 rounded-full object-cover mx-auto"
                            />
                        </div>

                        <label className="block mb-3 text-left">
                            Date:
                            <input
                                type="date"
                                className="block w-full border border-gray-300 rounded px-3 py-2 mt-1"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </label>

                        <label className="block mb-3 text-left z-9999999">
                            Time:
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label=""
                                    value={time}
                                    onChange={(newVal) => setTime(newVal)}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: 'small',
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </label>


                        <label className="block mb-4 text-left">
                            Duration (minutes):
                            <select
                                className="block w-full border border-gray-300 rounded px-3 py-2 mt-1"
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
                                className="bg-[#D7A529] text-white px-4 py-2 rounded hover:text-black"
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
