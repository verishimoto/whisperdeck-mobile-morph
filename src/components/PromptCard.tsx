import { useState } from "react";
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
    "Ultra": { border: "border-[#8B5CF6]", text: "text-[#8B5CF6]", glow: "rgba(139, 92, 246, 0.4)" },
    "Master": { border: "border-[#EC4899]", text: "text-[#EC4899]", glow: "rgba(236, 72, 153, 0.4)" },
    "Advanced": { border: "border-[#3B82F6]", text: "text-[#3B82F6]", glow: "rgba(59, 130, 246, 0.4)" },
    "Strategy": { border: "border-[#10B981]", text: "text-[#10B981]", glow: "rgba(16, 185, 129, 0.4)" },
    "Analysis": { border: "border-[#F59E0B]", text: "text-[#F59E0B]", glow: "rgba(245, 158, 11, 0.4)" },
    "Creativity": { border: "border-[#F43F5E]", text: "text-[#F43F5E]", glow: "rgba(244, 63, 94, 0.4)" },
    "Psychology": { border: "border-[#A855F7]", text: "text-[#A855F7]", glow: "rgba(168, 85, 247, 0.4)" },
    "Essential": { border: "border-[#06B6D4]", text: "text-[#06B6D4]", glow: "rgba(6, 182, 212, 0.4)" }
  };
  return colors[category as keyof typeof colors] || { border: "border-white/20", text: "text-white", glow: "rgba(255, 255, 255, 0.2)" };
};

export function PromptCard({ prompt, index }: PromptCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { togglePrompt, isSelected, canSelectMore, incrementCopyCount, canCopy } = useSelection();
  
  const categoryStyles = getCategoryColor(prompt.category);
  const selected = isSelected(prompt.id);

  const handleCopy = async () => {
    if (!canCopy) {
      toast({
        title: "Copy limit reached",
        description: "You've reached the maximum of 3 copies.",
        duration: 2000,
      });
      return;
    }
    await navigator.clipboard.writeText(prompt.example);
    setCopied(true);
    incrementCopyCount();
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard.",
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
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
        className={`glass-card overflow-hidden transition-all duration-200 relative ${selected ? 'ring-1 ring-white/30' : ''}`}
        style={{
          borderRadius: '12px',
          animationDelay: `${index * 30}ms`,
        }}
      >
        {/* Selection Checkbox */}
        <button
          onClick={handleSelect}
          className={`absolute top-3 right-3 z-20 p-1.5 rounded-md transition-all duration-200 ${
            selected 
              ? `${categoryStyles.text} bg-white/10 border ${categoryStyles.border}` 
              : 'bg-white/5 text-white/40 hover:text-white/70 border border-white/10 hover:border-white/20'
          }`}
          aria-label="Select prompt"
        >
          {selected ? <CheckSquare className="h-3.5 w-3.5" /> : <Square className="h-3.5 w-3.5" />}
        </button>
        
        <div className="p-4 relative z-10 flex flex-col" style={{ minHeight: '280px' }}>
          {/* Number and Title - Side by Side */}
          <div className="flex items-start gap-3 mb-3">
            {/* Ultra-thin Number */}
            <div 
              className="text-white/10 font-number flex-shrink-0"
              style={{ 
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                fontSize: 'clamp(3rem, 8vw, 4.5rem)',
                lineHeight: '1',
                fontWeight: '100',
                letterSpacing: '-0.03em',
                width: 'auto',
                minWidth: 'fit-content'
              }}
            >
              {index + 1}
            </div>

            {/* Title */}
            <h3
              className={`${categoryStyles.text} leading-tight transition-all flex-1`}
              style={{ 
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                fontWeight: '600',
                lineHeight: '1.2',
                letterSpacing: '-0.01em',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '0.25rem'
              }}
            >
              {prompt.title}
            </h3>
          </div>

          {/* Description */}
          <p 
            className="text-white/60 mb-3 leading-relaxed flex-shrink-0"
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              fontSize: '0.8rem',
              fontWeight: '400',
              lineHeight: '1.4',
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
              className={`bg-white/5 ${categoryStyles.border} ${categoryStyles.text} border text-xs px-2.5 py-0.5`}
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                fontWeight: '500',
                letterSpacing: '0.01em',
                borderRadius: '6px'
              }}
            >
              {prompt.category}
            </Badge>
          </div>

          <div className="flex-1"></div>

          {/* Centered Expand Button */}
          <div className="flex items-center justify-center pt-3 border-t border-white/10">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white"
              data-cursor="hover"
              aria-label="Expand details"
            >
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content - Below Card */}
      {expanded && (
        <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 glass-card p-4" style={{ borderRadius: '12px' }}>
          {/* Prompt with Copy Button */}
          <div 
            className="p-3 rounded-lg bg-white/5 border border-white/15 transition-all duration-300 hover:bg-white/8 hover:border-white/25 relative group"
            style={{ borderRadius: '10px' }}
          >
            <div className="flex items-start justify-between gap-3">
              <p 
                className="text-white/90 font-mono leading-relaxed flex-1"
                style={{
                  fontFamily: "'SF Mono', 'Consolas', monospace",
                  fontSize: '0.8rem',
                  fontWeight: '400',
                  lineHeight: '1.6'
                }}
              >
                {prompt.example}
              </p>
              <button
                onClick={handleCopy}
                disabled={!canCopy}
                className={`flex-shrink-0 p-2 rounded-lg transition-all ${
                  !canCopy 
                    ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                    : `bg-white/5 hover:bg-white/10 ${categoryStyles.text} hover:border ${categoryStyles.border}`
                } border border-transparent`}
                style={{ borderRadius: '8px' }}
                aria-label="Copy prompt"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Why This Is a Hack */}
          <div 
            className="p-3 rounded-lg border transition-all duration-300"
            style={{ 
              borderRadius: '10px',
              backgroundColor: `${categoryStyles.glow.replace('0.4', '0.08')}`,
              borderColor: `${categoryStyles.glow.replace('0.4', '0.25')}`
            }}
          >
            <h4
              className={`${categoryStyles.text} font-semibold mb-2`}
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.01em'
              }}
            >
              Why This Is a Hack
            </h4>
            <p 
              className="text-white/70 leading-relaxed"
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
                fontSize: '0.8rem',
                fontWeight: '400',
                lineHeight: '1.6'
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
