// src/components/Chat.tsx
import React from 'react';
import { useState } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: 'user', text: input };
    const botMsg: Message = { sender: 'bot', text: `You said: ${input}` };

    setMessages([...messages, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="border rounded p-6 h-[500px] overflow-y-auto bg-white shadow">
        {messages.map((msg, idx) => (
          <div key={idx} className={`my-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-4 py-3 rounded ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex mt-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded-l px-4 py-3"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-5 py-3 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}