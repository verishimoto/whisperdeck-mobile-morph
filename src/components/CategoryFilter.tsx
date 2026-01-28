import { ArrowUpDown, Search, Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";

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

const categoryColorMap: Record<string, string> = {
  Advanced: 'level-advanced',
  Strategy: 'level-strategy',
  Analysis: 'level-analysis',
  Creativity: 'level-creativity',
  Psychology: 'level-psychology',
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
    <div className="sticky top-[56px] z-40 mb-8 px-4 py-4 liquid-glass-header">
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-7xl mx-auto">
        {/* All Button */}
        <button
          onClick={() => {
            onCategoryChange(null);
            if (showFavorites && onFavoritesToggle) onFavoritesToggle();
          }}
          className={`tag-interactive whitespace-nowrap transition-all duration-300 text-sm px-4 py-1.5 rounded-full font-sans tracking-wide border
            ${
              selectedCategory === null && !showFavorites
                ? 'text-foreground bg-foreground/15 border-foreground/50 font-medium'
                : 'text-foreground/70 bg-transparent border-foreground/20 hover:text-foreground hover:border-foreground/50 hover:bg-foreground/15'
            }`}
          data-cursor="hover"
        >
          All
        </button>

        {/* Favorites Button */}
        {onFavoritesToggle && (
          <button
            onClick={onFavoritesToggle}
            className={`tag-interactive whitespace-nowrap transition-all duration-300 text-sm px-4 py-1.5 rounded-full font-sans tracking-wide border flex items-center gap-2
              ${
                showFavorites
                  ? 'text-pink-400 bg-pink-500/15 border-pink-500/50 font-medium shadow-[0_0_16px_hsl(320_95%_85%/0.4)]'
                  : 'text-foreground/70 bg-transparent border-foreground/20 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/15 hover:shadow-[0_0_16px_hsl(320_95%_85%/0.3)]'
              }`}
            data-cursor="hover"
          >
            <Heart className={`h-4 w-4 ${showFavorites ? 'fill-current' : ''}`} />
            Favorites
            {favoritesCount > 0 && (
              <span className="text-xs bg-foreground/20 rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                {favoritesCount}
              </span>
            )}
          </button>
        )}

        {/* Category Buttons - Color coded with card tag styling on hover */}
        {categories.map((category) => {
          const colorName = categoryColorMap[category];
          const isSelected = selectedCategory === category && !showFavorites;
          return (
            <button
              key={category}
              onClick={() => {
                onCategoryChange(category);
                if (showFavorites && onFavoritesToggle) onFavoritesToggle();
              }}
              className={`tag-interactive whitespace-nowrap transition-all duration-300 text-sm px-4 py-1.5 rounded-full font-sans tracking-wide border
                ${
                  isSelected
                    ? `text-${colorName} bg-${colorName}/15 border-${colorName}/50 font-medium shadow-[0_0_16px_hsl(var(--${colorName})/0.4)]`
                    : `text-foreground/70 bg-transparent border-foreground/20 hover:text-${colorName} hover:border-${colorName}/50 hover:bg-${colorName}/15 hover:shadow-[0_0_16px_hsl(var(--${colorName})/0.3)]`
                }`}
              data-cursor="hover"
            >
              {category}
            </button>
          );
        })}

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs h-10">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-full px-4 pr-10 liquid-glass-button text-foreground rounded-lg placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-sans"
            data-cursor="hover"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50 pointer-events-none" />
        </div>

        {/* Sort Button */}
        <button
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="h-10 w-10 liquid-glass-button rounded-lg flex items-center justify-center text-foreground/70 hover:text-foreground transition-all"
          title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          data-cursor="hover"
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
