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
        {prompts.map((prompt) => {
          // Use the prompt's original ID for rank, not filtered index
          // This ensures static numbering (e.g., Creativity starts at #96 if that's its original position)
          const originalIndex = hackPrompts.findIndex(p => p.id === prompt.id);
          return (
            <div
              key={prompt.id}
              className="masonry-item animate-fade-in"
              style={{ animationDelay: `${Math.min(originalIndex * 15, 300)}ms`, animationFillMode: 'backwards' }}
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
