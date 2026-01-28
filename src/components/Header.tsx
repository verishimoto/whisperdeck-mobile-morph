import { Moon, Sun, Keyboard, User, Zap, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { useAuth } from "@/contexts/AuthContext";
import { usePerformance } from "@/contexts/PerformanceContext";
import { useNavigate } from "react-router-dom";
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
  const { mode, setMode, isPerformanceMode } = usePerformance();
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 liquid-glass-header">
        {/* Top Bar */}
        <div className="px-6 py-3 flex items-center justify-between">
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
            {/* Performance Mode Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setMode(isPerformanceMode ? "high-quality" : "performance")}
                  className={`p-2.5 rounded-xl liquid-glass-button transition-all ${
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
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="liquid-glass-card border-foreground/20">
                <p className="text-sm">
                  {isPerformanceMode ? "Performance Mode (faster)" : "High Quality Mode (effects on)"}
                </p>
              </TooltipContent>
            </Tooltip>

            {/* Keyboard Shortcuts */}
            <button
              onClick={() => setShowShortcuts(true)}
              className="p-2.5 rounded-xl liquid-glass-button hidden md:flex"
              data-cursor="hover"
              title="Keyboard shortcuts (⌘/)"
            >
              <Keyboard className="h-4 w-4 text-foreground/60 hover:text-foreground transition-colors" />
            </button>

            {/* User / Auth */}
            {user ? (
              <button
                onClick={() => signOut()}
                className="p-2.5 rounded-xl liquid-glass-button"
                data-cursor="hover"
                title="Sign out"
              >
                <User className="h-4 w-4 text-primary" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="p-2.5 rounded-xl liquid-glass-button"
                data-cursor="hover"
                title="Sign in"
              >
                <User className="h-4 w-4 text-foreground/60 hover:text-foreground transition-colors" />
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl liquid-glass-button"
              data-cursor="hover"
              title="Toggle theme (T)"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-foreground/80 hover:text-foreground transition-colors" />
              ) : (
                <Moon className="h-5 w-5 text-foreground/80 hover:text-foreground transition-colors" />
              )}
            </button>
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
