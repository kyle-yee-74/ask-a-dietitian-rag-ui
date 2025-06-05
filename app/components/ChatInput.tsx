import React, { useState, useRef, useEffect } from "react";

type Props = {
  onSend: (message: string) => void;
  botIsTyping: boolean;
};

export const ChatInput = ({ onSend, botIsTyping }: Props) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim() || botIsTyping) return;
    onSend(message.trim()); // send the message up
    setMessage(""); // reset the input
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleSubmit(); // Send message
    }
  };
  return (
    <div className="w-full fixed bottom-4 max-w-2xl mx-auto p-4">
      <div className="flex border rounded-lg p-2 bg-white shadow-md">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleEnterKeyDown}
          rows={1}
          placeholder="Ask a dietitian..."
          className="flex-1 resize-none overflow-hidden outline-none bg-transparent text-base max-h-48"
        />
        <button
          onClick={handleSubmit}
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!message.trim() || botIsTyping}
        >
          Send
        </button>
      </div>
    </div>
  );
};
