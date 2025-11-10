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
  
  const getCategoryStyles = (category: string) => {
    const styles: Record<string, { border: string; text: string; bg: string; hoverBg: string }> = {
      "Advanced": { border: "border-[#3B82F6]", text: "text-[#3B82F6]", bg: "bg-[#3B82F6]/20", hoverBg: "hover:bg-[#3B82F6]/30" },
      "Strategy": { border: "border-[#10B981]", text: "text-[#10B981]", bg: "bg-[#10B981]/20", hoverBg: "hover:bg-[#10B981]/30" },
      "Analysis": { border: "border-[#F59E0B]", text: "text-[#F59E0B]", bg: "bg-[#F59E0B]/20", hoverBg: "hover:bg-[#F59E0B]/30" },
      "Creativity": { border: "border-[#F43F5E]", text: "text-[#F43F5E]", bg: "bg-[#F43F5E]/20", hoverBg: "hover:bg-[#F43F5E]/30" },
      "Psychology": { border: "border-[#A855F7]", text: "text-[#A855F7]", bg: "bg-[#A855F7]/20", hoverBg: "hover:bg-[#A855F7]/30" }
    };
    return styles[category] || { border: "border-white/20", text: "text-white", bg: "bg-white/10", hoverBg: "hover:bg-white/15" };
  };
  
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

        {/* Category Buttons - Colored borders and hover fills */}
        {categories.slice(0, 5).map((category) => {
          const styles = getCategoryStyles(category);
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`whitespace-nowrap transition-all duration-300 text-sm px-4 border-2 backdrop-blur-xl h-[40px] ${styles.border} ${
                selectedCategory === category
                  ? `${styles.text} ${styles.bg} font-semibold` 
                  : `text-white/70 bg-white/5 ${styles.hoverBg} hover:${styles.text} hover:${styles.border} font-normal`
              }`}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: selectedCategory === category ? '600' : '400',
                letterSpacing: '0.02em',
                borderRadius: '10px',
                minWidth: '110px'
              }}
              data-cursor="hover"
            >
              {category}
            </button>
          );
        })}

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