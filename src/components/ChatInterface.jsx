'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SendHorizonal } from 'lucide-react'

export default function ChatInterface({ title, apiEndpoint, icon, receiverRole }) {
  const [messages, setMessages] = useState([
    { sender: receiverRole, text: `Hi! I’m ${title}. How can I help you?` },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMsg = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    scrollToBottom()

    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: [...messages, userMsg] }),
      })

      const data = await res.json()
      const replyText = data.reply || 'Sorry, I have no response.'
      const replySender = receiverRole

      const estimatedTime = Math.min(Math.max(replyText.length, 300), 1800)

      setTimeout(() => {
        setMessages(prev => [...prev, { sender: replySender, text: replyText }])
        setIsTyping(false)
        scrollToBottom()
      }, estimatedTime)
    } catch {
      setMessages(prev => [...prev, { sender: receiverRole, text: 'Oops! Something went wrong 🥺' }])
      setIsTyping(false)
    }
  }

  useEffect(scrollToBottom, [messages])

  return (
    <div className="flex flex-col h-screen bg-[#fffbea] text-black ptop">
      <div className="bg-yellow-100 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-yellow-500">{icon}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl shadow relative break-words ${
                msg.sender === 'user' ? 'bg-yellow-200' : 'bg-gray-100'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-2 flex space-x-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="bg-white border-t border-yellow-200 px-4 py-3 flex justify-center">
        <div className="flex items-center w-full max-w-2xl border border-gray-300 rounded-full px-3 py-2 bg-white shadow-sm">
          <textarea
            className="w-full resize-none overflow-hidden focus:outline-none bg-transparent"
            placeholder="Type your message..."
            value={input}
            style={{ maxHeight: '300px' }}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
          />
          <button
            className="bg-yellow-300 hover:bg-yellow-400 text-white p-3 rounded-full"
            onClick={sendMessage}
          >
            <SendHorizonal size={28} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
