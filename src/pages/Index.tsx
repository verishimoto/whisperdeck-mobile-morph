import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PromptGrid } from "@/components/PromptGrid";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { hackPrompts } from "@/data/prompts";
import { FilterState } from "@/types";
import { createFuzzySearch } from "@/lib/fuzzy-search";

const Index = () => {
  const { getFavorites } = useFavorites();

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    sort: "desc",
  });
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

    if (showFavorites) {
      const favoriteIds = getFavorites();
      filtered = filtered.filter((prompt) => favoriteIds.includes(prompt.id));
    }

    if (filters.category && !showFavorites) {
      filtered = filtered.filter((prompt) => prompt.category === filters.category);
    }

    if (filters.search.trim()) {
      const fuse = createFuzzySearch(filtered);
      const results = fuse.search(filters.search);
      filtered = results.map(result => result.item);
    }

    filtered = [...filtered].sort((a, b) => {
      if (filters.sort === 'asc') {
        return (a.score || 0) - (b.score || 0);
      }
      return (b.score || 0) - (a.score || 0);
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
        showFavorites={showFavorites}
        onFavoritesToggle={handleFavoritesToggle}
      />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <PromptGrid
          prompts={filteredPrompts}
          filteredCount={filteredPrompts.length}
          totalCount={hackPrompts.length}
          onCategoryFilter={(category) => handleCategoryChange(category)}
        />
      </main>
    </div>
  );
};

export default Index;
