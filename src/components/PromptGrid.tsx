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
      <div className="text-center mb-8">
        <p className="text-muted-foreground font-medium">
          Showing <span className="font-bold text-primary">{filteredCount}</span> of{" "}
          <span className="font-bold text-primary">{totalCount}</span> hack prompts
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {prompts.map((prompt, index) => (
          <PromptCard key={prompt.id} prompt={prompt} index={index} />
        ))}
      </div>

      {/* Empty State */}
      {prompts.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4 opacity-50">
            <span className="text-6xl">🔍</span>
          </div>
          <h3 className="text-xl font-display font-bold mb-2">No prompts found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}