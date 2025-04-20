'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Card from '../../../components/Card'
import problemCategories from '../../../data/groups'
import { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import PopupModal from '../../../components/PopupModal'  // Assuming the PopupModal component is in this path
import SubmitButton from '../../../components/SubmitButton' // Assuming the SubmitButton component is in this path
// MUI Time Picker Imports
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs';

export default function VolunteersPage() {
    const { slug } = useParams()
    const [volunteers, setVolunteers] = useState([])
    const [selectedVolunteer, setSelectedVolunteer] = useState(null)
    const [date, setDate] = useState('')
    const [time, setTime] = useState(null)
    const [duration, setDuration] = useState('30')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [modalSuccess, setModalSuccess] = useState(false)
    const [loading, setLoading] = useState(false)  // Loading state for booking call
    const [volunteersLoading, setVolunteersLoading] = useState(true) // Loading state for volunteers

    const matchedCategory = problemCategories.find(cat => cat.slug === slug)
    const problemTitle = matchedCategory?.title || slug.replace(/-/g, ' ')

    const { user } = useContext(UserContext);

    useEffect(() => {
        async function fetchVolunteers() {
            const url = user 
                ? `/api/volunteer/${slug}?userId=${user?.id}` 
                : `/api/volunteer/${slug}`;
            
            setVolunteersLoading(true); // Start loading before fetching
            const res = await fetch(url);
            const data = await res.json();
    
            if (data.success) {
                setVolunteers(data.volunteers);
            }
            setVolunteersLoading(false); // End loading after fetching
        }
    
        fetchVolunteers();
    }, [slug, user]);

    async function handleBookCall() {
        if (!date || !time) {
            setModalMessage('Please select both date and time.')
            setModalSuccess(false)
            setIsModalOpen(true)
            return
        }

        if (!user) {
            setModalMessage('Please log in to book a call.')
            setModalSuccess(false)
            setIsModalOpen(true)
            return
        }
    
        setLoading(true);  // Start loading when user clicks the button

        const selectedDateTime = new Date(`${date}T${time.format('HH:mm')}`)
    
        const res = await fetch('/api/bookCall', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user?.id,
                volunteerId: selectedVolunteer?.userId?._id, // ✅ actual user ID of volunteer
                time: selectedDateTime,
                duration: parseInt(duration),
            }),
        })
    
        const data = await res.json();
        setLoading(false);  // End loading when the response is received
        
        if (res.ok && data.success) {
            setModalMessage('Booking successful!')
            setModalSuccess(true)
            setIsModalOpen(true)
            setSelectedVolunteer(null)
            setDate('')
            setTime(null)
            setDuration('30')
        } else {
            setModalMessage('Booking failed: ' + data.message)
            setModalSuccess(false) // 🛠️ ensure it's false!
            setIsModalOpen(true)
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 marginCall text-center">
            <h1 className="text-2xl font-bold mb-6 capitalize">
                Volunteers for: {problemTitle}
            </h1>
            
            {/* Show loading message if volunteers are still being fetched */}
            {volunteersLoading ? (
                <p>Loading volunteers...</p>
            ) : volunteers.length === 0 ? (
                <p>No volunteers found for this issue.</p>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                    {volunteers.map((v) => (
                        <Card key={v._id} onClick={() => setSelectedVolunteer(v)} className="cursor-pointer">
                            <div className="p-4 flex flex-col items-center gap-4">
                                <img
                                    src={v.userId?.image || '/images/default.jpg'} // Fallback image if userId is not available
                                    alt={v.userId?.username}
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold">{v.userId?.username}</h2>
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 marginSlug">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-center">
                            Book Call with {selectedVolunteer.userId?.username}
                        </h2>

                        <div className="mb-4 text-center">
                            <img
                                src={selectedVolunteer.userId?.image || '/images/default.jpg'} // Fallback image if userId is not available
                                alt={selectedVolunteer.userId?.username}
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

                        <div className="justify-between mt-4">
                            <SubmitButton
                                onClick={handleBookCall}
                                loading={loading}  // Pass loading state to SubmitButton
                            >
                                Confirm Booking
                            </SubmitButton>
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

            {/* Popup Modal for displaying success/error messages */}
            {isModalOpen && (
                <PopupModal
                    message={modalMessage}
                    type={modalSuccess ? "success" : "error"} // ✅ Correct prop
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )
}
