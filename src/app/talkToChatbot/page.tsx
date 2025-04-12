'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal } from 'lucide-react';
import { HeartHandshake } from 'lucide-react';
import '../globals.css';


export default function TalkToChatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! I’m here to listen ' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    scrollToBottom();
  
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: [...messages, userMsg], 
        }),
      });
  
      const data = await res.json();
      const botReply = data.reply || "I'm here for you 💛";
  
      const estimatedTime = Math.min(Math.max(botReply.length * 5, 300), 2000);
  
      setIsTyping(true);
  
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
        setIsTyping(false);
        scrollToBottom();
      }, estimatedTime);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Oops! Something went wrong 🥺' },
      ]);
      setIsTyping(false);
    }
  };
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-[#fffbea] text-black-800 pt-[155px]">
      {/* Header */}
      <div className="bg-yellow-100 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="text-xl font-semibold">Chat with Brighter Beyond Bot</div>
        <div className="text-yellow-500">
    <HeartHandshake size={45} strokeWidth={2.2} />
  </div>
      </div>

      {/* Messages */}
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
              className={`max-w-md px-4 py-2 rounded-2xl shadow relative ${
                msg.sender === 'user'
                  ? 'bg-yellow-200 text-right user-bubble'
                  : 'bg-gray-100 text-left bot-bubble'
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-2 flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-yellow-200 px-4 py-3 flex justify-center">
      <div className="flex items-center w-full max-w-[900px] border border-gray-300 rounded-full px-3 py-2 bg-white shadow-sm">

        <textarea
          
          className="w-full resize-none overflow-hidden text-base md:text-md focus:outline-none bg-transparent"
          placeholder="Type your message..."
          value={input}
          style={{maxHeight: '300px'}}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          
        />
        <button
  className="bg-yellow-300 hover:bg-yellow-400 text-white p-3 rounded-full flex items-center justify-center"
 
  onClick={sendMessage}
>
  <SendHorizonal size={32} strokeWidth={2.5} />
</button>

      </div>
      </div>
    </div>
  );
}
