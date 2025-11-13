import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PromptGrid } from "@/components/PromptGrid";
import { PromptCarousel } from "@/components/PromptCarousel";
import { PromptTree } from "@/components/PromptTree";
import { PromptComposer } from "@/components/PromptComposer";
import { hackPrompts, categories } from "@/data/prompts";
import { FilterState } from "@/types";
import { createFuzzySearch } from "@/lib/fuzzy-search";
import { LayoutGrid, Layout, Network } from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    sort: "desc",
  });
  const [viewMode, setViewMode] = useState<'grid' | 'carousel' | 'tree'>('grid');

  const filteredPrompts = useMemo(() => {
    let filtered = hackPrompts;

    // Apply category filter first
    if (filters.category) {
      filtered = filtered.filter((prompt) => prompt.category === filters.category);
    }

    // Apply fuzzy search if there's a search query
    if (filters.search.trim()) {
      const fuse = createFuzzySearch(filtered);
      const results = fuse.search(filters.search);
      filtered = results.map(result => result.item);
    }

    // Sort by score (descending = high to low, ascending = low to high)
    filtered.sort((a, b) => {
      if (filters.sort === 'asc') {
        return (a.score || 0) - (b.score || 0);
      } else {
        return (b.score || 0) - (a.score || 0);
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
    <div className="min-h-screen bg-background text-foreground pb-24">
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

      {/* View Mode Toggle */}
      <div className="max-w-7xl mx-auto px-6 mb-6 flex justify-end gap-2">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2.5 h-[44px] w-[44px] transition-all backdrop-blur-xl border flex items-center justify-center ${
            viewMode === 'grid'
              ? 'text-white bg-white/15 border-white/30'
              : 'text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
          }`}
          style={{ borderRadius: '8px' }}
          title="Grid View"
          data-cursor="hover"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
        <button
          onClick={() => setViewMode('carousel')}
          className={`p-2.5 h-[44px] w-[44px] transition-all backdrop-blur-xl border flex items-center justify-center ${
            viewMode === 'carousel'
              ? 'text-white bg-white/15 border-white/30'
              : 'text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
          }`}
          style={{ borderRadius: '8px' }}
          title="Carousel View"
          data-cursor="hover"
        >
          <Layout className="h-4 w-4" />
        </button>
        <button
          onClick={() => setViewMode('tree')}
          className={`p-2.5 h-[44px] w-[44px] transition-all backdrop-blur-xl border flex items-center justify-center ${
            viewMode === 'tree'
              ? 'text-white bg-white/15 border-white/30'
              : 'text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
          }`}
          style={{ borderRadius: '8px' }}
          title="Tree View"
          data-cursor="hover"
        >
          <Network className="h-4 w-4" />
        </button>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 mb-12">
        {viewMode === 'grid' ? (
          <PromptGrid
            prompts={filteredPrompts}
            filteredCount={filteredPrompts.length}
            totalCount={hackPrompts.length}
          />
        ) : viewMode === 'carousel' ? (
          <PromptCarousel prompts={filteredPrompts} />
        ) : (
          <PromptTree prompts={filteredPrompts} />
        )}
      </div>

      <PromptComposer />
    </div>
  );
};

export default Index;
