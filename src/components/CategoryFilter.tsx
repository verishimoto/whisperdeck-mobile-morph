import { Badge } from "@/components/ui/badge";

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
    { name: "Advanced", count: 50, color: "text-level-advanced" },
    { name: "Strategy", count: 50, color: "text-level-strategy" },
    { name: "Analysis", count: 50, color: "text-level-analysis" },
    { name: "Creativity", count: 50, color: "text-level-creativity" },
    { name: "Psychology", count: 50, color: "text-level-psychology" },
    { name: "Essential", count: 50, color: "text-level-essential" }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="flex gap-2 items-center justify-center flex-wrap px-4 max-w-full">
          {categories.map((category) => {
            const isActive = selectedCategory === category.name || (selectedCategory === null && category.name === "All");
            return (
              <button
                key={category.name}
                onClick={() => onCategoryChange(category.name === "All" ? null : category.name)}
                className={`whitespace-nowrap flex items-center gap-2 transition-all duration-300 font-condensed font-medium text-base px-4 py-2 border rounded-lg ${
                  isActive 
                    ? `${category.color} bg-white/15 border-current backdrop-blur-xl` 
                    : `${category.color} border-current/20 bg-transparent hover:bg-white/10 backdrop-blur-sm`
                }`}
                data-cursor="hover"
              >
                {category.name}
                <span className="text-xs opacity-70">({category.count})</span>
              </button>
            );
          })}
          <button
            onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="ml-4 p-2 text-white hover:text-level-strategy transition-colors backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10"
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            data-cursor="hover"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
    </div>
  );
}