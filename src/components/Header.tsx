import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalPrompts: number;
}

export function Header({ searchQuery, onSearchChange, totalPrompts }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-glass-border bg-glass/80 backdrop-blur-xl">
      <div className="container px-4 py-8 relative">
        {/* Theme Toggle - Positioned at top right */}
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-display font-ultra-thin text-text-title mb-4 tracking-tighter leading-none">
            <span className="block md:inline">Prompt Hacks</span>
            <span className="block md:inline text-4xl md:text-6xl font-light text-text-secondary ml-0 md:ml-4">
              Master Grid
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary font-light max-w-4xl mx-auto leading-relaxed">
            Elevate your prompt engineering with {totalPrompts}+ advanced hacks.<br className="hidden md:block" />
            Discover, filter, and explore the most powerful techniques for AI creativity, control, and transformation.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Type to filter hacks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-14 text-lg bg-glass/40 border-glass-border backdrop-blur-sm focus:bg-glass/60 transition-smooth rounded-2xl"
          />
        </div>
      </div>
    </header>
  );
}