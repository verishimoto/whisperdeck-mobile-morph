import { useSelection } from '@/contexts/SelectionContext';
import { X, Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function PromptComposer() {
  const { selectedPrompts, clearSelection } = useSelection();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (selectedPrompts.length === 0) return null;

  const composedPrompt = selectedPrompts.map((p, i) => 
    `[Technique ${i + 1}: ${p.title}]\n${p.example}\n`
  ).join('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(composedPrompt);
    setCopied(true);
    toast({
      title: "Composed Prompt Copied!",
      description: "Your merged prompt is ready to use.",
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 glass-card p-6 animate-in slide-in-from-bottom-4" style={{ borderRadius: '16px', backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(10, 10, 15, 0.85)' }}>
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
        Selected {selectedPrompts.length}/5 prompts
      </p>
    </div>
  );
}
