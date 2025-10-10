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
  return (
    <div className="mb-8 px-4">
      <div className="flex items-center justify-center gap-3 flex-wrap max-w-6xl mx-auto">
        {/* All Button */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`whitespace-nowrap transition-all duration-300 text-sm px-5 py-3 border rounded-xl backdrop-blur-xl h-[48px] ${
            selectedCategory === null
              ? 'text-white bg-white/15 border-white/30 font-medium' 
              : 'text-white/70 border-white/15 bg-white/5 hover:bg-white/10 hover:text-white font-light'
          }`}
          style={{
            fontFamily: "'Helvetica Neue', 'Inter', sans-serif",
            fontWeight: selectedCategory === null ? '500' : '300',
            letterSpacing: '0.01em'
          }}
          data-cursor="hover"
        >
          All
        </button>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md h-[48px]">
          <input
            type="text"
            placeholder="Type to filter hacks"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-full px-5 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              fontWeight: '300'
            }}
            data-cursor="hover"
          />
        </div>

        {/* Sort Button */}
        <button
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-3 h-[48px] w-[48px] text-white/70 hover:text-white transition-all backdrop-blur-xl border border-white/15 rounded-xl hover:bg-white/10 hover:border-white/25 flex items-center justify-center"
          title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          data-cursor="hover"
        >
          <ArrowUpDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}