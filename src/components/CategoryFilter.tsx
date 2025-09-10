import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="sticky top-[120px] z-40 bg-background/80 backdrop-blur-xl border-b pb-4 mb-6">
      <div className="container px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Badge
            variant={selectedCategory === "" ? "default" : "secondary"}
            className={`cursor-pointer whitespace-nowrap transition-bounce hover:scale-105 ${
              selectedCategory === "" 
                ? "bg-primary text-primary-foreground shadow-brand" 
                : "hover:bg-primary/10"
            }`}
            onClick={() => onCategoryChange("")}
          >
            All ({categories.length + 1})
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={`cursor-pointer whitespace-nowrap transition-bounce hover:scale-105 ${
                selectedCategory === category 
                  ? "bg-primary text-primary-foreground shadow-brand" 
                  : "hover:bg-primary/10"
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}