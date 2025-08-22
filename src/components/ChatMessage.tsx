interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-in slide-in-from-bottom-2 duration-300`}>
      <div 
        className={`max-w-[80%] px-4 py-3 rounded-2xl backdrop-blur-md shadow-message transition-all duration-300 hover:scale-[1.02] ${
          isUser 
            ? 'bg-chat-user text-chat-user-foreground ml-auto bg-gradient-primary' 
            : 'bg-chat-bot text-chat-bot-foreground border border-border/50'
        }`}
      >
        <p className="text-sm leading-relaxed">{message}</p>
        {timestamp && (
          <span className="text-xs opacity-70 mt-1 block">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};