import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalPrompts: number;
}

export function Header({ searchQuery, onSearchChange, totalPrompts }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 liquid-glass-header">
      {/* Top Bar */}
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Brand - San Francisco inspired */}
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          WhispererDeck
        </h1>
        
        {/* Tagline - minimal */}
        <p className="hidden md:block text-xs text-muted-foreground font-light tracking-widest uppercase">
          Advanced LLM Prompts
        </p>
        
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2.5 rounded-xl liquid-glass-button"
          data-cursor="hover"
          title="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-foreground/80 hover:text-foreground transition-colors" />
          ) : (
            <Moon className="h-5 w-5 text-foreground/80 hover:text-foreground transition-colors" />
          )}
        </button>
      </div>
    </header>
  );
}
