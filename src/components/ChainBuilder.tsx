import { useState, useRef, useEffect } from "react";
import { useSelection } from "@/contexts/SelectionContext";
import { useGamification } from "@/contexts/GamificationContext";
import { HackPrompt } from "@/types";
import { X, Play, Save, RotateCcw, ArrowRight, Zap, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ChainNode {
  prompt: HackPrompt;
  position: number;
}

export function ChainBuilder() {
  const { selectedPrompts, clearSelection } = useSelection();
  const { buildChain } = useGamification();
  const { toast } = useToast();
  
  const [chainNodes, setChainNodes] = useState<ChainNode[]>([]);
  const [draggedNode, setDraggedNode] = useState<ChainNode | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('chainBuilderCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('chainBuilderCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  // Convert selected prompts to chain nodes when they change
  const handleAddToChain = (prompt: HackPrompt) => {
    if (chainNodes.some(node => node.prompt.id === prompt.id)) {
      toast({
        title: "Already in chain",
        description: "This prompt is already in your chain.",
        duration: 2000,
      });
      return;
    }

    const newNode: ChainNode = {
      prompt,
      position: chainNodes.length,
    };

    setChainNodes([...chainNodes, newNode]);
  };

  const handleRemoveFromChain = (nodeIndex: number) => {
    const updatedNodes = chainNodes
      .filter((_, i) => i !== nodeIndex)
      .map((node, i) => ({ ...node, position: i }));
    setChainNodes(updatedNodes);
  };

  const handleDragStart = (e: React.DragEvent, node: ChainNode) => {
    setDraggedNode(node);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (!draggedNode) return;

    const dragIndex = chainNodes.findIndex(n => n.prompt.id === draggedNode.prompt.id);
    if (dragIndex === dropIndex) {
      setDragOverIndex(null);
      setDraggedNode(null);
      return;
    }

    const reorderedNodes = [...chainNodes];
    reorderedNodes.splice(dragIndex, 1);
    reorderedNodes.splice(dropIndex, 0, draggedNode);

    const updatedNodes = reorderedNodes.map((node, i) => ({
      ...node,
      position: i,
    }));

    setChainNodes(updatedNodes);
    setDragOverIndex(null);
    setDraggedNode(null);
  };

  const handleDragEnd = () => {
    setDraggedNode(null);
    setDragOverIndex(null);
  };

  const handleExecuteChain = () => {
    if (chainNodes.length === 0) {
      toast({
        title: "Empty chain",
        description: "Add prompts to your chain first.",
        duration: 2000,
      });
      return;
    }

    buildChain();
    toast({
      title: "Chain Executed",
      description: `Successfully built chain with ${chainNodes.length} prompts.`,
      duration: 3000,
    });
  };

  const handleSaveChain = () => {
    if (chainNodes.length === 0) return;

    // Placeholder for saving to community/localStorage
    toast({
      title: "Chain Saved",
      description: "Your Socratic chain has been saved.",
      duration: 2000,
    });
  };

  const handleClearChain = () => {
    setChainNodes([]);
    toast({
      title: "Chain Cleared",
      description: "Canvas reset.",
      duration: 2000,
    });
  };

  const estimatedTokens = chainNodes.reduce((total, node) => {
    return total + (node.prompt.example?.length || 0) * 0.25; // Rough token estimate
  }, 0);

  const getCategoryColor = (category: string) => {
    const colors = {
      "Ultra": "rgba(139, 92, 246, 0.6)",
      "Master": "rgba(236, 72, 153, 0.6)",
      "Advanced": "rgba(59, 130, 246, 0.6)",
      "Strategy": "rgba(16, 185, 129, 0.6)",
      "Analysis": "rgba(245, 158, 11, 0.6)",
      "Creativity": "rgba(244, 63, 94, 0.6)",
      "Psychology": "rgba(168, 85, 247, 0.6)",
      "Essential": "rgba(6, 182, 212, 0.6)"
    };
    return colors[category as keyof typeof colors] || "rgba(255, 255, 255, 0.3)";
  };

  return (
    <div 
      className="fixed inset-x-0 bottom-0 z-30 backdrop-blur-xl bg-black/60 border-t border-white/10 transition-all duration-300"
      style={{
        height: isCollapsed ? '48px' : (chainNodes.length > 0 ? '280px' : '180px'),
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg bg-white/10 border border-white/20 hover:bg-white/15 transition-all"
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? (
                <ChevronUp className="h-4 w-4 text-white/80" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white/80" />
              )}
            </button>
            <h3 className="text-lg font-semibold text-white/90">
              Chain Builder
            </h3>
            {chainNodes.length > 0 && (
              <Badge className="bg-white/10 border-white/20 text-white/80">
                {chainNodes.length} {chainNodes.length === 1 ? 'node' : 'nodes'}
              </Badge>
            )}
            {estimatedTokens > 0 && (
              <Badge className="bg-[#10B981]/20 border-[#10B981]/30 text-[#10B981] flex items-center gap-1">
                <Zap className="h-3 w-3" />
                ~{Math.round(estimatedTokens)} tokens
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleExecuteChain}
              disabled={chainNodes.length === 0}
              size="sm"
              className="bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#8B5CF6] hover:bg-[#8B5CF6]/30"
            >
              <Play className="h-4 w-4 mr-1" />
              Execute
            </Button>
            <Button
              onClick={handleSaveChain}
              disabled={chainNodes.length === 0}
              size="sm"
              variant="outline"
              className="bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button
              onClick={handleClearChain}
              disabled={chainNodes.length === 0}
              size="sm"
              variant="outline"
              className="bg-white/5 border-white/20 text-white/60 hover:bg-white/10 hover:text-white/80"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Canvas */}
        {!isCollapsed && (
          <>
            <div
              ref={canvasRef}
              className="flex-1 overflow-x-auto overflow-y-hidden mt-3"
            >
          {chainNodes.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/50 text-sm mb-2">
                  Select prompts from the deck above and drag them here
                </p>
                <p className="text-white/30 text-xs">
                  Build Socratic chains: {selectedPrompts.length} prompts selected
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 h-full pb-4">
              {chainNodes.map((node, index) => (
                <div key={`${node.prompt.id}-${index}`} className="flex items-center gap-2">
                  {/* Chain Node */}
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, node)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`relative backdrop-blur-xl border rounded-xl p-4 cursor-move transition-all ${
                      dragOverIndex === index
                        ? 'ring-2 ring-white/40 scale-105'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      minWidth: '220px',
                      maxWidth: '220px',
                      height: '140px',
                      background: `linear-gradient(135deg, ${getCategoryColor(node.prompt.category)} 0%, rgba(0, 0, 0, 0.3) 100%)`,
                      borderColor: getCategoryColor(node.prompt.category),
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      boxShadow: `0 4px 20px ${getCategoryColor(node.prompt.category)}`
                    }}
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFromChain(index)}
                      className="absolute top-2 right-2 p-1 rounded-lg bg-black/40 hover:bg-black/60 text-white/60 hover:text-white transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>

                    {/* Position Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/40 border-white/20 text-white/90 text-xs">
                        {index + 1}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="mt-6 space-y-2">
                      <p className="text-white/90 font-medium text-sm line-clamp-2">
                        {node.prompt.title}
                      </p>
                      <Badge className="bg-black/30 border-white/20 text-white/70 text-xs">
                        {node.prompt.category}
                      </Badge>
                      <p className="text-white/50 text-xs">
                        ID: {node.prompt.id}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Connector */}
                  {index < chainNodes.length - 1 && (
                    <ArrowRight 
                      className="h-5 w-5 text-white/40 flex-shrink-0" 
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Prompts Staging Area */}
        {!isCollapsed && selectedPrompts.length > 0 && chainNodes.length < 10 && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-white/50 mb-2">
              Click to add to chain:
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {selectedPrompts
                .filter(p => !chainNodes.some(n => n.prompt.id === p.id))
                .map(prompt => (
                  <button
                    key={prompt.id}
                    onClick={() => handleAddToChain(prompt)}
                    className="flex-shrink-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs text-white/70 hover:text-white/90"
                    style={{
                      willChange: 'transform',
                      transform: 'translateZ(0)'
                    }}
                  >
                    {prompt.id}. {prompt.title.slice(0, 30)}...
                  </button>
                ))}
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
