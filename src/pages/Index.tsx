import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PromptGrid } from "@/components/PromptGrid";
import { PromptComposer } from "@/components/PromptComposer";
import { hackPrompts, categories } from "@/data/prompts";
import { FilterState } from "@/types";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    sort: "desc",
  });

  const filteredPrompts = useMemo(() => {
    let filtered = hackPrompts.filter((prompt) => {
      const matchesSearch = filters.search === "" || 
        prompt.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        prompt.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        prompt.category.toLowerCase().includes(filters.search.toLowerCase());
        
      const matchesCategory = filters.category === "" || prompt.category === filters.category;
      
      return matchesSearch && matchesCategory;
    });

    // Sort by score (descending = high to low, ascending = low to high)
    filtered.sort((a, b) => {
      if (filters.sort === 'asc') {
        return a.score - b.score; // Low to high (250 to 1)
      } else {
        return b.score - a.score; // High to low (1 to 250)
      }
    });

    return filtered;
  }, [filters]);

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleCategoryChange = (category: string | null) => {
    setFilters(prev => ({ ...prev, category: category || "" }));
  };

  const handleSortChange = (sort: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sort }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        searchQuery=""
        onSearchChange={() => {}}
        totalPrompts={hackPrompts.length}
      />
      
      <CategoryFilter
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
        sortOrder={filters.sort}
        onSortChange={handleSortChange}
        searchQuery={filters.search}
        onSearchChange={handleSearchChange}
      />
      
      <div className="max-w-[1400px] mx-auto px-6">
        <PromptGrid
          prompts={filteredPrompts}
          filteredCount={filteredPrompts.length}
          totalCount={hackPrompts.length}
        />
      </div>

      <PromptComposer />
    </div>
  );
};

export default Index;
