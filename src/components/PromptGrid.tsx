import { PromptCard } from "./PromptCard";
import { HackPrompt } from "@/types";

interface PromptGridProps {
  prompts: HackPrompt[];
  filteredCount: number;
  totalCount: number;
}

export function PromptGrid({ prompts, filteredCount, totalCount }: PromptGridProps) {
  return (
    <div className="container px-4 pb-8">
      {/* Results Summary */}
      <div className="text-center mb-6">
        <p className="text-white/60 font-light" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.95rem',
          fontWeight: '300'
        }}>
          Showing <span className="font-bold text-white">{filteredCount}</span> out of{" "}
          <span className="font-bold text-white">{totalCount}</span> hack prompts
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {prompts.map((prompt, index) => (
          <PromptCard key={prompt.id} prompt={prompt} index={index} />
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