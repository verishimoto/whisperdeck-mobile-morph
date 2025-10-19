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
      className={`glass-card overflow-hidden transition-all duration-500 group/card relative ${expanded ? 'shadow-2xl border-white/35' : ''}`}
      style={{
        borderRadius,
        animationDelay: `${index * 50}ms`,
        position: 'relative'
      }}
      onMouseMove={(e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }}
    >
      {/* Radial gradient border glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[0.75rem]"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(${categoryStyles.text.replace('text-', '--')}) / 0.15), transparent 40%)`,
          zIndex: 0
        }}
      />
      
      <CardContent className="p-5 relative z-10">
        {/* Top Section - Number and Title aligned top */}
        <div className="flex items-start gap-5 mb-4">
          {/* Ultra-thin massive number */}
          <div className="flex-shrink-0 flex items-start" style={{ minWidth: '90px', maxWidth: '90px' }}>
            <span 
              className={`font-ultra-thin leading-none ${categoryStyles.text}`} 
              style={{
                fontFamily: "'Helvetica Neue Condensed', 'Helvetica Neue', sans-serif",
                fontSize: 'clamp(4.5rem, 10vw, 7rem)',
                fontWeight: '100',
                letterSpacing: '-0.06em',
                fontStretch: 'ultra-condensed',
                opacity: '0.95',
                lineHeight: '0.8'
              }}
            >
              {score}
            </span>
          </div>
          
          {/* Title - word-breakable, responsive sizing */}
          <div className="flex-1">
            <h3
              className={`${categoryStyles.text} leading-tight transition-smooth`}
              style={{ 
                fontFamily: "'Helvetica Neue', 'Inter', sans-serif",
                fontSize: 'clamp(1.15rem, 2.8vw, 1.5rem)',
                fontWeight: '300',
                lineHeight: '1.1',
                letterSpacing: '0.005em',
                wordBreak: 'break-word',
                hyphens: 'auto',
                textTransform: 'none'
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
        <div className="flex items-start mb-4" style={{ width: '90px' }}>
          <Badge
            className={`${categoryStyles.bg} ${categoryStyles.border} ${categoryStyles.text} border backdrop-blur-sm px-3 py-1.5 transition-all duration-500`}
            style={{
              borderRadius: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: '500',
              letterSpacing: '0.02em',
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {prompt.category}
          </Badge>
        </div>

        {/* Expand Toggle - Larger with glow */}
        <div
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center py-3 cursor-pointer group/toggle mt-2"
          data-cursor="hover"
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse card' : 'Expand card'}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setExpanded(!expanded);
            }
          }}
        >
          <div className="button-glow rounded-full p-2 backdrop-blur-sm bg-white/5 border border-white/10 group-hover/toggle:border-white/30 transition-all duration-300">
            <ChevronDown 
              className={`h-6 w-6 ${categoryStyles.text} transition-all duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </div>
        </div>

        {/* Expanded Content */}
        {expanded && (
          <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Prompt Example */}
            <div 
              className="p-4 rounded-lg bg-white/8 border border-white/20 transition-all duration-500 hover:bg-white/12 hover:border-white/30 relative overflow-hidden"
              style={{ borderRadius: '0.5rem' }}
            >
              <div className="flex items-center justify-end mb-3">
                <button
                  onClick={handleCopy}
                  className="button-glow flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/30"
                  data-cursor="hover"
                >
                  <span 
                    className="text-xs font-medium tracking-wide"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: '500'
                    }}
                  >
                    Copy
                  </span>
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p 
                className="iridescent-text font-mono leading-relaxed"
                style={{
                  fontFamily: "'SF Mono', 'Consolas', monospace",
                  fontSize: '0.85rem',
                  fontWeight: '400',
                  lineHeight: '1.7',
                  color: 'rgba(255, 255, 255, 0.95)'
                }}
              >
                {prompt.example}
              </p>
            </div>

            {/* Why This Is a Hack */}
            <div 
              className={`p-4 rounded-lg border transition-all duration-500`}
              style={{ 
                borderRadius: '0.5rem',
                backgroundColor: `hsl(var(--level-${prompt.category.toLowerCase()}) / 0.15)`,
                borderColor: `hsl(var(--level-${prompt.category.toLowerCase()}) / 0.3)`
              }}
            >
              <h4 
                className={`iridescent-text font-medium mb-2`}
                style={{
                  fontFamily: "'Helvetica Neue', 'Inter', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  letterSpacing: '0.01em',
                  color: `hsl(var(--level-${prompt.category.toLowerCase()}))`
                }}
              >
                Why This Is a Hack
              </h4>
              <p 
                className="leading-relaxed"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: '300',
                  lineHeight: '1.7',
                  color: `hsl(var(--level-${prompt.category.toLowerCase()}) / 0.85)`
                }}
              >
                {prompt.whyHack || 'Advanced prompt engineering technique that enhances AI model performance through strategic instruction design.'}
              </p>
            </div>

          </div>
        )}
      </CardContent>
    </Card>
  );
}