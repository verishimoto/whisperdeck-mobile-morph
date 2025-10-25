import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
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
  }> = {
    'Ultra': {
      text: 'text-level-ultra',
      bg: 'bg-level-ultra/10',
      border: 'border-level-ultra/30',
    },
    'Master': {
      text: 'text-level-master',
      bg: 'bg-level-master/10', 
      border: 'border-level-master/30',
    },
    'Advanced': {
      text: 'text-level-advanced',
      bg: 'bg-level-advanced/10',
      border: 'border-level-advanced/30',
    },
    'Strategy': {
      text: 'text-level-strategy',
      bg: 'bg-level-strategy/10',
      border: 'border-level-strategy/30',
    },
    'Analysis': {
      text: 'text-level-analysis',
      bg: 'bg-level-analysis/10',
      border: 'border-level-analysis/30',
    },
    'Creativity': {
      text: 'text-level-creativity',
      bg: 'bg-level-creativity/10',
      border: 'border-level-creativity/30',
    },
    'Psychology': {
      text: 'text-level-psychology',
      bg: 'bg-level-psychology/10',
      border: 'border-level-psychology/30',
    },
    'Essential': {
      text: 'text-level-essential',
      bg: 'bg-level-essential/10',
      border: 'border-level-essential/30', 
    }
  };
  return categoryMap[category] || categoryMap['Analysis'];
};

const getScoreFromId = (id: number) => {
  return id;
};

export function PromptCard({
  prompt,
  index
}: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copyCount, setCopyCount] = useState(0);
  const { toast } = useToast();
  
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

  const handleCopyExample = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Example copied to clipboard"
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please select and copy manually",
        variant: "destructive"
      });
    }
  };

  return (
    <div 
      className={`group relative overflow-hidden transition-all duration-500 animate-slide-up glass-card border-2 ${categoryStyles.border}`}
      style={{
        animationDelay: `${index * 0.05}s`,
        background: 'var(--card-bg)',
        backdropFilter: 'blur(6px) saturate(120%)',
        borderRadius: 'var(--radius)',
      }}
      data-cursor="hover"
    >
      <div className="p-6 relative z-10 card-body">
        {/* Header with Score and Toggle */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="flex flex-col items-start">
              <span className={`font-number text-number-massive leading-none ${categoryStyles.text}`} style={{
                letterSpacing: '-0.05em',
                fontStretch: 'ultra-condensed',
                fontWeight: '100'
              }}>
                {score}
              </span>
            </div>
            
            <div className="flex-1 pt-1">
              <h3 className={`font-display font-light text-xl leading-tight ${categoryStyles.text} transition-smooth`} style={{ 
                lineHeight: '1.1',
                letterSpacing: '0.02em',
                fontWeight: '300',
              }}>
                {prompt.title}
              </h3>
            </div>
          </div>
          
          <Button 
            onClick={() => setExpanded(!expanded)} 
            size="sm" 
            variant="ghost" 
            className="h-10 w-10 p-0 hover:bg-white/10 transition-smooth flex-shrink-0"
          >
            {expanded ? (
              <ChevronUp className={`h-8 w-8 ${categoryStyles.text} hover:scale-110 transition-transform`} />
            ) : (
              <ChevronDown className="h-8 w-8 text-white/60 hover:text-white transition-colors" />
            )}
          </Button>
        </div>

        <p className="text-white/85 font-normal text-lg mb-4 leading-relaxed font-body" style={{ lineHeight: '1.3' }}>
          {prompt.description.replace(/→/g, '→')}
        </p>

        <div className="mb-4">
          <Badge className={`${categoryStyles.bg} ${categoryStyles.text} ${categoryStyles.border} border font-semibold px-3 py-1 text-sm`} style={{ borderRadius: 'var(--radius)' }}>
            {prompt.category}
          </Badge>
        </div>

        <div className={`overflow-hidden transition-all duration-500 ease-out ${expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-4 pt-4 border-t border-white/10">
            
            <div className="bg-black/15 p-4 text-white/90 leading-relaxed cursor-pointer group/copy" 
              onClick={() => handleCopyExample(prompt.example)}
              title="Click to copy this example"
              style={{ borderRadius: 'var(--radius)' }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium mb-1 text-white">Basic Example</p>
                  <code className="text-sm font-body">{prompt.example.replace(/→/g, '→')}</code>
                </div>
                <Copy className="h-4 w-4 opacity-60 group-hover/copy:opacity-100 transition-opacity" />
              </div>
            </div>

            {prompt.advancedExample && (
              <div className="bg-black/15 p-4 text-white/90 leading-relaxed cursor-pointer group/copy" 
                onClick={() => handleCopyExample(prompt.advancedExample || '')}
                title="Click to copy this example"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium mb-1 text-white">Advanced Example</p>
                    <code className="text-sm font-body">{prompt.advancedExample?.replace(/→/g, '→')}</code>
                  </div>
                  <Copy className="h-4 w-4 opacity-60 group-hover/copy:opacity-100 transition-opacity" />
                </div>
              </div>
            )}

            <div className={`${categoryStyles.bg} border-2 ${categoryStyles.border} p-4 relative overflow-hidden`} 
              style={{ borderRadius: 'var(--radius)' }}
            >
              <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
              <div className="relative">
                <h4 className="font-display font-bold text-white uppercase tracking-wider mb-3 text-sm">
                  Why this is hack?
                </h4>
                <p className="text-white/90 leading-relaxed font-body">
                  {prompt.whyHack || 'Advanced prompt engineering technique that enhances AI model performance through strategic instruction design.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a 
                href={prompt.source || 'https://arxiv.org/abs/2302.00923'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${categoryStyles.text} hover:opacity-80 transition-smooth text-base font-semibold flex items-center gap-1`}
              >
                Source
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              
              <div className="flex items-center gap-2">
                {copyCount > 0 && (
                  <span className="text-xs text-white/60 bg-white/10 px-2 py-1 border" style={{ borderRadius: 'var(--radius)' }}>
                    Copied {copyCount}x
                  </span>
                )}
                <Button 
                  onClick={handleCopy} 
                  size="sm" 
                  variant="ghost" 
                  className={`h-8 px-3 transition-smooth hover:bg-transparent text-base font-semibold ${copied ? categoryStyles.text : 'text-white/70 hover:' + categoryStyles.text}`}
                  style={{ borderRadius: 'var(--radius)' }}
                >
                  {copied ? (
                    <Check className={`h-4 w-4 ${categoryStyles.text}`} />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="ml-2">Copy</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
