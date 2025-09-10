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
    <div className="min-h-screen bg-gradient-glow">
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
