import { ArrowUpDown } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sort: 'asc' | 'desc') => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange, sortOrder, onSortChange }: CategoryFilterProps) {
  const categories = [
    { name: "All", count: 250, color: "text-white" },
    { name: "Ultra", count: 50, color: "text-level-ultra" },
    { name: "Master", count: 50, color: "text-level-master" },
    { name: "Advanced", count: 45, color: "text-level-advanced" },
    { name: "Strategy", count: 45, color: "text-level-strategy" },
    { name: "Analysis", count: 35, color: "text-level-analysis" },
    { name: "Creativity", count: 25, color: "text-level-creativity" }
  ];

  return (
    <div className="mb-8 px-4">
      <div className="flex items-center justify-center gap-3 flex-wrap max-w-6xl mx-auto">
        {categories.map((category) => {
          const isActive = selectedCategory === category.name || (selectedCategory === null && category.name === "All");
          return (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name === "All" ? null : category.name)}
              className={`whitespace-nowrap flex items-center gap-2 transition-all duration-300 text-sm px-4 py-2.5 border rounded-lg backdrop-blur-xl ${
                isActive 
                  ? `${category.color} bg-white/15 border-current font-medium` 
                  : `${category.color} border-current/20 bg-transparent hover:bg-white/8 font-light`
              }`}
              style={{
                fontFamily: "'Helvetica Neue', 'Inter', sans-serif",
                fontWeight: isActive ? '500' : '300',
                letterSpacing: '0.01em'
              }}
              data-cursor="hover"
            >
              {category.name}
              <span className="text-xs opacity-60">({category.count})</span>
            </button>
          );
        })}
        <button
          onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="ml-2 p-2.5 text-white/70 hover:text-white transition-all backdrop-blur-xl border border-white/15 rounded-lg hover:bg-white/10 hover:border-white/25"
          title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
          data-cursor="hover"
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}