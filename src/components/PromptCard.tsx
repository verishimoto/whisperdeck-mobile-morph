import { useState, useRef, useCallback } from "react";
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

export function PromptCard({ prompt, index, onCategoryFilter }: PromptCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
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
  
  // Compute rank from index (1-based) - this uses the ORIGINAL dataset index
  const rank = index + 1;

  // Track mouse position for refraction effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || !expanded) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, [expanded]);

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

  // Calculate opposite glare position for refraction effect
  const glareX = 100 - mousePos.x;
  const glareY = 100 - mousePos.y;

  return (
    <div 
      ref={cardRef}
      className={`relative w-full transform-gpu transition-all duration-300 will-change-transform ${isLocked ? 'opacity-60' : ''} ${selected ? 'scale-[1.02]' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <div 
        className={`liquid-glass-card ${expanded ? 'liquid-glass-card-active' : ''} ${selected ? 'ring-2 ring-white/30' : ''}`}
        style={expanded ? {
          '--mouse-x': `${mousePos.x}%`,
          '--mouse-y': `${mousePos.y}%`,
          '--glare-x': `${glareX}%`,
          '--glare-y': `${glareY}%`,
        } as React.CSSProperties : undefined}
      >
        {isLocked && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex flex-col items-center justify-center z-30 rounded-2xl">
            <Lock className="h-10 w-10 text-foreground/70 mb-2" />
            <p className="text-xs text-foreground/70 text-center px-4 font-sans">Use 10 prompts to unlock</p>
          </div>
        )}

        <div className="p-5 flex flex-col h-full relative z-10">
          <div className="flex items-start justify-between mb-4">
            {/* Clickable Category Tag */}
            <Badge 
              onClick={handleCategoryClick}
              className={`tag-interactive ${categoryStyle.tag} bg-${categoryStyle.css}/15 border-${categoryStyle.css}/25 text-${categoryStyle.css} text-xs px-2.5 py-1 rounded-full font-sans hover:bg-${categoryStyle.css}/25 hover:border-${categoryStyle.css}/50 cursor-pointer`}
            >
              {prompt.category}
            </Badge>
            <div className="flex items-center gap-1.5">
              {/* Favorite Button */}
              <button 
                onClick={handleFavorite} 
                className={`p-2 rounded-lg transition-all duration-200 ${
                  favorited 
                    ? 'text-pink-400 bg-pink-500/20 border border-pink-500/30 favorite-pulse' 
                    : 'liquid-glass-button text-foreground/60 hover:text-pink-400'
                }`}
              >
                <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
              </button>
              <button onClick={handleCopy} disabled={isLocked} className={`p-2 rounded-lg transition-all duration-200 liquid-glass-button text-foreground/80 ${isLocked ? 'cursor-not-allowed' : ''}`}>
                {copied ? <Check className="h-4 w-4 text-level-advanced" /> : <Copy className="h-4 w-4" />}
              </button>
              {!isArchitect && (
                <button onClick={handleSelect} className={`p-1.5 rounded-lg transition-all duration-200 ${selected ? `bg-${categoryStyle.css}/20 text-${categoryStyle.css} border border-${categoryStyle.css}/50` : 'liquid-glass-button text-foreground/50 hover:text-foreground/80'}`}>
                  {selected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                </button>
              )}
            </div>
          </div>
          
          <h3 className="font-display text-lg font-medium text-foreground mb-2 line-clamp-2">
            <span className="number-display text-foreground/40 mr-2">{rank}</span>
            {prompt.title}
          </h3>
          <p className="font-body text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-3 flex-grow">{prompt.description}</p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              {!isArchitect && isMastered && <Badge className="bg-yellow-500/20 border-yellow-500/30 text-yellow-400 text-xs px-2 py-0.5 flex items-center gap-1"><Star className="h-3 w-3" />Mastered</Badge>}
              {!isArchitect && isRecommended && !isMastered && <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-400 text-xs px-2 py-0.5 flex items-center gap-1"><Target className="h-3 w-3" />Recommended</Badge>}
            </div>
            <button onClick={() => setExpanded(!expanded)} className="flex items-center justify-center w-8 h-8 rounded-full liquid-glass-button text-foreground/70 hover:text-foreground">
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {expanded && (
            <div className="mt-4 pt-4 border-t border-border/50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-4 rounded-xl bg-background/30 border border-border/50">
                <p className="font-mono text-sm text-foreground/90 leading-loose">{prompt.example}</p>
              </div>
              <div className={`p-4 rounded-xl border bg-${categoryStyle.css}/10 border-${categoryStyle.css}/20`}>
                <h4 className={`font-display text-base font-semibold mb-2 text-${categoryStyle.css}`}>Why This Is a Hack</h4>
                <p className="font-body text-sm text-foreground/70 leading-relaxed">{prompt.whyHack || 'This technique enhances AI performance through strategic instruction.'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
