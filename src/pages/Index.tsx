import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PromptGrid } from "@/components/PromptGrid";
import { AIFinderDialog, AIMatch } from "@/components/AIFinderDialog";
import { AdaptPromptDialog } from "@/components/AdaptPromptDialog";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useSelection } from "@/contexts/SelectionContext";
import { useAuth } from "@/contexts/AuthContext";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { hackPrompts } from "@/data/prompts";
import { FilterState, HackPrompt } from "@/types";
import { createFuzzySearch } from "@/lib/fuzzy-search";
import { CURATED_RECOMMENDED, SEARCH_RECOMMENDED_COUNT, MAX_MULTI_COPY, formatManyCards } from "@/lib/prompt-meta";
import { Sparkles, X, Copy } from "lucide-react";

const Index = () => {
  const { getFavorites } = useFavorites();
  const { selectedPrompts, clearSelection } = useSelection();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterState>({ search: "", category: "", sort: "desc" });
  const [showFavorites, setShowFavorites] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [aiMatches, setAiMatches] = useState<AIMatch[] | null>(null);
  const [adaptPrompt, setAdaptPrompt] = useState<HackPrompt | null>(null);

  useKeyboardShortcuts({
    onSearch: () => (document.querySelector('input[type="text"]') as HTMLInputElement)?.focus(),
    onCategoryChange: (category) => {
      setShowFavorites(false);
      setFilters(prev => ({ ...prev, category: category || "" }));
    },
  });

  const { filteredPrompts, searchTop } = useMemo(() => {
    if (aiMatches) {
      const list = aiMatches.map(m => hackPrompts.find(p => p.id === m.id)!).filter(Boolean);
      return { filteredPrompts: list, searchTop: list.map(p => p.id) };
    }
    let filtered = hackPrompts;
    if (showFavorites) {
      const favoriteIds = getFavorites();
      filtered = filtered.filter((p) => favoriteIds.includes(p.id));
    }
    if (filters.category && !showFavorites) filtered = filtered.filter((p) => p.category === filters.category);

    if (filters.search.trim()) {
      const results = createFuzzySearch(filtered).search(filters.search).map(r => r.item);
      // Keep relevance order while searching; top matches become Recommended.
      return { filteredPrompts: results, searchTop: results.slice(0, SEARCH_RECOMMENDED_COUNT).map(p => p.id) };
    }
    filtered = [...filtered].sort((a, b) =>
      filters.sort === 'asc' ? (a.score || 0) - (b.score || 0) : (b.score || 0) - (a.score || 0));
    return { filteredPrompts: filtered, searchTop: null as number[] | null };
  }, [filters, showFavorites, getFavorites, aiMatches]);

  const recommendedIds = useMemo(() => new Set(searchTop ?? CURATED_RECOMMENDED), [searchTop]);
  const aiReasons = useMemo(() => Object.fromEntries((aiMatches ?? []).map(m => [m.id, m.reason])), [aiMatches]);

  const openFinder = () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Sign in to use the AI Finder." });
      navigate('/auth');
      return;
    }
    setFinderOpen(true);
  };

  const copySelected = async () => {
    await navigator.clipboard.writeText(formatManyCards(selectedPrompts));
    toast({ title: `${selectedPrompts.length} cards copied` });
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <Header searchQuery="" onSearchChange={() => {}} totalPrompts={hackPrompts.length} />

      <CategoryFilter
        selectedCategory={filters.category}
        onCategoryChange={(c) => { setAiMatches(null); setFilters(prev => ({ ...prev, category: c || "" })); }}
        sortOrder={filters.sort}
        onSortChange={(sort) => setFilters(prev => ({ ...prev, sort }))}
        searchQuery={filters.search}
        onSearchChange={(search) => { setAiMatches(null); setFilters(prev => ({ ...prev, search })); }}
        showFavorites={showFavorites}
        onFavoritesToggle={() => {
          setAiMatches(null);
          setShowFavorites(prev => !prev);
          if (!showFavorites) setFilters(prev => ({ ...prev, category: "" }));
        }}
        onOpenFinder={openFinder}
      />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {aiMatches && (
          <div className="flex items-center justify-center gap-3 mb-4 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>AI Finder picked {aiMatches.length} prompts for your task</span>
            <button onClick={() => setAiMatches(null)} className="flex items-center gap-1 px-3 py-1 rounded-full liquid-glass-button">
              <X className="h-3.5 w-3.5" />Clear
            </button>
          </div>
        )}
        <PromptGrid
          prompts={filteredPrompts}
          filteredCount={filteredPrompts.length}
          totalCount={hackPrompts.length}
          recommendedIds={recommendedIds}
          aiReasons={aiReasons}
          onCategoryFilter={(c) => { setAiMatches(null); setFilters(prev => ({ ...prev, category: c })); }}
          onAdapt={setAdaptPrompt}
        />
      </main>

      {selectedPrompts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 liquid-glass-header rounded-full px-4 py-2 flex items-center gap-3 border border-foreground/15">
          <span className="text-sm">{selectedPrompts.length}/{MAX_MULTI_COPY} selected</span>
          <button onClick={copySelected} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-primary text-primary-foreground">
            <Copy className="h-4 w-4" />Copy all
          </button>
          <button onClick={clearSelection} aria-label="Clear selection" className="p-1.5 rounded-full liquid-glass-button"><X className="h-4 w-4" /></button>
        </div>
      )}

      <AIFinderDialog open={finderOpen} onClose={() => setFinderOpen(false)} onResults={setAiMatches} />
      <AdaptPromptDialog prompt={adaptPrompt} onClose={() => setAdaptPrompt(null)} />
    </div>
  );
};

export default Index;
