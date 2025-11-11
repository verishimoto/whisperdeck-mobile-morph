import { PromptCard } from "./PromptCard";
import { HackPrompt } from "@/types";

interface PromptGridProps {
  prompts: HackPrompt[];
  filteredCount: number;
  totalCount: number;
}

export function PromptGrid({ prompts, filteredCount, totalCount }: PromptGridProps) {
  return (
    <div className="px-6 pb-16">
      {/* Results Summary */}
      <div className="text-center mb-8">
        <p className="text-white/50 font-light" style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          fontSize: '0.875rem',
          fontWeight: '400'
        }}>
          Showing <span className="font-semibold text-white">{filteredCount}</span> of{" "}
          <span className="font-semibold text-white">{totalCount}</span> prompts
        </p>
      </div>

      {/* Grid - 4 → 2 → 1 Responsive with column-based expansion */}
      <div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        style={{ 
          alignItems: 'stretch',
          gridAutoRows: 'minmax(min-content, max-content)',
          gridAutoFlow: 'row'
        }}
      >
        {prompts.map((prompt, index) => (
          <div
            key={prompt.id}
            className="animate-in fade-in slide-in-from-bottom-2 w-full"
            style={{
              animationDelay: `${index * 30}ms`,
              animationDuration: '400ms',
              animationFillMode: 'backwards'
            }}
          >
            <PromptCard prompt={prompt} index={index} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {prompts.length === 0 && (
        <div className="text-center py-16 glass-card rounded-xl max-w-md mx-auto">
          <div className="mb-4 opacity-40">
            <span className="text-6xl">🔍</span>
          </div>
          <h3 className="text-xl font-medium mb-2 text-white">No prompts found</h3>
          <p className="text-white/50 font-light">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}