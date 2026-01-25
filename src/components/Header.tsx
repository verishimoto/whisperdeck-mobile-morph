import { Moon, Sun, Keyboard, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
