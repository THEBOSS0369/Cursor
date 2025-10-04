import { Message } from "./Chatbot";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          message.isUser
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            : "bg-white/10 border border-white/10 text-white backdrop-blur-sm"
        }`}
      >
        <div className="text-sm leading-relaxed">{message.text}</div>
        <div
          className={`text-xs mt-1 ${
            message.isUser ? "text-blue-100" : "text-gray-400"
          }`}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}
