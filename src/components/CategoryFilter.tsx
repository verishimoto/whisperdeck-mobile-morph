import { ArrowUpDown, Search, Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sort: 'asc' | 'desc') => void;
  searchQuery: string;
  onSearchChange: (search: string) => void;
  showFavorites?: boolean;
  onFavoritesToggle?: () => void;
}

const categoryColorMap: Record<string, { var: string; hsl: string }> = {
  Advanced: { var: 'level-advanced', hsl: '320 98% 87%' },
  Strategy: { var: 'level-strategy', hsl: '150 90% 80%' },
  Analysis: { var: 'level-analysis', hsl: '210 98% 82%' },
  Creativity: { var: 'level-creativity', hsl: '290 95% 85%' },
  Psychology: { var: 'level-psychology', hsl: '340 95% 85%' },
};

export function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange, 
  sortOrder, 
  onSortChange, 
  searchQuery, 
  onSearchChange,
  showFavorites = false,
  onFavoritesToggle 
}: CategoryFilterProps) {
  const categories = ['Advanced', 'Strategy', 'Analysis', 'Creativity', 'Psychology'];
  const { favoritesCount } = useFavorites();

  return (
    <div className="sticky top-[72px] z-40 mb-8 px-4 py-4 liquid-glass-header border-b-0">
      <div className="flex items-center max-w-7xl mx-auto">
        {/* Left: Category buttons */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* All Button */}
          <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
              <button
                onClick={() => {
                  onCategoryChange(null);
                  if (showFavorites && onFavoritesToggle) onFavoritesToggle();
                }}
                className={`tag-interactive whitespace-nowrap transition-all duration-300 text-sm px-4 py-1.5 rounded-full font-sans tracking-wide border
                  ${
                    selectedCategory === null && !showFavorites
                      ? 'text-foreground bg-foreground/15 border-foreground/50 font-medium shadow-[0_0_12px_hsl(0_0%_100%/0.2)]'
                      : 'text-foreground/50 bg-transparent border-foreground/15 hover:text-foreground hover:border-foreground/40 hover:bg-foreground/10'
                  }`}
                data-cursor="hover"
              >
                All
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="liquid-glass-card">
              <p className="text-sm">Show all prompts</p>
            </TooltipContent>
          </Tooltip>

          {/* Favorites Button */}
          {onFavoritesToggle && (
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <button
                  onClick={onFavoritesToggle}
                  className={`tag-interactive whitespace-nowrap transition-all duration-300 text-sm px-4 py-1.5 rounded-full font-sans tracking-wide border flex items-center gap-2
                    ${
                      showFavorites
                        ? 'text-pink-400 bg-pink-500/15 border-pink-500/50 font-medium shadow-[0_0_16px_hsl(320_95%_85%/0.4)]'
                        : 'text-pink-400/50 bg-transparent border-pink-500/20 hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10'
                    }`}
                  data-cursor="hover"
                >
                  <Heart className={`h-4 w-4 ${showFavorites ? 'fill-current' : ''}`} />
                  Favorites
                  {favoritesCount > 0 && (
                    <span className="text-xs bg-pink-500/20 rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="liquid-glass-card">
                <p className="text-sm">View your saved favorites</p>
              </TooltipContent>
            </Tooltip>
          )}

          {/* Category Buttons - Muted when not hovered, bright when hovered/selected */}
          {categories.map((category) => {
            const colors = categoryColorMap[category];
            const isSelected = selectedCategory === category && !showFavorites;
            return (
              <Tooltip key={category} delayDuration={500}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      onCategoryChange(category);
                      if (showFavorites && onFavoritesToggle) onFavoritesToggle();
                    }}
                    className={`tag-interactive whitespace-nowrap transition-all duration-300 text-sm px-4 py-1.5 rounded-full font-sans tracking-wide border
                      ${
                        isSelected
                          ? `font-medium shadow-[0_0_16px_hsl(${colors.hsl}/0.5)]`
                          : 'hover:shadow-[0_0_12px_hsl(${colors.hsl}/0.3)]'
                      }`}
                    style={{
                      color: isSelected ? `hsl(${colors.hsl})` : `hsl(${colors.hsl} / 0.5)`,
                      backgroundColor: isSelected ? `hsl(${colors.hsl} / 0.15)` : 'transparent',
                      borderColor: isSelected ? `hsl(${colors.hsl} / 0.5)` : `hsl(${colors.hsl} / 0.2)`,
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.color = `hsl(${colors.hsl})`;
                        e.currentTarget.style.borderColor = `hsl(${colors.hsl} / 0.5)`;
                        e.currentTarget.style.backgroundColor = `hsl(${colors.hsl} / 0.1)`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.color = `hsl(${colors.hsl} / 0.5)`;
                        e.currentTarget.style.borderColor = `hsl(${colors.hsl} / 0.2)`;
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    data-cursor="hover"
                  >
                    {category}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="liquid-glass-card">
                  <p className="text-sm">Filter by {category}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Right: Search and Sort */}
        <div className="flex items-center gap-2 ml-6">
          {/* Search Bar */}
          <div className="relative w-48">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-9 px-4 pr-10 rounded-full border border-foreground/20 bg-transparent text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm font-sans"
              data-cursor="hover"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40 pointer-events-none" />
          </div>

          {/* Sort Button */}
          <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
              <button
                onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="h-9 w-9 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/50 hover:text-foreground hover:border-foreground/40 hover:bg-foreground/10 transition-all"
                data-cursor="hover"
              >
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="liquid-glass-card">
              <p className="text-sm">Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
