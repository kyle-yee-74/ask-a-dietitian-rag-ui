import type { Message } from "~/types/message";
import { useRef, useEffect } from "react";
export const MessageContainer = ({
  messages,
  botIsTyping,
}: {
  messages: Message[];
  botIsTyping: boolean;
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto space-y-2 pb-32 bg-white rounded shadow">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded break-words ${
            msg.role === "user"
              ? "bg-blue-200 self-end max-w-xs text-right ml-auto "
              : "self-start text-left mr-auto"
          }`}
        >
          {msg.content}
        </div>
      ))}
      {botIsTyping && (
        <div className="p-2 rounded self-start text-left mr-auto">
          <div className="inline-flex gap-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-150">.</span>
            <span className="animate-bounce delay-300">.</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
