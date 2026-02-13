import { useEffect, useRef, useState, useCallback } from "react";
import { PromptCard } from "./PromptCard";
import { HackPrompt } from "@/types";
import { hackPrompts } from "@/data/prompts";

interface PromptGridProps {
  prompts: HackPrompt[];
  filteredCount: number;
  totalCount: number;
  onCategoryFilter?: (category: string) => void;
}

export function PromptGrid({ prompts, filteredCount, totalCount, onCategoryFilter }: PromptGridProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [renderedCount, setRenderedCount] = useState(20); // Lazy load: start with 20
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  

  // Intersection observer for fade-in animation
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px 0px' }
    );
    return () => { observerRef.current?.disconnect(); };
  }, []);

  // Lazy load sentinel - loads more cards as user scrolls
  useEffect(() => {
    if (renderedCount >= prompts.length) return;
    
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const loadMoreObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRenderedCount(prev => Math.min(prev + 20, prompts.length));
        }
      },
      { rootMargin: '400px 0px' }
    );
    
    loadMoreObserver.observe(sentinel);
    return () => loadMoreObserver.disconnect();
  }, [renderedCount, prompts.length]);

  // Reset rendered count when prompts change (filter/search)
  useEffect(() => {
    setRenderedCount(20);
    setVisibleCards(new Set());
  }, [prompts]);

  const registerCard = useCallback((element: HTMLDivElement | null, index: number) => {
    if (element) {
      element.setAttribute('data-index', index.toString());
      observerRef.current?.observe(element);
    }
  }, []);

  const displayedPrompts = prompts.slice(0, renderedCount);

  return (
    <div className="pb-16">
      {/* Results Summary */}
      <div className="text-center mb-8">
        <p className="text-sm font-light text-foreground/60 font-sans">
          Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{" "}
          <span className="font-semibold text-foreground">{totalCount}</span> prompts
        </p>
      </div>

      {/* CSS Grid - Fixed height cards */}
      <div className="prompt-grid">
        {displayedPrompts.map((prompt, filteredIndex) => {
          const originalIndex = hackPrompts.findIndex(p => p.id === prompt.id);
          const isVisible = visibleCards.has(filteredIndex);
          
          return (
            <div
              key={prompt.id}
              ref={(el) => registerCard(el, filteredIndex)}
              className={`masonry-item ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <PromptCard 
                prompt={prompt} 
                index={originalIndex}
                onCategoryFilter={onCategoryFilter}
              />
            </div>
          );
        })}
      </div>

      {/* Lazy load sentinel */}
      {renderedCount < prompts.length && (
        <div ref={sentinelRef} className="h-8 w-full" />
      )}

      {/* Empty State */}
      {prompts.length === 0 && (
        <div className="text-center py-20 liquid-glass-card max-w-lg mx-auto">
          <div className="mb-4 opacity-50 text-6xl">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">No prompts found</h3>
          <p className="text-foreground/60 font-light px-6">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </div>
      )}

    </div>
  );
}