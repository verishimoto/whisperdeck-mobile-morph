import { useState, useRef, useCallback, useEffect, memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ChevronDown, Square, CheckSquare, Lock, Star, Target, Heart } from "lucide-react";
import { HackPrompt } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useSelection } from "@/contexts/SelectionContext";
import { useGamification } from "@/contexts/GamificationContext";
import { useArchitect } from "@/contexts/ArchitectContext";
import { useFavorites } from "@/contexts/FavoritesContext";

interface PromptCardProps {
  prompt: HackPrompt;
  index: number;
  onCategoryFilter?: (category: string) => void;
  onExpand?: () => void;
}

const categoryColorMap: Record<string, { css: string; tag: string }> = {
  Ultra: { css: "level-ultra", tag: "tag-ultra" },
  Master: { css: "level-master", tag: "tag-master" },
  Advanced: { css: "level-advanced", tag: "tag-advanced" },
  Strategy: { css: "level-strategy", tag: "tag-strategy" },
  Analysis: { css: "level-analysis", tag: "tag-analysis" },
  Creativity: { css: "level-creativity", tag: "tag-creativity" },
  Psychology: { css: "level-psychology", tag: "tag-psychology" },
  Essential: { css: "level-essential", tag: "tag-essential" },
};

export const PromptCard = memo(function PromptCard({ prompt, index, onCategoryFilter, onExpand }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { togglePrompt, isSelected, canSelectMore } = useSelection();
  const { useCopy, usePrompt, promptUsageCount, currentLevel } = useGamification();
  const { isArchitect } = useArchitect();
  const { isFavorite, toggleFavorite } = useFavorites();

  const selected = isSelected(prompt.id);
  const usageCount = promptUsageCount.get(prompt.id) || 0;
  const isMastered = usageCount >= 3;
  const isRecommended = index < 10 && !isArchitect;
  const isLocked = index >= 10 && currentLevel === 0 && !isArchitect;
  const favorited = isFavorite(prompt.id);

  const categoryStyle = categoryColorMap[prompt.category] || { css: "primary", tag: "" };
  
  const rank = index + 1;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) {
      toast({ title: "Prompt Locked", description: "Use 10 different prompts to unlock this one.", duration: 2000 });
      return;
    }
    if (!isArchitect && !useCopy()) {
      toast({ title: "Daily limit reached", description: "You've used all 5 copies today.", duration: 2000 });
      return;
    }
    await navigator.clipboard.writeText(prompt.example);
    if (!isArchitect) {
      usePrompt(prompt.id);
    }
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

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(prompt.id);
    toast({ 
      title: favorited ? "Removed from favorites" : "Added to favorites", 
      duration: 1500 
    });
  };

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCategoryFilter?.(prompt.category);
  };

  return (
    <div 
      ref={cardRef}
      className={`relative w-full ${isLocked ? 'opacity-60' : ''} ${selected ? 'scale-[1.02]' : ''}`}
    >
      <div 
        className={`liquid-glass-card card-fixed-height ${selected ? 'ring-2 ring-white/30' : ''}`}
      >
        {isLocked && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center z-30 rounded-2xl">
            <Lock className="h-10 w-10 text-foreground/70 mb-2" />
            <p className="text-xs text-foreground/70 text-center px-4 font-sans">Use 10 prompts to unlock</p>
          </div>
        )}

        <div className="p-5 flex flex-col h-full relative z-10">
          <div className="flex items-start justify-between mb-4">
            <Badge 
              onClick={handleCategoryClick}
              className={`tag-interactive ${categoryStyle.tag} bg-${categoryStyle.css}/15 border-${categoryStyle.css}/25 text-${categoryStyle.css} text-xs px-2.5 py-1 rounded-full font-sans hover:bg-${categoryStyle.css}/25 hover:border-${categoryStyle.css}/50 cursor-pointer`}
            >
              {prompt.category}
            </Badge>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handleFavorite} 
                className={`p-2 rounded-lg transition-all duration-200 ${
                  favorited 
                    ? 'text-pink-400 bg-pink-500/20 border border-pink-500/30 favorite-pulse' 
                    : 'liquid-glass-button text-foreground/60 hover:text-pink-400'
                }`}
                title="Add to favorites"
              >
                <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={handleCopy} 
                disabled={isLocked} 
                className={`p-2 rounded-lg transition-all duration-200 liquid-glass-button text-foreground/80 ${isLocked ? 'cursor-not-allowed' : ''}`}
                title="Copy prompt"
              >
                {copied ? <Check className="h-4 w-4 text-level-advanced" /> : <Copy className="h-4 w-4" />}
              </button>
              <button 
                onClick={handleSelect} 
                className={`p-1.5 rounded-lg transition-all duration-200 ${selected ? `bg-${categoryStyle.css}/20 text-${categoryStyle.css} border border-${categoryStyle.css}/50` : 'liquid-glass-button text-foreground/50 hover:text-foreground/80'}`}
                title={selected ? "Remove from selection" : "Add to chain"}
              >
                {selected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <h3 className="font-display text-lg font-medium text-foreground mb-2 line-clamp-2 flex items-baseline gap-2">
            <span className="number-display text-foreground/40">{rank}.</span>
            <span className="flex-1">{prompt.title}</span>
          </h3>
          <p className="font-body text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-3 flex-grow">{prompt.description}</p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              {!isArchitect && isMastered && <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400 text-xs px-2 py-0.5 flex items-center gap-1"><Star className="h-3 w-3" />Mastered</Badge>}
              {!isArchitect && isRecommended && !isMastered && <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-400 text-xs px-2 py-0.5 flex items-center gap-1"><Target className="h-3 w-3" />Recommended</Badge>}
            </div>
            <button 
              onClick={() => onExpand?.()}
              className="flex items-center justify-center w-8 h-8 rounded-full liquid-glass-button text-foreground/70 hover:text-foreground"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}, (prev, next) => {
  return prev.prompt.id === next.prompt.id && 
         prev.index === next.index;
});