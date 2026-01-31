import { Moon, Sun, Keyboard, User, Zap, Sparkles, Gauge } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { useAuth } from "@/contexts/AuthContext";
import { usePerformance } from "@/contexts/PerformanceContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalPrompts: number;
}

export function Header({ searchQuery, onSearchChange, totalPrompts }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { user, signOut } = useAuth();
  const { mode, setMode, isPerformanceMode, autoDetect, performanceLevel, fps } = usePerformance();
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 liquid-glass-header border-b-0">
        {/* Top Bar - Max width aligned with content */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand - Antigravity inspired */}
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground header-brand">
            WhispererDeck
          </h1>
          
          {/* Tagline - minimal */}
          <p className="hidden lg:block text-xs text-muted-foreground font-light tracking-widest uppercase">
            250 Advanced LLM Prompts
          </p>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Performance Mode Toggle with FPS indicator */}
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setMode(isPerformanceMode ? "high-quality" : "performance")}
                  className={`p-2.5 rounded-xl liquid-glass-button transition-all flex items-center gap-1.5 ${
                    isPerformanceMode 
                      ? 'text-green-400 bg-green-500/20 border-green-500/30' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                  data-cursor="hover"
                >
                  {isPerformanceMode ? (
                    <Zap className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {autoDetect && (
                    <Badge 
                      variant="outline" 
                      className={`text-[10px] px-1 py-0 h-4 ${
                        performanceLevel === 'high' ? 'border-green-500/50 text-green-400' :
                        performanceLevel === 'medium' ? 'border-yellow-500/50 text-yellow-400' :
                        performanceLevel === 'low' ? 'border-orange-500/50 text-orange-400' :
                        'border-red-500/50 text-red-400'
                      }`}
                    >
                      {fps}
                    </Badge>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="liquid-glass-card border-foreground/20">
                <div className="text-sm space-y-1">
                  <p className="font-medium">
                    {isPerformanceMode ? "Performance Mode" : "High Quality Mode"}
                  </p>
                  <p className="text-foreground/60 text-xs">
                    {autoDetect ? `Auto-detecting: ${fps} FPS (${performanceLevel})` : 'Click to toggle'}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>

            {/* Keyboard Shortcuts */}
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowShortcuts(true)}
                  className="p-2.5 rounded-xl liquid-glass-button hidden md:flex"
                  data-cursor="hover"
                >
                  <Keyboard className="h-4 w-4 text-foreground/60 hover:text-foreground transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="liquid-glass-card border-foreground/20">
                <p className="text-sm">Keyboard Shortcuts (⌘/)</p>
              </TooltipContent>
            </Tooltip>

            {/* User / Auth */}
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                {user ? (
                  <button
                    onClick={() => signOut()}
                    className="p-2.5 rounded-xl liquid-glass-button"
                    data-cursor="hover"
                  >
                    <User className="h-4 w-4 text-primary" />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/auth')}
                    className="p-2.5 rounded-xl liquid-glass-button"
                    data-cursor="hover"
                  >
                    <User className="h-4 w-4 text-foreground/60 hover:text-foreground transition-colors" />
                  </button>
                )}
              </TooltipTrigger>
              <TooltipContent side="bottom" className="liquid-glass-card border-foreground/20">
                <p className="text-sm">{user ? 'Sign Out' : 'Sign In'}</p>
              </TooltipContent>
            </Tooltip>

            {/* Theme Toggle */}
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2.5 rounded-xl liquid-glass-button"
                  data-cursor="hover"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 text-foreground/80 hover:text-foreground transition-colors" />
                  ) : (
                    <Moon className="h-5 w-5 text-foreground/80 hover:text-foreground transition-colors" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="liquid-glass-card border-foreground/20">
                <p className="text-sm">Toggle Theme (T)</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>

      <KeyboardShortcutsModal 
        isOpen={showShortcuts} 
        onClose={() => setShowShortcuts(false)} 
      />
    </>
  );
}
