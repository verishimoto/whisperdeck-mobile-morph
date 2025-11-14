import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ChevronDown, Square, CheckSquare, Lock, Star, Target } from "lucide-react";
import { HackPrompt } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useSelection } from "@/contexts/SelectionContext";
import { useGamification } from "@/contexts/GamificationContext";

interface PromptCardProps {
  prompt: HackPrompt;
  index: number;
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

export function PromptCard({ prompt, index }: PromptCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { togglePrompt, isSelected, canSelectMore } = useSelection();
  const { useCopy, usePrompt, promptUsageCount, currentLevel } = useGamification();

  const selected = isSelected(prompt.id);
  const usageCount = promptUsageCount.get(prompt.id) || 0;
  const isMastered = usageCount >= 3;
  const isRecommended = index < 10;
  const isLocked = index >= 10 && currentLevel === 0;

  const categoryColor = categoryColorMap[prompt.category] || "primary";

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) {
      toast({ title: "Prompt Locked", description: "Use 10 different prompts to unlock this one.", duration: 2000 });
      return;
    }
    if (!useCopy()) {
      toast({ title: "Daily limit reached", description: "You've used all 5 copies today.", duration: 2000 });
      return;
    }
    await navigator.clipboard.writeText(prompt.example);
    usePrompt(prompt.id);
    setCopied(true);
    toast({ title: "Copied!", description: "Prompt copied to clipboard.", duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selected && !canSelectMore) {
      toast({ title: "Maximum selection reached", description: "You can select up to 5 prompts.", duration: 2000 });
      return;
    }
    togglePrompt(prompt);
  };

  return (
    <div className={`relative w-full transform-gpu transition-all duration-300 will-change-transform ${isLocked ? 'opacity-60' : ''} ${selected ? 'scale-[1.02]' : ''}`}>
      <div
        className={`bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-2xl border border-white/10 rounded-2xl transition-all duration-300 ease-out  ${selected ? 'border-white/30' : ''}`}>
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-30 rounded-2xl">
            <Lock className="h-10 w-10 text-white/70 mb-2" />
            <p className="text-xs text-white/70 text-center px-4 font-sans">Use 10 prompts to unlock</p>
          </div>
        )}

        <div className="p-5 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <Badge className={`bg-${categoryColor}/20 border-${categoryColor}/30 text-${categoryColor} text-xs px-2.5 py-1 rounded-full font-sans`}>{prompt.category}</Badge>
            <div className="flex items-center gap-2">
              <button onClick={handleCopy} disabled={isLocked} className={`p-2 rounded-lg transition-all duration-200 bg-white/10 hover:bg-white/15 text-white/80 border border-white/20 hover:border-white/30 ${isLocked ? 'cursor-not-allowed' : ''}`}>
                {copied ? <Check className="h-4 w-4 text-level-advanced" /> : <Copy className="h-4 w-4" />}
              </button>
              <button onClick={handleSelect} className={`p-1.5 rounded-lg transition-all duration-200 ${selected ? `bg-${categoryColor}/20 text-${categoryColor} border border-${categoryColor}/50` : 'bg-white/5 text-white/50 hover:text-white/80 border border-white/10 hover:border-white/20'}`}>
                {selected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <h3 className="font-display text-lg font-medium text-white mb-2 line-clamp-2">{prompt.title}</h3>
          <p className="font-body text-sm text-white/60 leading-relaxed mb-4 line-clamp-3 flex-grow">{prompt.description}</p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
                {isMastered && <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400 text-xs px-2 py-0.5 flex items-center gap-1"><Star className="h-3 w-3" />Mastered</Badge>}
                {isRecommended && !isMastered && <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-400 text-xs px-2 py-0.5 flex items-center gap-1"><Target className="h-3 w-3" />Recommended</Badge>}
            </div>
            <button onClick={() => setExpanded(!expanded)} className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 transition-all text-white/70 hover:text-white">
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {expanded && (
            <div className="mt-4 pt-4 border-t border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-4 rounded-xl bg-black/20 border border-white/10">
                <p className="font-mono text-sm text-white/90 leading-loose">{prompt.example}</p>
              </div>
              <div className={`p-4 rounded-xl border bg-${categoryColor}/10 border-${categoryColor}/20`}>
                <h4 className={`font-display text-base font-semibold mb-2 text-${categoryColor}`}>Why This Is a Hack</h4>
                <p className="font-body text-sm text-white/70 leading-relaxed">{prompt.whyHack || 'This technique enhances AI performance through strategic instruction.'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
