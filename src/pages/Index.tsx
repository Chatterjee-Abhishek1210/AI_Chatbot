import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-glow/10 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            AI Chatbot
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of conversation with our intelligent AI assistant. 
            Beautiful, responsive, and powered by advanced technology.
          </p>
        </div>
        
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;