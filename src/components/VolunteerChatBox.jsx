'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import BookCallForm from '../components/BookCallForm' // Make sure this component is imported

export default function VolunteerChatBox({ volunteer, onClose }) {
    const [messages, setMessages] = useState([])
    const [userMessage, setUserMessage] = useState("")
    const [remainingMessages, setRemainingMessages] = useState(5) // Track remaining messages
    const [isBookCallFormVisible, setIsBookCallFormVisible] = useState(false) // State to manage visibility of the BookCallForm
    const [selectedVolunteer, setSelectedVolunteer] = useState(volunteer) // Initialize selectedVolunteer state with volunteer prop

    // Simulate volunteer response after a delay
    const sendVolunteerReply = (userMsg) => {
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: volunteer.userId?.name, text: `Reply to: "${userMsg}"` }
            ])
        }, 1000)  // Simulate a 1-second delay for volunteer reply
    }

    const handleMessageSend = () => {
        if (remainingMessages > 0 && userMessage.trim()) {
            // Add user's message to the state
            setMessages([...messages, { sender: 'You', text: userMessage }])
            setRemainingMessages(remainingMessages - 1) // Decrease the remaining messages count
            // Clear the input field
            setUserMessage("")

            // Simulate volunteer's reply
            sendVolunteerReply(userMessage)
        }
    }

    const handleInputChange = (e) => {
        setUserMessage(e.target.value)
    }

    const handleProceedToBookCall = () => {
        setIsBookCallFormVisible(true) // Show the BookCallForm
    }

    const handleCloseBookCallForm = () => {
        setIsBookCallFormVisible(false) // Hide the BookCallForm
    }

    console.log("VolunteerChatBox props:", volunteer);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
            {!isBookCallFormVisible && (<div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-4 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
                    <X />
                </button>

                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4 mt-5">
                    <div className="flex items-center gap-3">
                        <img
                            src={volunteer.userId?.image || '/images/default.jpg'}
                            alt={volunteer.userId?.name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="text-lg font-semibold">{volunteer.userId?.name}</h2>
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
                <p className="text-xs text-gray-400 text-center mb-4">Only 5 messages are available for free. Additional messages will require a subscription.</p>

                {/* Chat Section */}
                <div className="h-64 overflow-y-auto border p-3 rounded-lg mb-3">
                    {messages.length === 0 ? (
                        <p className="text-gray-400 text-center">No messages yet</p>
                    ) : (
                        messages.map((msg, i) => (
                            <div key={i} className={`mb-2 flex ${msg.sender === 'You' ? 'justify-end' : ''}`}>
                                <div
                                    className={`max-w-xs p-2 rounded-lg ${msg.sender === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    <span className="font-semibold">{msg.sender}:</span>
                                    <span>{msg.text}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 border rounded-lg px-3 py-2"
                        placeholder={remainingMessages > 0 ? "Type your message..." : "No more messages can be sent. Subscribe to send more."}
                        value={userMessage}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && userMessage.trim()) {
                                handleMessageSend()
                            }
                        }}
                        disabled={remainingMessages === 0} // Disable input when no messages are left
                    />
                    <button
                        onClick={handleMessageSend}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                        disabled={remainingMessages === 0} // Disable button when no messages are left
                    >
                        Send
                    </button>
                </div>
            </div>)}

            {/* Book Call Form Popup */}
            {isBookCallFormVisible && <BookCallForm selectedVolunteer={selectedVolunteer} setSelectedVolunteer={setSelectedVolunteer} />}
        </div>
    )
}
