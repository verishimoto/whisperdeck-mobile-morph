import { HackPrompt } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PromptDetailDialogProps {
  prompt: HackPrompt | null;
  onClose: () => void;
}

const categoryColorMap: Record<string, string> = {
  Ultra: "level-ultra",
  Master: "level-master",
  Advanced: "level-advanced",
  Strategy: "level-strategy",
  Analysis: "level-analysis",
  Creativity: "level-creativity",
  Psychology: "level-psychology",
  Essential: "level-essential",
};

export function PromptDetailDialog({ prompt, onClose }: PromptDetailDialogProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!prompt) return null;

  const categoryStyle = categoryColorMap[prompt.category] || "primary";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.example);
    setCopied(true);
    toast({ title: "Copied!", description: "Prompt copied to clipboard.", duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={!!prompt} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="liquid-glass-card border-foreground/10 max-w-2xl max-h-[80vh] overflow-y-auto" style={{ height: 'auto' }}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge className={`bg-${categoryStyle}/15 border-${categoryStyle}/25 text-${categoryStyle} text-xs px-2.5 py-1 rounded-full`}>
              {prompt.category}
            </Badge>
            <span className="number-display text-foreground/40">#{prompt.id}</span>
          </div>
          <DialogTitle className="font-display text-xl font-medium text-foreground">
            {prompt.title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-foreground/60 leading-relaxed mb-4">{prompt.description}</p>

        {/* Prompt Example */}
        <div className="p-4 rounded-xl bg-background/30 border border-border/50 relative">
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-lg liquid-glass-button text-foreground/60 hover:text-foreground"
          >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </button>
          <p className="font-mono text-sm text-foreground/90 leading-loose pr-10">{prompt.example}</p>
        </div>

        {/* Why This Is a Hack */}
        <div className={`p-4 rounded-xl border bg-${categoryStyle}/10 border-${categoryStyle}/20 mt-4`}>
          <h4 className={`font-display text-base font-semibold mb-2 text-${categoryStyle}`}>Why This Is a Hack</h4>
          <p className="text-sm text-foreground/70 leading-relaxed">
            {prompt.whyHack || 'This technique enhances AI performance through strategic instruction.'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}