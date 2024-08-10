"use client";
import React, { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full justify-between bg-white shadow-lg rounded-lg p-6">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`w-[90%] p-3 rounded-lg my-2 text-sm ${
              message.sender === "ai"
                ? "bg-[#E9F1FA] text-[#00ABE4] mx-auto"
                : "bg-[#00ABE4] text-white mx-auto"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex items-center border-t border-gray-200 pt-4">
        <input
          type="text"
          className="flex-grow p-2 border border-indigo-300 rounded-l-lg"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-[#00ABE4] text-white p-2 rounded-r-lg hover:bg-[#0097D3]"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
