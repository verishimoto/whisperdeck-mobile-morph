import { useEffect, useRef, useState } from "react";
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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

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
      {
        threshold: 0.1,
        rootMargin: '50px 0px',
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    // Re-observe when prompts change
    cardRefs.current.forEach((element, index) => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });
  }, [prompts]);

  const registerCard = (element: HTMLDivElement | null, index: number) => {
    if (element) {
      cardRefs.current.set(index, element);
      element.setAttribute('data-index', index.toString());
      observerRef.current?.observe(element);
    }
  };

  return (
    <div className="pb-16">
      {/* Results Summary */}
      <div className="text-center mb-8">
        <p className="text-sm font-light text-foreground/60 font-sans">
          Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{" "}
          <span className="font-semibold text-foreground">{totalCount}</span> prompts
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {prompts.map((prompt, filteredIndex) => {
          // Use the prompt's original ID for rank, not filtered index
          // This ensures static numbering (e.g., Creativity starts at #96 if that's its original position)
          const originalIndex = hackPrompts.findIndex(p => p.id === prompt.id);
          const isVisible = visibleCards.has(filteredIndex);
          
          return (
            <div
              key={prompt.id}
              ref={(el) => registerCard(el, filteredIndex)}
              className={`masonry-item ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
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
