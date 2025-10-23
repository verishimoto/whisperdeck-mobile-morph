import { PromptCard } from "./PromptCard";
import { HackPrompt } from "@/types";

interface PromptGridProps {
  prompts: HackPrompt[];
  filteredCount: number;
  totalCount: number;
}

export function PromptGrid({ prompts, filteredCount, totalCount }: PromptGridProps) {
  return (
    <div className="container px-4 pb-16">
      {/* Results Summary */}
      <div className="text-center mb-8">
        <p className="text-white/50 font-light" style={{
          fontFamily: "'Nirmala UI', 'Inter', sans-serif",
          fontSize: '0.9rem',
          fontWeight: '400'
        }}>
          Showing <span className="font-semibold text-white">{filteredCount}</span> of{" "}
          <span className="font-semibold text-white">{totalCount}</span> prompts
        </p>
      </div>

      {/* Grid - 3 → 2 → 1 Responsive with Parallax */}
      <div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" 
        style={{ 
          alignItems: 'start'
        }}
      >
        {prompts.map((prompt, index) => (
          <div
            key={prompt.id}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{
              animationDelay: `${index * 50}ms`,
              animationDuration: '600ms',
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