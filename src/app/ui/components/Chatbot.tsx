"use client";
import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./ChatBubble";
import { MessageInput } from "./MessageInput";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your ai assistant, how can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll when the new message comes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hardcoded responses for random selection
  const botResponses = [
    "That's an interesting question! Let me think about that...",
    "I understand what you're asking. Here's my perspective on that topic.",
    "Great point! Based on my knowledge, I'd suggest considering this approach.",
    "Thanks for sharing that with me. I think we could explore this further.",
    "That's a fascinating idea! Have you considered the implications?",
    "I appreciate your input. Here's what I think about that situation.",
    "Interesting perspective! Let me offer some thoughts on that matter.",
    "That's a good question that deserves a thoughtful response.",
    "I see what you mean. From my experience, here's what I'd recommend.",
    "Excellent question! This is something that many people wonder about.",
    "I'm glad you brought this up. It's definitely worth discussing.",
    "That's a complex topic, but I'll do my best to provide insight.",
    "I can see why you'd ask that. Here's my take on the situation.",
    "Thanks for the thoughtful question. Let me share some ideas.",
    "That's something I've been thinking about too. Here's my view.",
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsTyping(true);

    //simulate bot response delay
    const responseDelay = Math.random() * 2000 + 1000;

    setTimeout(() => {
      // select random bot response
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      // Add bot message to the chat
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // Hide typing indicator
      setIsTyping(false);
    }, responseDelay);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Container */}
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-2xl">
        {/* Chat Header */}
        <ChatHeader />

        {/* Messages Container */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-black/20">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="text-sm">AI is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="border-t border-white/10 p-4">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
