"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "You" }]);
    setInput(""); // Clear input field
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-80 bg-white/50 dark:bg-neutral-900/50 border border-gray-300 dark:border-neutral-700 shadow-2xl backdrop-blur-lg rounded-xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-neutral-800 dark:to-neutral-900 text-black font-semibold shadow-md">
        Chat
      </div>

      {/* Messages Display */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">Start a conversation...</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
              <span
                className={`px-4 py-2 text-sm rounded-xl shadow-md ${
                  msg.sender === "You"
                    ? "bg-blue-600 text-black"
                    : "bg-gray-200 dark:bg-neutral-800 text-black dark:text-white"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Input Box */}
      <div className="flex items-center p-2 border-t bg-gradient-to-r from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-900">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 text-sm bg-black/80 dark:bg-neutral-900/80 rounded-lg border focus:outline-none dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 transition"
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          type="button"
          title="Send Message"
          onClick={sendMessage}
          className="ml-2 p-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg shadow-lg transition"
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
