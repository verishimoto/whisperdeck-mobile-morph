import { useState } from "react";
import Card from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ChevronDown, Square, CheckSquare } from "lucide-react";
import { HackPrompt } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useSelection } from "@/contexts/SelectionContext";

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
  const [showGlassOverlay, setShowGlassOverlay] = useState(false);
  const { toast } = useToast();
  const { togglePrompt, isSelected, canSelectMore } = useSelection();
  
  const categoryStyles = getCategoryColor(prompt.category);
  const selected = isSelected(prompt.id);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.example);
    setCopied(true);
    setShowGlassOverlay(true);
    toast({
      title: "Copied to clipboard!",
      description: "Prompt example has been copied.",
      duration: 2000,
    });
    setTimeout(() => {
      setCopied(false);
      setShowGlassOverlay(false);
    }, 3000);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selected && !canSelectMore) {
      toast({
        title: "Maximum selection reached",
        description: "You can select up to 5 prompts.",
        duration: 2000,
      });
      return;
    }
    togglePrompt(prompt);
  };

  return (
    <div className="relative">
      <div 
        className={`glass-card overflow-hidden transition-all duration-300 group/card relative ${expanded ? 'shadow-2xl border-white/35' : ''} ${selected ? 'ring-2 ring-level-ultra/50' : ''}`}
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
          className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[20px]"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(${categoryStyles.text.replace('text-', '--')}) / 0.15), transparent 40%)`,
            zIndex: 0
          }}
        />

        {/* Selection Checkbox */}
        <button
          onClick={handleSelect}
          className={`absolute top-4 right-4 z-20 p-2 rounded-lg transition-all duration-200 ${
            selected 
              ? 'bg-level-ultra/20 text-level-ultra border border-level-ultra/30' 
              : 'bg-white/5 text-white/40 hover:text-white/70 border border-white/10 hover:border-white/20'
          }`}
          aria-label="Select prompt"
        >
          {selected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
        </button>
        
        <div className="p-5 relative z-10 flex-1 flex flex-col card-body" style={{ height: '100%' }}>
          {/* Score Number - Bebas Neue Ultra Thin */}
          <div 
            className="text-white/12 mb-3"
            style={{ 
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '5.5rem',
              lineHeight: '1',
              fontWeight: '400',
              letterSpacing: '0.05em'
            }}
          >
            {index + 1}
          </div>

          {/* Title */}
          <h3
            className={`${categoryStyles.text} leading-tight transition-smooth mb-3`}
            style={{ 
              fontFamily: "'Nimbus Sans Extended', 'Helvetica Neue', 'Inter', sans-serif",
              fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
              fontWeight: '700',
              lineHeight: '1.15',
              letterSpacing: '-0.01em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {prompt.title}
          </h3>

          {/* Description */}
          <p 
            className="text-white/65 mb-2 leading-relaxed flex-shrink-0"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              fontWeight: '400',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {prompt.description}
          </p>

          {/* Category Badge */}
          <div className="mb-3">
            <Badge 
              className={`${categoryStyles.bg} ${categoryStyles.border} ${categoryStyles.text} border text-xs px-3 py-1`}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '600',
                letterSpacing: '0.02em'
              }}
            >
              {prompt.category}
            </Badge>
          </div>

          <div className="flex-1"></div>

          {/* Centered Chevron + Copy on right */}
          <div className="flex items-center justify-center gap-2 pt-3 border-t border-white/10">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white"
              data-cursor="hover"
              aria-label="Expand details"
            >
              <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
            
            <button
              onClick={handleCopy}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white ml-auto"
              data-cursor="hover"
              aria-label="Copy prompt"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

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

          {/* Why This Is a Hack with Glass Overlay */}
          <div 
            className={`p-4 rounded-lg border transition-all duration-500 relative overflow-hidden`}
            style={{ 
              borderRadius: '12px',
              backgroundColor: `hsl(var(--level-${prompt.category.toLowerCase()}) / 0.15)`,
              borderColor: `hsl(var(--level-${prompt.category.toLowerCase()}) / 0.3)`
            }}
          >
            {/* Grainy Glass Overlay on Copy */}
            {showGlassOverlay && (
              <div 
                className="absolute inset-0 animate-in fade-in duration-500"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px) saturate(120%)',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.3\'/%3E%3C/svg%3E")',
                  mixBlendMode: 'overlay',
                  zIndex: 10
                }}
              />
            )}
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
