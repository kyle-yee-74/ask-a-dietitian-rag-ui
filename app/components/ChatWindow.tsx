import React, { useState } from "react";
import { HeaderBar } from "~/components/HeaderBar";
import { MessageContainer } from "./MessageContainer";
import type { Message } from "~/types/message";
import { ChatInput } from "./ChatInput";

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [botIsTyping, setBotIsTyping] = useState(false);

  const onSend = async (message: string) => {
    const newMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };
    setMessages((prev: Message[]) => [...prev, newMessage]);

    setBotIsTyping(true);
    const botReply = await fakeBotReply(message);
    setBotIsTyping(false);

    const replyMessage = {
      id: crypto.randomUUID(),
      role: "bot",
      content: botReply,
    };

    setMessages((prev: Message[]) => [...prev, replyMessage]);
  };

  const fakeBotReply = async (input: string) => {
    await new Promise((res) => setTimeout(res, 1500)); // delay
    return `Bot response to: "${input}"`;
  };

  return (
    <div className="flex overflow-y-auto justify-center shadow-inner min-h-screen">
      <HeaderBar />
      <div className="flex-1 pt-16 flex justify-center">
        <div className="w-full max-w-2xl px-4 flex flex-col">
          <MessageContainer messages={messages} botIsTyping={botIsTyping} />
          <ChatInput onSend={onSend} />
        </div>
      </div>
    </div>
  );
};
