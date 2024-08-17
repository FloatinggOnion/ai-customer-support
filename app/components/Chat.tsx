"use client";
import React, { useState } from "react";

import axios from "axios";

interface message {
  role: string;
  parts: {text: string}[];
}

const Chat = () => {
	const [messages, setMessages] = useState<message[]>([
    { role: 'model', parts: [{ text: 'Hello, how can I help you today?' }] }
  ]);
	const [input, setInput] = useState("");

	const handleSend = async () => {
		if (input.trim()) {
			const userMessage = { role: "user", parts: [{ text: input }] };
    setInput("");
    setMessages([...messages, userMessage]);
			
      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const res = await axios.post(
          "/api/chat",
          input,
          {
            headers: headers,
            timeout: 20000,
            timeoutErrorMessage: "Request timed out",
          }
        );
        console.log(res);
        const aiMessage = { role: "model", parts: [{ text: res?.data }] };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error querying:", error);
        // setResult("Error querying");
      }
		}
	};

	return (
		<div className="flex flex-col h-full justify-between bg-white shadow-lg rounded-lg p-6">
			<div className="flex-grow overflow-y-auto mb-4">
				{messages.map((message) => (
					<div
						key={message.parts[0].text}
						className={`w-[90%] p-3 rounded-lg my-2 text-sm ${
							message.role === "model"
								? "bg-[#E9F1FA] text-[#00ABE4] mx-auto"
								: "bg-[#00ABE4] text-white mx-auto"
						}`}
					>
						{message.parts[0].text}
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
