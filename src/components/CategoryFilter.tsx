import { ArrowUpDown, Search } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sort: 'asc' | 'desc') => void;
  searchQuery: string;
  onSearchChange: (search: string) => void;
}

const categoryColorMap: Record<string, string> = {
  Advanced: 'level-advanced',
  Strategy: 'level-strategy',
  Analysis: 'level-analysis',
  Creativity: 'level-creativity',
  Psychology: 'level-psychology',
};

export function CategoryFilter({ selectedCategory, onCategoryChange, sortOrder, onSortChange, searchQuery, onSearchChange }: CategoryFilterProps) {
  const categories = ['Advanced', 'Strategy', 'Analysis', 'Creativity', 'Psychology'];

  return (
    <div className="sticky top-[56px] z-40 mb-8 px-4 py-4 liquid-glass-header">
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-7xl mx-auto">
        {/* All Button */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`whitespace-nowrap transition-all duration-300 text-sm px-4 h-10 rounded-lg liquid-glass-button font-sans tracking-wide
            ${
              selectedCategory === null
                ? 'text-foreground bg-foreground/10 border-foreground/30 font-medium'
                : 'text-foreground/70 hover:text-foreground/90 font-light'
            }`}
          data-cursor="hover"
        >
          All
        </button>

        {/* Category Buttons - Color coded */}
        {categories.map((category) => {
          const colorName = categoryColorMap[category];
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`whitespace-nowrap transition-all duration-300 text-sm px-4 h-10 rounded-lg liquid-glass-button font-sans tracking-wide
                ${
                  isSelected
                    ? `text-${colorName} bg-${colorName}/20 border-${colorName}/60 font-semibold shadow-[0_0_20px_hsl(var(--${colorName})/0.3)]`
                    : `text-foreground/80 hover:text-${colorName} hover:border-${colorName}/40 hover:bg-${colorName}/10`
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
