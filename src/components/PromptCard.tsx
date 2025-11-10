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

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div className="relative w-full">
      <div 
        className={`glass-card transition-all duration-300 ease-out relative ${selected ? 'ring-1 ring-white/20' : ''}`}
        style={{
          borderRadius: '16px',
          animationDelay: `${index * 30}ms`,
          overflow: 'visible',
          border: 'none'
        }}
      >
        {/* Top-right buttons */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
          {/* Copy Button - Always Visible */}
          <button
            onClick={handleCopy}
            disabled={!canCopy}
            className={`p-2 rounded-lg transition-all duration-200 ${
              !canCopy 
                ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                : `bg-white/10 hover:bg-white/15 ${categoryStyles.text} border border-white/20 hover:border-white/30`
            }`}
            aria-label="Copy prompt"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
          
          {/* Selection Checkbox */}
          <button
            onClick={handleSelect}
            className={`p-1.5 rounded-lg transition-all duration-200 ${
              selected 
                ? `${categoryStyles.text} bg-white/10 border ${categoryStyles.border}` 
                : 'bg-white/5 text-white/40 hover:text-white/70 border border-white/10 hover:border-white/20'
            }`}
            aria-label="Select prompt"
          >
            {selected ? <CheckSquare className="h-3.5 w-3.5" /> : <Square className="h-3.5 w-3.5" />}
          </button>
        </div>
        
        <div className="p-5 pt-14 relative z-10 flex flex-col">
          {/* Number and Title - Side by Side */}
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="flex-shrink-0"
              style={{ 
                color: 'rgba(255, 255, 255, 0.12)',
                fontFamily: "'Helvetica Neue', -apple-system, sans-serif",
                fontSize: 'clamp(3.5rem, 6vw, 4.5rem)',
                lineHeight: '0.85',
                fontWeight: '100',
                fontStretch: 'ultra-condensed',
                letterSpacing: '-0.05em',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              {index + 1}
            </div>

            <h3
              className={`${categoryStyles.text} transition-all flex-1`}
              style={{ 
                fontFamily: "'Helvetica Neue', -apple-system, 'SF Pro Display', sans-serif",
                fontSize: 'clamp(0.9rem, 1.7vw, 1rem)',
                fontWeight: '500',
                fontStretch: 'condensed',
                lineHeight: '1.3',
                letterSpacing: '-0.015em',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                alignSelf: 'center'
              }}
            >
              {prompt.title}
            </h3>
          </div>

          {/* Description */}
          <p 
            className="text-white/60 mb-4 leading-relaxed"
            style={{
              fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
              fontSize: '0.8rem',
              fontWeight: '400',
              lineHeight: '1.5',
              display: expanded ? 'block' : '-webkit-box',
              WebkitLineClamp: expanded ? 'unset' : 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {prompt.description}
          </p>

          {/* Category Badge */}
          <div className="mb-4">
            <Badge 
              className={`bg-white/5 ${categoryStyles.border} ${categoryStyles.text} border text-xs px-3 py-1`}
              style={{
                fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
                fontWeight: '500',
                letterSpacing: '0.02em',
                borderRadius: '8px'
              }}
            >
              {prompt.category}
            </Badge>
          </div>

          {/* Expanded Content - Inline */}
          {expanded && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 mt-2">
              {/* Full Prompt */}
              <div 
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <p 
                  className="text-white/90 leading-relaxed"
                  style={{
                    fontFamily: "'SF Mono', 'Consolas', monospace",
                    fontSize: '0.8rem',
                    fontWeight: '400',
                    lineHeight: '1.7'
                  }}
                >
                  {prompt.example}
                </p>
              </div>

              {/* Why This Is a Hack */}
              <div 
                className="p-4 rounded-xl border"
                style={{ 
                  backgroundColor: `${categoryStyles.glow.replace('0.4', '0.06')}`,
                  borderColor: `${categoryStyles.glow.replace('0.4', '0.2')}`
                }}
              >
                <h4
                  className={`${categoryStyles.text} font-semibold mb-2`}
                  style={{
                    fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
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
                    fontFamily: "-apple-system, 'SF Pro Text', sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: '400',
                    lineHeight: '1.7'
                  }}
                >
                  {prompt.whyHack || 'Advanced prompt engineering technique that enhances AI model performance through strategic instruction design.'}
                </p>
              </div>
            </div>
          )}

          {/* Expand Toggle */}
          <div className="flex items-center justify-center pt-4 mt-4 border-t border-white/10">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/60 hover:text-white"
              aria-label={expanded ? "Collapse details" : "Expand details"}
            >
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
