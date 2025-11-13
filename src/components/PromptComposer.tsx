import { useSelection } from '@/contexts/SelectionContext';
import { useGamification } from '@/contexts/GamificationContext';
import { X, Sparkles, Copy, Check, Lock } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

export function PromptComposer() {
  const { selectedPrompts, clearSelection } = useSelection();
  const { dailyCopiesRemaining, useCopy, buildChain, getTimeUntilReset } = useGamification();
  const [copied, setCopied] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { toast } = useToast();

  if (selectedPrompts.length === 0) return null;

  const composedPrompt = selectedPrompts.map((p, i) => 
    `[Technique ${i + 1}: ${p.title}]\n${p.example}\n`
  ).join('\n');

  const handleCopy = async () => {
    if (!useCopy()) {
      setShowUpgradeModal(true);
      return;
    }
    
    await navigator.clipboard.writeText(composedPrompt);
    buildChain(); // Track chain building
    setCopied(true);
    toast({
      title: "Composed Prompt Copied!",
      description: `Your merged prompt is ready to use. ${dailyCopiesRemaining - 1} copies remaining today.`,
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 glass-card p-5 animate-in slide-in-from-bottom-4" style={{ borderRadius: '12px', backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(10, 10, 15, 0.9)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-level-ultra" />
          <h3 className="text-white font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
            Prompt Composer
          </h3>
        </div>
        <button onClick={clearSelection} className="text-white/50 hover:text-white transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        {selectedPrompts.map((prompt, i) => (
          <div key={prompt.id} className="text-xs text-white/70 p-2 rounded bg-white/5 border border-white/10">
            <span className="text-level-ultra font-semibold">#{i + 1}</span> {prompt.title}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 py-2 px-4 rounded-lg bg-level-ultra/20 border border-level-ultra/30 text-level-ultra hover:bg-level-ultra/30 transition-all flex items-center justify-center gap-2"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: '600' }}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Merged'}
        </button>
      </div>

      <p className="text-xs text-white/40 mt-3 text-center">
        Selected {selectedPrompts.length}/5 prompts • Daily Copies: {dailyCopiesRemaining}/5
      </p>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="glass-card border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Lock className="h-5 w-5 text-destructive" />
              Daily Limit Reached
            </DialogTitle>
            <DialogDescription className="text-foreground/70">
              You've used all 5 free copies today. Your quota resets in <span className="font-semibold text-foreground">{getTimeUntilReset()}</span>.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-sm mb-2 text-foreground/90">Community (Current)</h4>
                <ul className="text-xs text-foreground/60 space-y-1">
                  <li>• 5 copies/day</li>
                  <li>• Build & test chains</li>
                  <li>• Community features</li>
                  <li>• Public leaderboard</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg border-2" style={{ borderColor: 'hsl(var(--level-ultra))' }}>
                <h4 className="font-semibold text-sm mb-2" style={{ color: 'hsl(var(--level-ultra))' }}>Enterprise</h4>
                <ul className="text-xs text-foreground/60 space-y-1">
                  <li>• Unlimited copies</li>
                  <li>• API access</li>
                  <li>• Validated routes</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              style={{ 
                backgroundColor: 'hsl(var(--level-ultra) / 0.2)',
                borderColor: 'hsl(var(--level-ultra) / 0.3)',
                color: 'hsl(var(--level-ultra))'
              }}
            >
              Contact Sales
            </Button>
            <Button variant="ghost" onClick={() => setShowUpgradeModal(false)}>
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
