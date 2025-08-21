import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'That\'s an interesting question! Let me think about that...',
        'I understand what you\'re asking. Here\'s what I think...',
        'Great question! Based on what you\'ve said...',
        'I can help you with that! Here\'s my suggestion...',
        'That\'s a thoughtful inquiry. From my perspective...',
        'Absolutely! I\'d be happy to help you with that.',
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] bg-chat-container backdrop-blur-md rounded-3xl shadow-glass border border-border/30 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border/30 bg-gradient-glass">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">AI Assistant</h2>
            <p className="text-sm text-muted-foreground">Always here to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-chat-bot text-chat-bot-foreground backdrop-blur-md px-4 py-3 rounded-2xl border border-border/50">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-border/30 bg-gradient-glass">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-input/80 backdrop-blur-md border-border/50 rounded-2xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-primary hover:opacity-90 text-white rounded-2xl px-6 py-3 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};