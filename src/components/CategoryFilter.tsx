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
  
  return (
    <div className="sticky top-[160px] z-40 mb-8 px-4 py-4 backdrop-blur-xl bg-black/10 border-b border-white/5">
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-7xl mx-auto">
        {/* All Button */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`whitespace-nowrap transition-all duration-300 text-sm px-4 border backdrop-blur-xl h-[40px] ${
            selectedCategory === null
              ? 'text-white bg-white/15 border-white/30 font-medium' 
              : 'text-white/60 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white/80 font-light'
          }`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: selectedCategory === null ? '500' : '400',
            letterSpacing: '0.01em',
            borderRadius: '8px',
            minWidth: '80px'
          }}
          data-cursor="hover"
        >
          All
        </button>

        {/* Category Buttons - Show 10 on large screens, 5 on mobile */}
        {categories.slice(0, 5).map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`whitespace-nowrap transition-all duration-300 text-sm px-4 border backdrop-blur-xl h-[40px] ${
              selectedCategory === category
                ? 'text-white bg-white/15 border-white/30 font-medium underline decoration-2 underline-offset-4' 
                : 'text-white/60 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white/80 font-light'
            }`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: selectedCategory === category ? '500' : '400',
              letterSpacing: '0.01em',
              borderRadius: '8px',
              minWidth: '100px'
            }}
            data-cursor="hover"
          >
            {category}
          </button>
        ))}

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs h-[40px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-full px-4 pr-10 bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-xl text-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              fontWeight: '400',
              borderRadius: '8px'
            }}
            data-cursor="hover"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
        </div>

        {/* Sort Button */}
        <button
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-2.5 h-[40px] w-[40px] text-white/60 hover:text-white transition-all backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/25 flex items-center justify-center"
          title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          style={{
            borderRadius: '8px'
          }}
          data-cursor="hover"
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}