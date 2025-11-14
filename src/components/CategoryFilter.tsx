import { ArrowUpDown, Search } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sort: 'asc' | 'desc') => void;
  searchQuery: string;
  onSearchChange: (search: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange, sortOrder, onSortChange, searchQuery, onSearchChange }: CategoryFilterProps) {
  const categories = ['Advanced', 'Strategy', 'Analysis', 'Creativity', 'Psychology'];

  const categoryColorMap: Record<string, string> = {
    Advanced: 'level-advanced',
    Strategy: 'level-strategy',
    Analysis: 'level-analysis',
    Creativity: 'level-creativity',
    Psychology: 'level-psychology',
  };

  return (
    <div className="sticky top-[160px] z-40 mb-8 px-4 py-4 backdrop-blur-2xl bg-black/20 border-b border-white/10">
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-7xl mx-auto">
        {/* All Button */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`whitespace-nowrap transition-all duration-300 text-sm px-4 h-10 rounded-lg backdrop-blur-xl font-sans tracking-wide
            ${
              selectedCategory === null
                ? 'text-white bg-white/20 border border-white/30 font-medium'
                : 'text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white/90 font-light'
            }`}
          data-cursor="hover"
        >
          All
        </button>

        {/* Category Buttons */}
        {categories.map((category) => {
          const colorName = categoryColorMap[category];
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`whitespace-nowrap transition-all duration-300 text-sm px-4 h-10 rounded-lg backdrop-blur-xl font-sans tracking-wide border
                ${
                  isSelected
                    ? `text-white bg-${colorName}/30 border-${colorName}/80 font-semibold`
                    : `text-white/80 bg-white/5 border-white/10 hover:border-${colorName}/60 hover:bg-${colorName}/20 hover:text-white`
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
            className="w-full h-full px-4 pr-10 bg-white/5 border border-white/10 text-white rounded-lg placeholder:text-white/50 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all backdrop-blur-xl text-sm font-sans"
            data-cursor="hover"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
        </div>

        {/* Sort Button */}
        <button
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="h-10 w-10 text-white/70 hover:text-white transition-all backdrop-blur-xl border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/25 flex items-center justify-center"
          title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          data-cursor="hover"
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
