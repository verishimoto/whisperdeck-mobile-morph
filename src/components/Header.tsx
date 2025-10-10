import { Search } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalPrompts: number;
}

export function Header({ searchQuery, onSearchChange, totalPrompts }: HeaderProps) {
  return (
    <header className="py-12 text-center px-4">
      <div className="max-w-5xl mx-auto">
        {/* Master Grid Label */}
        <div className="mb-1">
          <span className="inline-block text-xs tracking-[0.15em] uppercase font-light text-white/40" style={{
            fontFamily: "'Helvetica Neue Condensed', 'Helvetica Neue', sans-serif",
            fontWeight: '300',
            letterSpacing: '0.15em',
            fontSize: '0.7rem'
          }}>
            Master Grid
          </span>
        </div>
        
        {/* Main Title */}
        <h1 className="mb-6 font-ultra-thin" style={{
          fontFamily: "'Helvetica Neue Condensed', 'Helvetica Neue', sans-serif",
          fontSize: 'clamp(3rem, 10vw, 6rem)',
          fontWeight: '50',
          fontStretch: 'ultra-condensed',
          letterSpacing: '-0.04em',
          lineHeight: '0.85',
          color: '#ffffff',
          textTransform: 'none'
        }}>
          Whisperer Deck
        </h1>
        
        {/* Subtitle */}
        <p className="text-white/45 mb-12 font-light mx-auto" style={{
          fontFamily: "'Helvetica Neue', 'Inter', sans-serif",
          fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
          fontWeight: '200',
          lineHeight: '1.4',
          maxWidth: '80%',
          letterSpacing: '0.01em'
        }}>
          Ultimate Advanced Prompt Hacks for Expert LLM Engineers Only
        </p>
      </div>
    </header>
  );
}