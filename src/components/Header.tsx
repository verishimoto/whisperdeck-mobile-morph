import { Moon, Sun, Keyboard, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { useAuth } from "@/contexts/AuthContext";
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
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 liquid-glass-header border-b-0">
        {/* Top Bar */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3 flex items-center justify-between">
          {/* Brand */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground header-brand">
              WhispererDeck
            </h1>
            <p className="hidden sm:block text-[10px] text-muted-foreground font-light tracking-widest uppercase mt-0.5">
              {totalPrompts} Advanced LLM Prompts
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
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
