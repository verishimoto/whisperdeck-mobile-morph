import { useState, useMemo, useRef } from "react";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { VirtualizedPromptGrid } from "@/components/VirtualizedPromptGrid";
import { PromptCarousel } from "@/components/PromptCarousel";
import { PromptTree } from "@/components/PromptTree";
import { PromptComposer } from "@/components/PromptComposer";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { ModelToggle } from "@/components/ModelToggle";
import { ChainBuilder } from "@/components/ChainBuilder";
import { ArchitectGate } from "@/components/ArchitectGate";
import { useArchitect } from "@/contexts/ArchitectContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { hackPrompts, categories } from "@/data/prompts";
import { FilterState } from "@/types";
import { createFuzzySearch } from "@/lib/fuzzy-search";
import { LayoutGrid, Layout, Network } from "lucide-react";

const Index = () => {
  const { isArchitect } = useArchitect();
  const { getFavorites } = useFavorites();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    sort: "desc",
  });
  const [viewMode, setViewMode] = useState<'grid' | 'carousel' | 'tree'>('grid');
  const [showFavorites, setShowFavorites] = useState(false);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSearch: () => {
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      searchInput?.focus();
    },
    onCategoryChange: (category) => {
      setShowFavorites(false);
      setFilters(prev => ({ ...prev, category: category || "" }));
    },
  });

  const filteredPrompts = useMemo(() => {
    let filtered = hackPrompts;

    // Apply favorites filter
    if (showFavorites) {
      const favoriteIds = getFavorites();
      filtered = filtered.filter((prompt) => favoriteIds.includes(prompt.id));
    }

    // Apply category filter
    if (filters.category && !showFavorites) {
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
  }, [filters, showFavorites, getFavorites]);

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleCategoryChange = (category: string | null) => {
    setFilters(prev => ({ ...prev, category: category || "" }));
  };

  const handleSortChange = (sort: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sort }));
  };

  const handleFavoritesToggle = () => {
    setShowFavorites(prev => !prev);
    if (!showFavorites) {
      setFilters(prev => ({ ...prev, category: "" }));
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${!isArchitect ? 'pb-[320px]' : 'pb-16'}`}>
      <ArchitectGate />
      
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
        showFavorites={showFavorites}
        onFavoritesToggle={handleFavoritesToggle}
      />

      {/* View Mode Toggle - Hidden for Architects */}
      {!isArchitect && (
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
      )}
      
      <div className="max-w-[1400px] mx-auto px-6 mb-12">
        {/* Architect always sees grid, users can switch views */}
        {isArchitect || viewMode === 'grid' ? (
          <VirtualizedPromptGrid
            prompts={filteredPrompts}
            filteredCount={filteredPrompts.length}
            totalCount={hackPrompts.length}
            onCategoryFilter={(category) => handleCategoryChange(category)}
          />
        ) : viewMode === 'carousel' ? (
          <PromptCarousel prompts={filteredPrompts} />
        ) : (
          <PromptTree prompts={filteredPrompts} />
        )}
      </div>

      {/* User-only gamification features - Hidden for Architects */}
      {!isArchitect && (
        <>
          <PromptComposer />
          <ProgressDashboard />
          <ModelToggle />
        </>
      )}

      {/* Chain Builder - Available to ALL users including Architects */}
      <ChainBuilder />
    </div>
  );
};

export default Index;
