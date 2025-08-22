import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground ml-4"
            : "bg-muted text-muted-foreground mr-4"
        )}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message}
        </div>
        <div
          className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};