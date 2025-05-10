// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { SendHorizonal, HeartHandshake } from 'lucide-react';

// export default function TalkToChatbot() {
//   const [messages, setMessages] = useState([
//     { sender: 'bot', text: 'Hi there! I\'m here to listen ' },
//   ]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const chatEndRef = useRef(null);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput('');
//     setIsTyping(true);
//     scrollToBottom();

//     try {
//       const res = await fetch('/api/chatbot', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           message: input,
//           history: [...messages, userMsg],
//         }),
//       });

//       const data = await res.json();
//       const botReply = data.reply || "I'm here for you 💛";

//       const estimatedTime = Math.min(Math.max(botReply.length, 300), 1800);

//       setIsTyping(true);

//       setTimeout(() => {
//         setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
//         setIsTyping(false);
//         scrollToBottom();
//       }, estimatedTime);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         { sender: 'bot', text: 'Oops! Something went wrong 🥺' },
//       ]);
//       setIsTyping(false);
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-screen bgfffbea text-black-800 ptop bg-black">
//       {/* Header */}
//       <div className="bg-yellow-100 px-4 py-3 flex items-center justify-between shadow-md">
//         <div className="text-xl font-semibold">Chat with Hope Bot</div>
//         <div className="text-yellow-500">
//           <HeartHandshake size={45} strokeWidth={2.2} />
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
//         {messages.map((msg, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`maxw px-4 py-2 rounded-2xl shadow relative break-words ${
//                 msg.sender === 'user'
//                   ? 'bg-yellow-200 text-right'
//                   : 'bg-gray-100 text-left'
//               }`}
//             >
//               {msg.text}
//             </div>
//           </motion.div>
//         ))}

//         {/* Typing indicator */}
//         {isTyping && (
//           <div className="flex justify-start">
//             <div className="bg-gray-100 rounded-2xl px-4 py-2 flex space-x-1">
//               <div
//                 className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                 style={{ animationDelay: '0s' }}
//               />
//               <div
//                 className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                 style={{ animationDelay: '0.2s' }}
//               />
//               <div
//                 className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                 style={{ animationDelay: '0.4s' }}
//               />
//             </div>
//           </div>
//         )}

//         <div ref={chatEndRef} />
//       </div>

//       {/* Input */}
//       <div className="bg-white border-t border-yellow-200 px-4 py-3 flex justify-center">
//         <div className="flex items-center w-full maxwo border border-gray-300 rounded-full px-3 py-2 bg-white shadow-sm">
//           <textarea
//             className="w-full resize-none overflow-hidden text-base md:text-md focus:outline-none bg-transparent"
//             placeholder="Type your message..."
//             value={input}
//             style={{ maxHeight: '300px' }}
//             onChange={(e) => {
//               const value = e.target.value;
//               const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
//               setInput(capitalized);
//             }}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 sendMessage();
//               }
//             }}
//           />
//           <button
//             className="bg-yellow-300 hover:bg-yellow-400 text-white p-3 rounded-full flex items-center justify-center"
//             onClick={sendMessage}
//           >
//             <SendHorizonal size={32} strokeWidth={2.5} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/chatbot/page.jsx
'use client'
import ChatInterface from '../../components/ChatInterface'
import { Bot } from 'lucide-react'

export default function ChatbotPage() {
  return (
    <ChatInterface
      title="Hope Bot"
      apiEndpoint="/api/chatbot"
      icon={<Bot size={36} />}
      receiverRole="bot"
    />
  )
}
