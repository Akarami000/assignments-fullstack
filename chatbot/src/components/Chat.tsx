// src/components/Chat.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatbotResponse } from '../Redux/Action/ChatAction';
import { RootState, AppDispatch } from '../Redux/Store/store';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatbotResponse {
  sessionId: string;
  message: string;
}

export default function Chat() {
  const dispatch = useDispatch<AppDispatch>();
  const { message, loading, error } = useSelector((state: RootState) => state.chat);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [waitingBotResponse, setWaitingBotResponse] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const sessionId = '12345';
    const payload: ChatbotResponse = {
      sessionId,
      message: input,
    };

    const userMsg: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setWaitingBotResponse(true);
    dispatch(fetchChatbotResponse(payload));
  };

  useEffect(() => {
    if (waitingBotResponse && message) {
      const botMsg: Message = { sender: 'bot', text: message.response };
      setMessages((prev) => [...prev, botMsg]);
      setWaitingBotResponse(false);
    }
  }, [message]);

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
        {loading && (
          <div className="text-left my-2">
            <span className="inline-block px-4 py-3 rounded bg-gray-100 italic">Bot is typing...</span>
          </div>
        )}
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