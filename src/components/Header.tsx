import { Settings, Moon, Sun } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalPrompts: number;
}

export function Header({ searchQuery, onSearchChange, totalPrompts }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-black/30 border-b border-white/20">
      {/* Top Bar */}
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Brand Name */}
        <h1 className="font-nimbus text-hero font-bold tracking-tighter text-white">
          WhispererDeck
        </h1>
        
        {/* Icon Buttons */}
        <div className="flex items-center gap-3">
          <button
            className="p-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all"
            data-cursor="hover"
            title="Settings"
          >
            <Settings className="h-5 w-5 text-white/80 hover:text-white transition-colors" />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all"
            data-cursor="hover"
            title="Toggle theme"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-white/80 hover:text-white transition-colors" />
            ) : (
              <Moon className="h-5 w-5 text-white/80 hover:text-white transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Hero Section - Centered */}
      <div className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-body text-lg font-light text-white/70 leading-relaxed max-w-2xl mx-auto tracking-wide">
            Advanced LLM Prompt Engineering
          </p>
        </div>
      </div>
    </header>
  );
}
