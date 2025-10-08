import { Search } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalPrompts: number;
}

export function Header({ searchQuery, onSearchChange, totalPrompts }: HeaderProps) {
  return (
    <header className="py-8 text-center px-4">
      <div className="max-w-4xl mx-auto">
        {/* Master Grid Label */}
        <div className="mb-2">
          <span className="inline-block text-xs tracking-[0.3em] uppercase font-light text-white/60" style={{
            fontFamily: "'Helvetica Neue', 'Inter Tight', sans-serif",
            fontWeight: '300',
            letterSpacing: '0.3em'
          }}>
            MASTER GRID
          </span>
        </div>
        
        {/* Main Title */}
        <h1 className="mb-4 font-ultra-thin" style={{
          fontFamily: "'Helvetica Neue', 'Inter Tight', sans-serif",
          fontSize: 'clamp(3rem, 12vw, 7rem)',
          fontWeight: '100',
          fontStretch: 'ultra-condensed',
          letterSpacing: '-0.03em',
          lineHeight: '0.9',
          color: '#ffffff'
        }}>
          Whisperer Deck
        </h1>
        
        {/* Subtitle */}
        <p className="text-white/70 mb-8 font-light" style={{
          fontFamily: "'Helvetica Neue', 'Inter Tight', sans-serif",
          fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
          fontWeight: '300',
          lineHeight: '1.5',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <span className="text-white/90">250 Ultimate Advanced Prompt Hacks</span>
          <br />
          For Advanced LLM Prompt Engineers Only
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Type to filter hacks..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-opal-purple/50 focus:border-transparent transition-all backdrop-blur-xl"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                fontWeight: '300'
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}