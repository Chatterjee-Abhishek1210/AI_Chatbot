import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Key, AlertCircle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeySet: (apiKey: string) => void;
  currentApiKey?: string;
}

export const ApiKeyModal = ({ isOpen, onClose, onApiKeySet, currentApiKey }: ApiKeyModalProps) => {
  const [apiKey, setApiKey] = useState(currentApiKey || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsLoading(true);
    try {
      onApiKeySet(apiKey.trim());
      onClose();
    } catch (error) {
      console.error('Failed to set API key:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Configure Gemini API
          </DialogTitle>
          <DialogDescription>
            Enter your Google Gemini API key to enable AI responses. Your key is stored locally and never shared.
          </DialogDescription>
        </DialogHeader>

        <Alert className="bg-muted/50 border-border/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Security Note:</strong> For production use, consider using{' '}
            <a 
              href="https://supabase.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Supabase <ExternalLink className="w-3 h-3" />
            </a>{' '}
            to securely store your API keys.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Gemini API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-input/80 backdrop-blur-sm border-border/50"
              required
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from{' '}
              <a 
                href="https://makersuite.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline"
              >
                Google AI Studio
              </a>
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-secondary/50 backdrop-blur-sm border-border/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!apiKey.trim() || isLoading}
              className="bg-gradient-primary text-white"
            >
              {isLoading ? 'Setting...' : 'Set API Key'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};