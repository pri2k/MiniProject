'use client'
import { useState } from 'react'
import { Bot } from 'lucide-react'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm here to listen. How are you feeling today?" }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    const userMessage = { sender: 'user', text: input }
    const botMessage = { sender: 'bot', text: "I'm here for you ❤️" }

    setMessages(prev => [...prev, userMessage, botMessage])
    setInput('')
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-10 right-5 bgMain text-white p-3 rounded-full shadow-lg hover:bgMain transition-all duration-300 z-50"
      >
        <Bot />
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 w-80 maxh bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col z-50">
          <div className="p-3 font-bold border-b">Chat with us</div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm p-2 rounded-lg max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bgMain self-end ml-auto'
                    : 'bg-gray-100 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex border-t p-2">
            <input
              className="flex-1 text-sm p-2 border rounded-l-md outline-none"
              type="text"
              placeholder="Type something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bgMain text-white px-4 rounded-r-md hover:bgMain transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
