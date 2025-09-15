import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HackPrompt } from "@/types";
interface PromptCardProps {
  prompt: HackPrompt;
  index: number;
}
const getCategoryColor = (category: string) => {
  const categoryMap: Record<string, {
    text: string;
    bg: string;
    border: string;
    hover: string;
  }> = {
    'Advanced': {
      text: 'text-neon-purple',
      bg: 'bg-neon-purple/10',
      border: 'border-neon-purple/20',
      hover: 'hover:border-neon-purple/30'
    },
    'Analysis': {
      text: 'text-neon-cyan',
      bg: 'bg-neon-cyan/10',
      border: 'border-neon-cyan/20',
      hover: 'hover:border-neon-cyan/30'
    },
    'Creativity': {
      text: 'text-neon-mint',
      bg: 'bg-neon-mint/10',
      border: 'border-neon-mint/20',
      hover: 'hover:border-neon-mint/30'
    },
    'Strategy': {
      text: 'text-neon-lime',
      bg: 'bg-neon-lime/10',
      border: 'border-neon-lime/20',
      hover: 'hover:border-neon-lime/30'
    },
    'Psychology': {
      text: 'text-neon-yellow',
      bg: 'bg-neon-yellow/10',
      border: 'border-neon-yellow/20',
      hover: 'hover:border-neon-yellow/30'
    }
  };
  return categoryMap[category] || categoryMap['Analysis']; // Default to cyan
};
const getScoreFromId = (id: number) => {
  // Convert ID (1-100) to score (100-1) - reverse ranking
  return 101 - id;
};
export function PromptCard({
  prompt,
  index
}: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copyCount, setCopyCount] = useState(0);
  const {
    toast
  } = useToast();
  const categoryStyles = getCategoryColor(prompt.category);
  const score = getScoreFromId(prompt.id);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.example);
      setCopied(true);
      setCopyCount(prev => prev + 1);
      toast({
        title: "Copied!",
        description: "Prompt example copied to clipboard"
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please select and copy manually",
        variant: "destructive"
      });
    }
  };
  return <Card className={`group relative overflow-hidden transition-smooth animate-slide-up hover:shadow-hover glass-card ${expanded ? categoryStyles.border : ''} ${categoryStyles.hover}`} style={{
    animationDelay: `${index * 0.1}s`
  }}>
      {/* Radial Gradient Overlay for Hover Effect */}
      <div className="radial-gradient-overlay absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-glow" style={{
      background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--accent-glow) / 0.15) 0%, transparent 40%)`
    }} />
      
      <CardContent className="p-6 relative z-10">
        {/* Header with Score and Toggle */}
        <div className="flex items-start justify-between mb-6">
          {/* Score Display - Ultra-thin massive number */}
          <div className="flex items-baseline gap-3">
            <span className="text-number-xs font-light text-muted-foreground/60">#</span>
            <span className={`text-number-massive font-ultra-thin font-display leading-none tracking-tighter ${categoryStyles.text} opacity-80`} style={{
            letterSpacing: '-0.02em'
          }}>
              {score}
            </span>
          </div>
          
          {/* Toggle Button */}
          <Button onClick={() => setExpanded(!expanded)} size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-primary/10 transition-smooth">
            {expanded ? <ChevronUp className="h-4 w-4 text-primary" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </Button>
        </div>

        {/* Title */}
        <h3 className={`text-title-lg font-condensed font-medium text-foreground mb-3 group-hover:${categoryStyles.text} transition-smooth`}>
          {prompt.title}
        </h3>

        {/* Description - Always visible */}
        <p className="text-muted-foreground font-medium mb-4 leading-relaxed">
          {prompt.description}
        </p>

        {/* Category Badge */}
        <div className="mb-4">
          <Badge className={`${categoryStyles.bg} ${categoryStyles.text} ${categoryStyles.border} border font-semibold px-3 py-1 text-xs rounded-lg`}>
            {prompt.category}
          </Badge>
        </div>

        {/* Expandable Content */}
        <div className={`overflow-hidden transition-all duration-500 ease-out ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-4 pt-4 border-t border-border/30">
            {/* Basic Example */}
            <div>
              <h4 className="text-sm font-condensed font-bold text-foreground uppercase tracking-wider mb-2">
                Basic Example
              </h4>
              <div className="bg-muted/20 rounded-lg p-3 text-sm leading-relaxed border border-border/30">
                <code className="text-foreground/90">Given this background, answer the question.</code>
              </div>
            </div>

            {/* Advanced Example */}
            <div>
              <h4 className="text-sm font-condensed font-bold text-foreground uppercase tracking-wider mb-2">
                Advanced Example
              </h4>
              <div className="bg-muted/20 rounded-lg p-3 text-sm leading-relaxed border border-border/30">
                
              </div>
            </div>

            {/* Why This is Hack */}
            <div className={`${categoryStyles.bg.replace('/10', '/5')} ${categoryStyles.border} border rounded-lg p-4`}>
              <h4 className="text-sm font-condensed font-bold text-foreground uppercase tracking-wider mb-2">
                Why this is hack?
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Guides the model to use specific information, reducing hallucinations and increasing relevance.
              </p>
            </div>

            {/* Source & Copy */}
            <div className="flex items-center justify-between pt-2">
              <a href="https://arxiv.org/abs/2302.00923" target="_blank" rel="noopener noreferrer" className={`text-sm font-medium ${categoryStyles.text} hover:opacity-80 transition-smooth underline`}>
                Source
              </a>
              
              <div className="flex items-center gap-2">
                {copyCount > 0 && <span className="text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded border">
                    Copied {copyCount}x
                  </span>}
                <Button onClick={handleCopy} size="sm" variant="ghost" className={`h-8 px-3 transition-smooth ${categoryStyles.bg.replace('/10', '/5')} hover:${categoryStyles.bg}`}>
                  {copied ? <Check className={`h-4 w-4 ${categoryStyles.text}`} /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2 text-xs">Copy</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
}