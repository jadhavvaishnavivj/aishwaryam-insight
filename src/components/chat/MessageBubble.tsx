import { User, Bot } from "lucide-react";
import { DataTable } from "./DataTable";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  data?: any[];
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.type === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"} items-start gap-2`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        
        <div className={`rounded-lg px-3 py-2 ${
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted border"
        }`}>
          <div className="whitespace-pre-wrap text-sm">
            {message.content}
          </div>
          
          {message.data && message.data.length > 0 && (
            <div className="mt-3">
              <DataTable data={message.data} />
            </div>
          )}
          
          <div className={`text-xs mt-1 opacity-70`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};