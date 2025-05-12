"use client";
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../../context/UserContext'
import ChatBox from '../../../components/ChatBox'
import { useParams } from 'next/navigation'

export default function HistoryPage() {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const [otherPerson, setOtherPerson] = useState(null)
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch(`/api/user/${id}`)
            const data = await res.json()
            if (data.success) setOtherPerson(data.user)
            console.log("data : ", data)
        }
        fetchUser()
    }, [id])

    useEffect(() => {
        async function fetchContacts() {
            if (!user?.id) return
            const res = await fetch(`/api/myChats?userId=${user.id}`)
            const data = await res.json()
            if (data.success) setContacts(data.contacts)
            console.log("contacts", data.contacts)
        }
        fetchContacts()
    }, [user])

    return (
        <div className="min-h-screen flex pt-20 mt-20">
            {/* Chat History - 30% */}
            <div className="w-[30%] border-r border-gray-300 p-6">
                <h2 className="text-xl font-semibold mb-4">Chat History</h2>
                {contacts.length === 0 ? (
                    <p className="text-gray-500 text-sm">No chats yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {contacts.map((c) => (
                            <li key={c._id} className="flex items-center gap-3 bg-gray-100 p-3 rounded">
                                <img
                                    src={c.image || '/images/default.jpg'}
                                    alt={c.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium">{c.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Chat Box - 70% */}
            <div className="w-[70%] p-6 flex items-center justify-center">
                <ChatBox person={otherPerson} />
            </div>
        </div>
    )
}
