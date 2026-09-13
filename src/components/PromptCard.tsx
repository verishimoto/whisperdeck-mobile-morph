import { useState, useRef, memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ChevronDown, ChevronUp, Target, Heart } from "lucide-react";
import { HackPrompt } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/contexts/FavoritesContext";

interface PromptCardProps {
  prompt: HackPrompt;
  index: number;
  onCategoryFilter?: (category: string) => void;
}

const categoryColorMap: Record<string, { hsl: string; tag: string }> = {
  Ultra: { hsl: "320 98% 87%", tag: "tag-ultra" },
  Master: { hsl: "270 95% 85%", tag: "tag-master" },
  'Meta-Cognition': { hsl: "320 98% 87%", tag: "tag-advanced" },
  'Strategic Reasoning': { hsl: "150 90% 80%", tag: "tag-strategy" },
  'Analytical Decomposition': { hsl: "210 98% 82%", tag: "tag-analysis" },
  'Divergent Thinking': { hsl: "290 95% 85%", tag: "tag-creativity" },
  'Behavioral Psychology': { hsl: "340 95% 85%", tag: "tag-psychology" },
  Design: { hsl: "30 90% 80%", tag: "tag-design" },
  Essential: { hsl: "200 95% 78%", tag: "tag-essential" },
};

export const PromptCard = memo(function PromptCard({ prompt, index, onCategoryFilter }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isRecommended = index < 10;
  const favorited = isFavorite(prompt.id);

  const categoryStyle = categoryColorMap[prompt.category] || { hsl: "0 0% 70%", tag: "" };

  const rank = index + 1;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(prompt.example);
    setCopied(true);
    toast({ title: "Copied!", description: "Prompt copied to clipboard.", duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
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

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(prev => !prev);
  };

  return (
    <div ref={cardRef} className="relative w-full">
      <div className={`liquid-glass-card ${expanded ? '' : 'card-fixed-height'}`}>
        <div className="p-5 flex flex-col h-full relative z-10">
          <div className="flex items-start justify-between mb-4">
            <Badge 
              onClick={handleCategoryClick}
              className={`tag-interactive ${categoryStyle.tag} text-xs px-2.5 py-1 rounded-full font-sans cursor-pointer`}
              style={{
                color: `hsl(${categoryStyle.hsl})`,
                backgroundColor: `hsl(${categoryStyle.hsl} / 0.15)`,
                borderColor: `hsl(${categoryStyle.hsl} / 0.25)`,
              }}
            >
              {prompt.category}
            </Badge>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handleFavorite} 
                className={`p-1.5 rounded-lg transition-all duration-200 ${
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
                className="p-1.5 rounded-lg transition-all duration-200 liquid-glass-button text-foreground/80"
                title="Copy prompt"
              >
                {copied ? <Check className="h-4 w-4 text-level-advanced" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <h3 className="font-display text-lg font-medium text-foreground mb-2 card-title-clamp flex items-baseline gap-2">
            <span className="number-display text-foreground/40">{rank}.</span>
            <span className="flex-1 card-title-text">{prompt.title}</span>
          </h3>
          <p className="font-body text-sm text-foreground/60 leading-relaxed mb-4 line-clamp-3 flex-grow">{prompt.description}</p>

          {/* Inline expanded content */}
          {expanded && (
            <div className="mt-2 space-y-3 animate-in fade-in duration-200">
              {/* Prompt Example */}
              <div className="p-3 rounded-xl bg-background/30 border border-foreground/[0.08] relative">
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 p-1.5 rounded-lg liquid-glass-button text-foreground/60 hover:text-foreground"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                <p className="font-mono text-xs text-foreground/90 leading-relaxed pr-8">{prompt.example}</p>
              </div>

              {/* Why This Is a Hack */}
              <div className="p-3 rounded-xl" style={{ backgroundColor: `hsl(${categoryStyle.hsl} / 0.1)`, border: `1px solid hsl(${categoryStyle.hsl} / 0.15)` }}>
                <h4 className="font-display text-sm font-semibold mb-1.5" style={{ color: `hsl(${categoryStyle.hsl})` }}>Why This Is a Hack</h4>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  {prompt.whyHack || 'This technique enhances AI performance through strategic instruction.'}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-4">
            <div className="flex items-center gap-2">
              {isRecommended && (
                <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-400 text-xs px-2 py-0.5 flex items-center gap-1">
                  <Target className="h-3 w-3" />Recommended
                </Badge>
              )}
            </div>
            <button 
              onClick={handleToggleExpand}
              className="flex items-center justify-center w-8 h-8 rounded-full liquid-glass-button text-foreground/70 hover:text-foreground"
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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
