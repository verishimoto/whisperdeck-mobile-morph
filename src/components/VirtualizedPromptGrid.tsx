import { useRef, useState, useEffect, CSSProperties, ReactElement } from "react";
import { List } from "react-window";
import { PromptCard } from "./PromptCard";
import { HackPrompt } from "@/types";
import { hackPrompts } from "@/data/prompts";

interface VirtualizedPromptGridProps {
  prompts: HackPrompt[];
  filteredCount: number;
  totalCount: number;
  onCategoryFilter?: (category: string) => void;
}

// Responsive column count based on viewport width
function useColumnCount() {
  const [columnCount, setColumnCount] = useState(4);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setColumnCount(1);
      else if (width < 1024) setColumnCount(2);
      else if (width < 1280) setColumnCount(3);
      else setColumnCount(4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columnCount;
}

// Row props interface
interface RowData {
  prompts: HackPrompt[];
  columnCount: number;
  onCategoryFilter?: (category: string) => void;
}

// Row component for react-window v2 - must return ReactElement
function RowComponent({
  index,
  style,
  prompts,
  columnCount,
  onCategoryFilter,
}: {
  index: number;
  style: CSSProperties;
  ariaAttributes: {
    "aria-posinset": number;
    "aria-setsize": number;
    role: "listitem";
  };
} & RowData): ReactElement {
  const startIndex = index * columnCount;
  const rowPrompts = prompts.slice(startIndex, startIndex + columnCount);

  return (
    <div
      style={{
        ...style,
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: "1.5rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        paddingBottom: "1rem",
      }}
    >
      {rowPrompts.map((prompt) => {
        const originalIndex = hackPrompts.findIndex((p) => p.id === prompt.id);
        return (
          <div key={prompt.id} className="masonry-item opacity-100 translate-y-0">
            <PromptCard
              prompt={prompt}
              index={originalIndex}
              onCategoryFilter={onCategoryFilter}
            />
          </div>
        );
      })}
    </div>
  );
}

export function VirtualizedPromptGrid({
  prompts,
  filteredCount,
  totalCount,
  onCategoryFilter,
}: VirtualizedPromptGridProps) {
  const columnCount = useColumnCount();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(800);

  // Calculate row count
  const rowCount = Math.ceil(prompts.length / columnCount);

  // Fixed row height for consistent virtualization
  const rowHeight = 300;

  // Update container height on mount and resize
  useEffect(() => {
    const updateHeight = () => {
      // Calculate available height (viewport - header - filter bar - summary)
      const viewportHeight = window.innerHeight;
      const headerHeight = 56;
      const filterHeight = 80;
      const summaryHeight = 60;
      const padding = 80;
      setContainerHeight(Math.max(400, viewportHeight - headerHeight - filterHeight - summaryHeight - padding));
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  if (prompts.length === 0) {
    return (
      <div className="pb-16">
        <div className="text-center mb-8">
          <p className="text-sm font-light text-foreground/60 font-sans">
            Showing <span className="font-semibold text-foreground">0</span> of{" "}
            <span className="font-semibold text-foreground">{totalCount}</span> prompts
          </p>
        </div>
        <div className="text-center py-20 liquid-glass-card max-w-lg mx-auto">
          <div className="mb-4 opacity-50 text-6xl">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">No prompts found</h3>
          <p className="text-foreground/60 font-light px-6">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16" ref={containerRef}>
      {/* Results Summary */}
      <div className="text-center mb-8">
        <p className="text-sm font-light text-foreground/60 font-sans">
          Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{" "}
          <span className="font-semibold text-foreground">{totalCount}</span> prompts
        </p>
      </div>

      {/* Virtualized List */}
      <List
        rowComponent={RowComponent}
        rowCount={rowCount}
        rowHeight={rowHeight}
        rowProps={{
          prompts,
          columnCount,
          onCategoryFilter,
        }}
        overscanCount={2}
        className="virtualized-grid-list"
        style={{ 
          height: containerHeight,
          width: "100%",
          overflow: "auto",
        }}
      />
    </div>
  );
}
