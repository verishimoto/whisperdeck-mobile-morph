import { useEffect, useRef, useState } from "react";
import { PromptCard } from "./PromptCard";
import { HackPrompt } from "@/types";

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
  recommendedIds?: Set<number>;
  aiReasons?: Record<number, string>;
  onCategoryFilter?: (category: string) => void;
  onAdapt?: (prompt: HackPrompt) => void;
}

export function PromptGrid({ prompts, filteredCount, totalCount, recommendedIds, aiReasons, onCategoryFilter, onAdapt }: PromptGridProps) {
  const [renderedCount, setRenderedCount] = useState(40);
  const [columnCount, setColumnCount] = useState(getColumnCount);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateColumns = () => setColumnCount(getColumnCount());
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  useEffect(() => {
    if (renderedCount >= prompts.length) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const loadMoreObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setRenderedCount(prev => Math.min(prev + 40, prompts.length));
      },
      { rootMargin: '400px 0px' }
    );
    loadMoreObserver.observe(sentinel);
    return () => loadMoreObserver.disconnect();
  }, [renderedCount, prompts.length]);

  useEffect(() => { setRenderedCount(40); }, [prompts]);

  // Round-robin: row 1 reads 1 2 3…, row 2 continues 4 5 6…; each column grows independently.
  const displayedPrompts = prompts.slice(0, renderedCount);
  const columns = Array.from({ length: columnCount }, () => [] as { prompt: HackPrompt; position: number }[]);
  displayedPrompts.forEach((prompt, position) => {
    columns[position % columnCount].push({ prompt, position });
  });

  return (
    <div className="pb-16">
      <div className="text-center mb-8">
        <p className="text-sm font-light text-foreground/75 font-sans">
          Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{" "}
          <span className="font-semibold text-foreground">{totalCount}</span> prompts
        </p>
      </div>

      <div className="prompt-grid">
        {columns.map((column, columnIndex) => (
          <div className="prompt-grid-column" key={columnIndex}>
            {column.map(({ prompt, position }) => (
              <div key={prompt.id} className="prompt-grid-item" style={{ animationDelay: `${Math.min(position * 20, 240)}ms` }}>
                <PromptCard
                  prompt={prompt}
                  recommended={recommendedIds?.has(prompt.id)}
                  aiReason={aiReasons?.[prompt.id]}
                  onCategoryFilter={onCategoryFilter}
                  onAdapt={onAdapt}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {renderedCount < prompts.length && (
        <>
          <div className="flex justify-center mt-6 mb-2">
            <button
              onClick={() => setRenderedCount(prompts.length)}
              className="px-6 py-2.5 text-sm font-light text-foreground/70 hover:text-foreground backdrop-blur-xl border border-foreground/15 hover:border-foreground/30 rounded-lg transition-all"
            >
              Load all {prompts.length - renderedCount} remaining prompts
            </button>
          </div>
          <div ref={sentinelRef} className="h-8 w-full" />
        </>
      )}

      {prompts.length === 0 && (
        <div className="text-center py-20 liquid-glass-card max-w-lg mx-auto">
          <h3 className="text-xl font-semibold mb-2 text-foreground">No prompts found</h3>
          <p className="text-foreground/70 font-light px-6">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
