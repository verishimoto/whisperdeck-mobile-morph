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
        <p className="text-sm font-light text-white/60 font-sans">
          Showing <span className="font-semibold text-white">{filteredCount}</span> of{" "}
          <span className="font-semibold text-white">{totalCount}</span> prompts
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {prompts.map((prompt, index) => (
          <div
            key={prompt.id}
            className="animate-fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
          >
            <PromptCard prompt={prompt} index={index} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {prompts.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-2xl max-w-lg mx-auto backdrop-blur-lg border border-white/10">
          <div className="mb-4 opacity-50 text-6xl">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-white">No prompts found</h3>
          <p className="text-white/60 font-light px-6">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
