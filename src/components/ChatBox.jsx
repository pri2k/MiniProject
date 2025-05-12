'use client'


import { useState, useEffect, useContext } from 'react'
import { X } from 'lucide-react'
import BookCallForm from './BookCallForm'
import { UserContext } from '../context/UserContext'

export default function ChatBox({ person }) {
    const { user } = useContext(UserContext)
    const [messages, setMessages] = useState([])
    const [userMessage, setUserMessage] = useState("")
    const [remainingMessages, setRemainingMessages] = useState(5)
    const [isBookCallFormVisible, setIsBookCallFormVisible] = useState(false)
    const [selectedVolunteer, setSelectedVolunteer] = useState(person)

    // console.log("person in chat box", person)    

    const sendVolunteerReply = (userMsg) => {
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: person.name, text: `Reply to: "${userMsg}"` }
            ])
        }, 1000)
    }

    const handleMessageSend = async () => {
        if (remainingMessages > 0 && userMessage.trim()) {
            setMessages([...messages, { sender: 'You', text: userMessage }])
            setRemainingMessages(remainingMessages - 1)
            setUserMessage("")
            sendVolunteerReply(userMessage)
        }

        try {
            // console.log("userId", user.id)
            // console.log("personId", person._id)
            await fetch('/api/myChats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senderId: user.id,
                    receiverId: person._id
                })
            })
        } catch (err) {
            console.error("Failed to update chat contacts", err)
        }
    }

    const handleInputChange = (e) => {
        setUserMessage(e.target.value)
    }

    const handleProceedToBookCall = () => {
        setIsBookCallFormVisible(true)
    }

    const handleCloseBookCallForm = () => {
        setIsBookCallFormVisible(false)
    }

    const handleCloseChat = () => {
        setSelectedVolunteer(null)
    }

    return (
        <div className="w-[70%] h-full bg-white rounded-xl shadow-lg p-4 pt-10 relative overflow-hidden mt-20">
            {!isBookCallFormVisible && (
                <>
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-black">
                        <X />
                    </button>

                    {/* Top Bar */}
                    <div className="flex items-center justify-between mb-4 mt-5">
                        <div className="flex items-center gap-3">
                            <img
                                src={person?.image || '/images/default.jpg'}
                                alt={person?.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{person?.name}</h2>
                            </div>
                        </div>
                        <button
                            onClick={handleProceedToBookCall}
                            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all duration-300"
                        >
                            Proceed to Book Call
                        </button>
                    </div>

                    {/* Info Line */}
                    <p className="text-sm text-gray-600 text-center">
                        {remainingMessages > 0
                            ? `${remainingMessages} messages left.`
                            : 'No more messages can be sent. Subscribe to send more.'}
                    </p>
                    <p className="text-xs text-gray-400 text-center mb-4">
                        Only 5 messages are available for free. Additional messages will require a subscription.
                    </p>

                    {/* Chat Section */}
                    <div className="h-[60%] overflow-y-auto border p-3 rounded-lg mb-3">
                        {messages.length === 0 ? (
                            <p className="text-gray-400 text-center">No messages yet</p>
                        ) : (
                            messages.map((msg, i) => (
                                <div key={i} className={`mb-2 flex ${msg.sender === 'You' ? 'justify-end' : ''}`}>
                                    <div
                                        className={`max-w-xs p-2 rounded-lg ${msg.sender === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                    >
                                        <span className="font-semibold">{msg.sender}:</span>
                                        <span> {msg.text}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2 sticky bottom-0 bg-white">
                        <input
                            type="text"
                            className="flex-1 border rounded-lg px-3 py-2"
                            placeholder={remainingMessages > 0 ? "Type your message..." : "No more messages can be sent."}
                            value={userMessage}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && userMessage.trim()) {
                                    handleMessageSend()
                                }
                            }}
                            disabled={remainingMessages === 0}
                        />
                        <button
                            onClick={handleMessageSend}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                            disabled={remainingMessages === 0}
                        >
                            Send
                        </button>
                    </div>
                </>
            )}

            {isBookCallFormVisible && (
                <BookCallForm
                    selectedVolunteer={person}
                    setSelectedVolunteer={person}
                    handleBackToChat={handleCloseBookCallForm}
                />
            )}
        </div>
    )
}
