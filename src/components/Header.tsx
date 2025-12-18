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
      <div className="px-6 py-4 grid grid-cols-3 items-center">
        {/* Left: Empty spacer */}
        <div></div>
        
        {/* Center: Brand Name */}
        <h1 className="font-nimbus text-hero font-bold tracking-tighter text-white text-center">
          WhispererDeck
        </h1>
        
        {/* Right: Icon Buttons */}
        <div className="flex items-center gap-3 justify-end">
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

      {/* Hero Section - Compact */}
      <div className="py-3 text-center">
        <p className="font-body text-sm font-light text-white/60 tracking-wide">
          Advanced LLM Prompt Engineering
        </p>
      </div>
    </header>
  );
}
