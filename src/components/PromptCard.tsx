import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HackPrompt } from "@/types";

interface PromptCardProps {
  prompt: HackPrompt;
  index: number;
}

export function PromptCard({ prompt, index }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.example);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Prompt example copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please select and copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-smooth hover:shadow-card animate-slide-up" 
          style={{ animationDelay: `${index * 0.1}s` }}>
      <CardContent className="p-6">
        {/* Custom Number Display - Following user's exact specifications */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex items-baseline gap-1 flex-shrink-0">
            {/* Tiny # symbol - 1/3 size of number */}
            <span className="text-number-xs font-light text-muted-foreground leading-none">#</span>
            {/* Massive condensed ultra thin number - 1.5x larger */}
            <span className="text-number-massive font-ultra-thin font-display leading-none text-foreground tracking-tighter">
              {prompt.id}
            </span>
            {/* Dot separator */}
            <span className="text-xl font-light text-muted-foreground leading-none ml-1">•</span>
          </div>
          
          {/* Score with padding and border radius on limey yellow */}
          {prompt.score && (
            <div className="ml-auto">
              <div className="px-3 py-1 rounded-lg bg-score text-score-foreground font-bold text-sm shadow-sm">
                {prompt.score}
              </div>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-smooth">
          {prompt.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground font-medium mb-4 leading-relaxed">
          {prompt.description}
        </p>

        {/* Category Badge */}
        <div className="mb-4">
          <Badge 
            variant="secondary" 
            className="bg-secondary-glow text-secondary-foreground font-semibold px-3 py-1 text-xs"
          >
            {prompt.category}
          </Badge>
        </div>

        {/* Quick Example */}
        <div className="space-y-3">
          <h4 className="text-sm font-display font-bold text-foreground uppercase tracking-wider">
            Quick Example
          </h4>
          <div className="relative">
            <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm leading-relaxed border border-border/50 overflow-hidden">
              <code className="text-foreground">{prompt.example}</code>
            </div>
            <Button
              onClick={handleCopy}
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-smooth hover:bg-primary/10"
            >
              {copied ? (
                <Check className="h-4 w-4 text-accent" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}