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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
      {/* Top Bar */}
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Brand Name */}
        <h1 className="font-ultra-thin" style={{
          fontFamily: "'Nimbus Sans Extended', 'Helvetica Neue', sans-serif",
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: '700',
          letterSpacing: '-0.02em',
          color: '#ffffff'
        }}>
          WhisperDeck 2.0
        </h1>
        
        {/* Icon Buttons */}
        <div className="flex items-center gap-3">
          <button
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            data-cursor="hover"
            title="Settings"
          >
            <Settings className="h-5 w-5 text-white/70 hover:text-white transition-colors" />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            data-cursor="hover"
            title="Toggle theme"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-white/70 hover:text-white transition-colors" />
            ) : (
              <Moon className="h-5 w-5 text-white/70 hover:text-white transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Hero Section - Centered */}
      <div className="py-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-3">
            <span className="inline-block text-xs tracking-[0.2em] uppercase font-medium text-white/50" style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              letterSpacing: '0.2em',
              fontSize: '0.7rem'
            }}>
              OPAL MICROAPP
            </span>
          </div>
          
          <p className="text-white/60 font-light mx-auto" style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
            fontWeight: '400',
            lineHeight: '1.6',
            maxWidth: '560px',
            letterSpacing: '0.015em'
          }}>
            Advanced LLM Prompt Engineering • Where the mouse is the hero
          </p>
        </div>
      </div>
    </header>
  );
}