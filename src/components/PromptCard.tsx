import { useState, memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ChevronDown, ChevronUp, Target, Heart, Square, CheckSquare, FileText, Sparkles } from "lucide-react";
import { HackPrompt } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSelection } from "@/contexts/SelectionContext";
import { useNavigate } from "react-router-dom";
import { shortLabel } from "@/lib/category-labels";
import { formatFullCard, inputTags } from "@/lib/prompt-meta";

interface PromptCardProps {
  prompt: HackPrompt;
  recommended?: boolean;
  aiReason?: string;
  onCategoryFilter?: (category: string) => void;
  onAdapt?: (prompt: HackPrompt) => void;
}

const categoryColorMap: Record<string, { hsl: string; tag: string }> = {
  'Meta-Cognition': { hsl: "320 98% 87%", tag: "tag-advanced" },
  'Strategic Reasoning': { hsl: "150 90% 80%", tag: "tag-strategy" },
  'Analytical Decomposition': { hsl: "210 98% 82%", tag: "tag-analysis" },
  'Divergent Thinking': { hsl: "290 95% 85%", tag: "tag-creativity" },
  'Behavioral Psychology': { hsl: "340 95% 85%", tag: "tag-psychology" },
  Design: { hsl: "30 90% 80%", tag: "tag-design" },
};

export const PromptCard = memo(function PromptCard({ prompt, recommended, aiReason, onCategoryFilter, onAdapt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { toast } = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const { isSelected, togglePrompt, canSelectMore } = useSelection();
  const navigate = useNavigate();

  const favorited = isFavorite(prompt.id);
  const selected = isSelected(prompt.id);
  const categoryStyle = categoryColorMap[prompt.category] || { hsl: "0 0% 70%", tag: "" };
  const inputs = inputTags(prompt.example);

  const requireAuth = (what: string) => {
    if (user) return true;
    toast({ title: "Sign in required", description: `Sign in to ${what}.`, duration: 2500 });
    navigate('/auth');
    return false;
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(prompt.example);
    setCopied(true);
    toast({ title: "Copied!", description: "Prompt copied to clipboard.", duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyFull = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!requireAuth("copy the full card")) return;
    await navigator.clipboard.writeText(formatFullCard(prompt));
    toast({ title: "Full card copied", duration: 2000 });
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!requireAuth("select cards for multi-copy")) return;
    if (!selected && !canSelectMore) {
      toast({ title: "Selection limit reached", description: "You can select up to 5 cards.", duration: 2000 });
      return;
    }
    togglePrompt(prompt);
  };

  const handleAdapt = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!requireAuth("adapt prompts with AI")) return;
    onAdapt?.(prompt);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(prompt.id);
    toast({ title: favorited ? "Removed from favorites" : "Added to favorites", duration: 1500 });
  };

  return (
    <div className="relative w-full" data-prompt-id={prompt.id}>
      <div className={`liquid-glass-card ${expanded ? 'card-open' : 'card-fixed-height'} ${selected ? 'card-selected' : ''} ${recommended ? 'card-recommended' : ''}`}>
        <div className="p-5 flex flex-col h-full relative z-10">
          <div className="flex items-center justify-between mb-3">
            <Badge
              onClick={(e) => { e.stopPropagation(); onCategoryFilter?.(prompt.category); }}
              title={prompt.category}
              className={`tag-interactive ${categoryStyle.tag} text-xs px-2.5 py-1 rounded-full font-sans cursor-pointer card-tag`}
              style={{ ['--tag-hsl' as string]: categoryStyle.hsl }}
            >
              {shortLabel(prompt.category)}
            </Badge>
            <div className="flex items-center gap-1.5">
              <button onClick={handleSelect} aria-pressed={selected} aria-label={selected ? "Unselect card" : "Select card"}
                className={`p-1.5 rounded-lg liquid-glass-button ${selected ? 'text-primary' : 'text-foreground/60 hover:text-foreground'}`} title="Select for multi-copy">
                {selected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
              </button>
              <button onClick={handleFavorite} aria-label="Add to favorites" title="Add to favorites"
                className={`p-1.5 rounded-lg transition-all duration-200 ${favorited ? 'text-pink-400 bg-pink-500/20 border border-pink-500/30 favorite-pulse' : 'liquid-glass-button text-foreground/60 hover:text-pink-400'}`}>
                <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
              </button>
              <button onClick={handleCopy} aria-label="Copy prompt" title="Copy prompt"
                className="p-1.5 rounded-lg transition-all duration-200 liquid-glass-button text-foreground/80">
                {copied ? <Check className="h-4 w-4 text-level-advanced" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <h3 className="font-display text-lg font-medium text-foreground mb-2 leading-[1.35] card-title-clamp">
            <span className="number-display card-number mr-1.5">#{prompt.id}</span>
            <span className="card-title-text">{prompt.title}</span>
          </h3>
          <p className="font-body text-sm text-foreground/75 leading-relaxed mb-2">{prompt.description}.</p>
          {aiReason ? (
            <p className="font-body text-xs text-primary leading-relaxed line-clamp-3"><Sparkles className="inline h-3 w-3 mr-1" />{aiReason}</p>
          ) : !expanded && prompt.whyHack ? (
            <p className="font-body text-xs text-foreground/60 leading-relaxed line-clamp-3">{prompt.whyHack}</p>
          ) : null}

          {expanded && (
            <div className="mt-3 space-y-3 animate-in fade-in duration-200">
              <div className="p-3 rounded-xl bg-background/30 border border-foreground/[0.08] relative">
                <button onClick={handleCopy} aria-label="Copy prompt text" className="absolute top-2 right-2 p-1.5 rounded-lg liquid-glass-button text-foreground/60 hover:text-foreground">
                  {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                <p className="font-mono text-xs text-foreground/90 leading-relaxed pr-8">{prompt.example}</p>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: `hsl(${categoryStyle.hsl} / 0.1)`, border: `1px solid hsl(${categoryStyle.hsl} / 0.15)` }}>
                <h4 className="font-display text-sm font-semibold mb-1.5 card-why-heading" style={{ ['--tag-hsl' as string]: categoryStyle.hsl }}>Why This Is a Hack</h4>
                <p className="text-xs text-foreground/80 leading-relaxed">{prompt.whyHack}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={handleCopyFull} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full liquid-glass-button text-foreground/80 hover:text-foreground">
                  <FileText className="h-3.5 w-3.5" />Copy full card
                </button>
                <button onClick={handleAdapt} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full liquid-glass-button text-primary">
                  <Sparkles className="h-3.5 w-3.5" />Adapt with AI
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-3 gap-2">
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              {recommended && (
                <Badge className="bg-primary/15 border-primary/30 text-primary text-xs px-2 py-0.5 flex items-center gap-1">
                  <Target className="h-3 w-3" />Recommended
                </Badge>
              )}
              {inputs.slice(0, recommended ? 1 : 3).map((t) => (
                <span key={t} className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-foreground/15 text-foreground/70">{t}</span>
              ))}
            </div>
            <button onClick={(e) => { e.stopPropagation(); setExpanded(v => !v); }}
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full liquid-glass-button text-foreground/70 hover:text-foreground"
              aria-label={expanded ? "Collapse" : "Expand"} title={expanded ? "Collapse" : "Expand"}>
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
