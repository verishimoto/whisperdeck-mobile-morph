import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PromptGrid } from "@/components/PromptGrid";
import { hackPrompts, categories } from "@/data/prompts";
import { FilterState } from "@/types";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
  });

  const filteredPrompts = useMemo(() => {
    return hackPrompts.filter((prompt) => {
      const matchesSearch = filters.search === "" || 
        prompt.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        prompt.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        prompt.category.toLowerCase().includes(filters.search.toLowerCase());
        
      const matchesCategory = filters.category === "" || prompt.category === filters.category;
      
      return matchesSearch && matchesCategory;
    });
  }, [filters]);

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{
      background: `hsl(var(--bg-main))`,
      backgroundImage: `radial-gradient(circle at 20% 20%, rgba(126, 0, 255, 0.15) 0%, transparent 30%), 
                        radial-gradient(circle at 80% 70%, rgba(0, 199, 255, 0.1) 0%, transparent 40%)`
    }}>
      <Header 
        searchQuery={filters.search}
        onSearchChange={handleSearchChange}
        totalPrompts={hackPrompts.length}
      />
      
      <CategoryFilter
        categories={categories}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
      />
      
      <PromptGrid
        prompts={filteredPrompts}
        filteredCount={filteredPrompts.length}
        totalCount={hackPrompts.length}
      />
    </div>
  );
};

export default Index;
