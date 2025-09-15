import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    { name: "All", count: 250, color: "text-white" },
    { name: "Ultra", count: 5, color: "text-level-ultra" },
    { name: "Master", count: 15, color: "text-level-master" },
    { name: "Advanced", count: 30, color: "text-level-advanced" },
    { name: "Strategy", count: 50, color: "text-level-strategy" },
    { name: "Analysis", count: 50, color: "text-level-analysis" },
    { name: "Creativity", count: 50, color: "text-level-creativity" },
    { name: "Psychology", count: 25, color: "text-level-psychology" },
    { name: "Essential", count: 25, color: "text-level-essential" }
  ];

  return (
    <div className="flex gap-3 justify-center overflow-x-auto pb-2 scrollbar-hide px-4">
      {categories.map((category) => {
        const isActive = selectedCategory === category.name || (selectedCategory === null && category.name === "All");
        return (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name === "All" ? null : category.name)}
            className={`whitespace-nowrap flex items-center gap-2 hover:scale-105 transition-all duration-300 font-semibold text-lg px-6 py-3 border-2 ${
              isActive 
                ? `${category.color} bg-white/10 border-current` 
                : `${category.color} border-current/30 bg-transparent hover:bg-white/5`
            }`}
            style={{ 
              borderRadius: 'var(--radius-md)',
              backdropFilter: 'blur(10px)'
            }}
            data-cursor="hover"
          >
            {category.name}
            <span className="text-sm opacity-70">({category.count})</span>
          </button>
        );
      })}
    </div>
  );
}