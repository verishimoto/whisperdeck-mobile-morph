import { Search, ArrowUpDown } from "lucide-react";

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
    <div className="sticky top-[160px] z-40 mb-8 px-4 py-4 backdrop-blur-xl border-b border-white/5" style={{
      background: 'rgba(30, 35, 45, 0.6)'
    }}>
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-7xl mx-auto">
        {/* All Button */}
        <button
          onClick={() => onCategoryChange(null)}
          className="whitespace-nowrap text-sm px-4 border backdrop-blur-xl h-[38px] text-white bg-white/12 border-white/25 font-medium"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: '500',
            letterSpacing: '0.02em',
            borderRadius: '4px',
            minWidth: '80px',
            pointerEvents: 'auto'
          }}
          data-cursor="hover"
        >
          All
        </button>

        {/* Category Buttons */}
        {categories.slice(0, 5).map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className="whitespace-nowrap text-sm px-4 border backdrop-blur-xl h-[38px] text-white/90 bg-white/12 border-white/25 font-medium"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              letterSpacing: '0.02em',
              borderRadius: '4px',
              minWidth: '100px',
              pointerEvents: 'auto'
            }}
            data-cursor="hover"
          >
            {category}
          </button>
        ))}

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs h-[38px]">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-full px-4 pr-10 bg-white/12 border border-white/25 text-white placeholder:text-white/50 focus:outline-none focus:border-white/35 backdrop-blur-xl text-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              fontWeight: '400',
              borderRadius: '4px',
              pointerEvents: 'auto'
            }}
            data-cursor="hover"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
        </div>

        {/* Sort Button */}
        <button
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-2.5 h-[38px] w-[38px] text-white backdrop-blur-xl border bg-white/12 border-white/25 flex items-center justify-center"
          title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          style={{
            borderRadius: '4px',
            pointerEvents: 'auto'
          }}
          data-cursor="hover"
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}