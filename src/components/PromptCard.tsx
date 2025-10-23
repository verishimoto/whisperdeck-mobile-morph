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

  return (
    <div className="relative">
      <Card 
        className={`glass-card overflow-hidden transition-all duration-500 group/card relative ${expanded ? 'shadow-2xl border-white/35' : ''}`}
        style={{
          borderRadius: '20px',
          animationDelay: `${index * 50}ms`,
          position: 'relative',
          height: '320px',
          display: 'flex',
          flexDirection: 'column'
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
          className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(${categoryStyles.text.replace('text-', '--')}) / 0.15), transparent 40%)`,
            zIndex: 0
          }}
        />
        
        <CardContent className="p-5 relative z-10 flex-1 flex flex-col" style={{ height: '100%' }}>
          {/* Adjusted Title - Top Section */}
          <div className="mb-3">
            <h3
              className={`${categoryStyles.text} leading-tight transition-smooth`}
              style={{ 
                fontFamily: "'Nimbus Sans Extended', 'Helvetica Neue', 'Inter', sans-serif",
                fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                fontWeight: '700',
                lineHeight: '1.15',
                letterSpacing: '-0.01em',
                textTransform: 'none',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minHeight: '2.5rem'
              }}
            >
              {prompt.title}
            </h3>
          </div>

          {/* Why This Works - 2 lines */}
          <p 
            className="text-white/65 mb-4 leading-relaxed flex-shrink-0"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              fontWeight: '400',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: '2.625rem'
            }}
          >
            {prompt.description}
          </p>

          {/* Spacer to push buttons to bottom */}
          <div className="flex-1"></div>

          {/* Buttons at Bottom - Expand ▾ / Copy ⧉ */}
          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white text-sm font-medium"
              style={{
                borderRadius: '12px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500'
              }}
              data-cursor="hover"
            >
              <span>Expand</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
            
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white text-sm font-medium"
              style={{
                borderRadius: '12px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: '500'
              }}
              data-cursor="hover"
            >
              <span>Copy</span>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Expanded Content - Panel Below Card */}
      {expanded && (
        <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 glass-card p-5" style={{ borderRadius: '20px' }}>
          {/* Prompt Example */}
          <div 
            className="p-4 rounded-lg bg-white/8 border border-white/20 transition-all duration-500 hover:bg-white/12 hover:border-white/30 relative overflow-hidden"
            style={{ borderRadius: '12px' }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white/80 text-sm font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Example Prompt
              </h4>
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
              borderRadius: '12px',
              backgroundColor: `hsl(var(--level-${prompt.category.toLowerCase()}) / 0.15)`,
              borderColor: `hsl(var(--level-${prompt.category.toLowerCase()}) / 0.3)`
            }}
          >
            <h4 
              className={`iridescent-text font-medium mb-2`}
              style={{
                fontFamily: "'Nimbus Sans Extended', 'Helvetica Neue', 'Inter', sans-serif",
                fontSize: '0.95rem',
                fontWeight: '600',
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
                fontWeight: '400',
                lineHeight: '1.7',
                color: `hsl(var(--level-${prompt.category.toLowerCase()}) / 0.85)`
              }}
            >
              {prompt.whyHack || 'Advanced prompt engineering technique that enhances AI model performance through strategic instruction design.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
