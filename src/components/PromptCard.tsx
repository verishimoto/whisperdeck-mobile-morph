import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ChevronDown } from "lucide-react";
import { HackPrompt } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface PromptCardProps {
  prompt: HackPrompt;
  index: number;
}

const getCategoryColor = (category: string) => {
  const colors = {
    "Ultra": { bg: "bg-level-ultra/10", border: "border-level-ultra/30", text: "text-level-ultra" },
    "Master": { bg: "bg-level-master/10", border: "border-level-master/30", text: "text-level-master" },
    "Advanced": { bg: "bg-level-advanced/10", border: "border-level-advanced/30", text: "text-level-advanced" },
    "Strategy": { bg: "bg-level-strategy/10", border: "border-level-strategy/30", text: "text-level-strategy" },
    "Analysis": { bg: "bg-level-analysis/10", border: "border-level-analysis/30", text: "text-level-analysis" },
    "Creativity": { bg: "bg-level-creativity/10", border: "border-level-creativity/30", text: "text-level-creativity" },
    "Psychology": { bg: "bg-level-psychology/10", border: "border-level-psychology/30", text: "text-level-psychology" },
    "Essential": { bg: "bg-level-essential/10", border: "border-level-essential/30", text: "text-level-essential" }
  };
  return colors[category as keyof typeof colors] || { bg: "bg-white/5", border: "border-white/10", text: "text-white" };
};

export function PromptCard({ prompt, index }: PromptCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const categoryStyles = getCategoryColor(prompt.category);
  const score = prompt.score;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.example);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "Prompt example has been copied.",
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const borderRadius = "0.75rem";

  return (
    <Card 
      className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-opal-purple/5"
      style={{
        borderRadius,
        animationDelay: `${index * 50}ms`
      }}
    >
      <CardContent className="p-5">
        {/* Top Section - Number and Title aligned top */}
        <div className="flex items-start gap-4 mb-4">
          {/* Ultra-thin massive number */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center" style={{ minWidth: '60px' }}>
            <span 
              className={`font-ultra-thin leading-none ${categoryStyles.text}`} 
              style={{
                fontFamily: "'Helvetica Neue', 'Inter Tight', sans-serif",
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: '100',
                letterSpacing: '-0.05em',
                fontStretch: 'ultra-condensed',
                opacity: '0.9'
              }}
            >
              {score}
            </span>
          </div>
          
          {/* Title - word-breakable, responsive sizing */}
          <div className="flex-1 pt-0.5">
            <h3 
              className={`${categoryStyles.text} leading-tight transition-smooth`}
              style={{ 
                fontFamily: "'Helvetica Neue', 'Inter Tight', sans-serif",
                fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
                fontWeight: '300',
                lineHeight: '1.15',
                letterSpacing: '0.01em',
                wordBreak: 'break-word',
                hyphens: 'auto',
                WebkitLineClamp: 3,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {prompt.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p 
          className="text-white/60 mb-4 leading-relaxed"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            fontWeight: '300',
            lineHeight: '1.6'
          }}
        >
          {prompt.description}
        </p>

        {/* Category Tag */}
        <div className="flex items-center justify-center mb-4">
          <Badge
            className={`${categoryStyles.bg} ${categoryStyles.border} ${categoryStyles.text} border backdrop-blur-sm px-4 py-1.5 transition-glow hover:bg-opacity-80`}
            style={{
              borderRadius,
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: '500',
              letterSpacing: '0.02em',
              minWidth: '60px',
              textAlign: 'center'
            }}
          >
            {prompt.category}
          </Badge>
        </div>

        {/* Expand Button - Full card clickable */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-white/3 hover:bg-white/5 transition-all border border-white/10 hover:border-white/15 group"
          style={{ borderRadius }}
          data-cursor="hover"
        >
          <span 
            className="text-white/70 group-hover:text-white transition-smooth"
            style={{
              fontFamily: "'Helvetica Neue', 'Inter Tight', sans-serif",
              fontSize: '0.9rem',
              fontWeight: '400',
              letterSpacing: '0.01em'
            }}
          >
            {expanded ? 'Show Less' : 'View Details'}
          </span>
          <ChevronDown 
            className={`h-5 w-5 text-white/50 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            style={{ transform: `scale(${expanded ? 1.25 : 1.25})`, opacity: 0.7 }}
          />
        </button>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Basic Example */}
            <div 
              className="p-4 rounded-lg bg-white/3 border border-white/10"
              style={{ borderRadius }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 
                  className="text-white/80 font-medium"
                  style={{
                    fontFamily: "'Helvetica Neue', 'Inter Tight', sans-serif",
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    letterSpacing: '0.01em'
                  }}
                >
                  Example Prompt
                </h4>
                <button
                  onClick={handleCopy}
                  className="text-white/60 hover:text-white transition-all p-1.5 rounded hover:bg-white/10"
                  data-cursor="hover"
                  style={{ marginRight: '-6px' }}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p 
                className="text-white/70 font-mono leading-relaxed"
                style={{
                  fontFamily: "'SF Mono', 'Consolas', monospace",
                  fontSize: '0.85rem',
                  fontWeight: '300',
                  lineHeight: '1.6'
                }}
              >
                {prompt.example}
              </p>
            </div>

          </div>
        )}
      </CardContent>
    </Card>
  );
}