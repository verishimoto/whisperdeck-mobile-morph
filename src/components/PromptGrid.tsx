import { useEffect, useRef, useState } from "react";
import { PromptCard } from "./PromptCard";
import { HackPrompt } from "@/types";
import { hackPrompts } from "@/data/prompts";

function getColumnCount() {
  const width = window.innerWidth;
  if (width <= 640) return 1;
  if (width <= 900) return 2;
  if (width <= 1180) return 3;
  if (width < 1440) return 4;
  return 5;
}

interface PromptGridProps {
  prompts: HackPrompt[];
  filteredCount: number;
  totalCount: number;
  onCategoryFilter?: (category: string) => void;
}

export function PromptGrid({ prompts, filteredCount, totalCount, onCategoryFilter }: PromptGridProps) {
  const [renderedCount, setRenderedCount] = useState(40);
  const [columnCount, setColumnCount] = useState(getColumnCount);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateColumns = () => setColumnCount(getColumnCount());
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Lazy load sentinel
  useEffect(() => {
    if (renderedCount >= prompts.length) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const loadMoreObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRenderedCount(prev => Math.min(prev + 40, prompts.length));
        }
      },
      { rootMargin: '400px 0px' }
    );
    loadMoreObserver.observe(sentinel);
    return () => loadMoreObserver.disconnect();
  }, [renderedCount, prompts.length]);

  // Reset rendered count when prompts change
  useEffect(() => {
    setRenderedCount(40);
  }, [prompts]);

  const displayedPrompts = prompts.slice(0, renderedCount);
  const columns = Array.from({ length: columnCount }, () => [] as { prompt: HackPrompt; position: number }[]);
  displayedPrompts.forEach((prompt, position) => {
    columns[position % columnCount].push({ prompt, position });
  });

  return (
    <div className="pb-16">
      {/* Results Summary */}
      <div className="text-center mb-8">
        <p className="text-sm font-light text-foreground/60 font-sans">
          Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{" "}
          <span className="font-semibold text-foreground">{totalCount}</span> prompts
        </p>
      </div>

      {/* One grid row of independent vertical columns; cards never share row tracks. */}
      <div className="prompt-grid">
        {columns.map((column, columnIndex) => (
          <div className="prompt-grid-column" key={columnIndex}>
            {column.map(({ prompt, position }) => {
              const originalIndex = hackPrompts.findIndex(p => p.id === prompt.id);
              return (
                <div
                  key={prompt.id}
                  className="prompt-grid-item"
                  style={{ animationDelay: `${Math.min(position * 20, 240)}ms` }}
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
        ))}
      </div>

      {/* Load All button + Lazy load sentinel */}
      {renderedCount < prompts.length && (
        <>
          <div className="flex justify-center mt-6 mb-2">
            <button
              onClick={() => setRenderedCount(prompts.length)}
              className="px-6 py-2.5 text-sm font-light text-foreground/60 hover:text-foreground backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-lg transition-all"
            >
              Load all {prompts.length - renderedCount} remaining prompts
            </button>
          </div>
          <div ref={sentinelRef} className="h-8 w-full" />
        </>
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
