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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container px-4 py-6 relative">
        {/* Theme Toggle - Positioned at top right */}
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-brand rounded-xl mb-3 shadow-glow">
            <span className="text-2xl">🔮</span>
          </div>
          <h1 className="text-2xl font-display font-extrabold bg-gradient-brand bg-clip-text text-transparent mb-2">
            Hack Whisperer
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Top {totalPrompts} Most Unknown AI Prompting Techniques
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 bg-primary-glow rounded-full">September 2024</span>
            <span>•</span>
            <span>Mobile Optimized</span>
            <span>•</span>
            <span>Copyable Examples</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search hack prompts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 text-base font-medium bg-muted/50 border-2 focus:border-primary transition-smooth"
          />
        </div>
      </div>
    </header>
  );
}