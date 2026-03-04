import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelection } from "@/contexts/SelectionContext";
import { useGamification } from "@/contexts/GamificationContext";
import { useArchitect } from "@/contexts/ArchitectContext";
import { HackPrompt } from "@/types";
import { X, Play, Save, RotateCcw, ArrowRight, Zap, ChevronUp, ChevronDown, Wand2, FolderOpen, Award, Brain, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { ChainTemplatesPanel } from "./ChainTemplatesPanel";
import { SaveTemplateDialog } from "./SaveTemplateDialog";
import { Progress } from "@/components/ui/progress";

interface ChainNode {
  prompt: HackPrompt;
  position: number;
}

export function ChainBuilder() {
  const { selectedPrompts, clearSelection } = useSelection();
  const { buildChain } = useGamification();
  const { isArchitect } = useArchitect();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Architects have unlimited nodes, users have limit of 10
  const maxNodes = isArchitect ? Infinity : 10;
  
  const [chainNodes, setChainNodes] = useState<ChainNode[]>([]);
  const [draggedNode, setDraggedNode] = useState<ChainNode | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('chainBuilderCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [showTemplates, setShowTemplates] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'flash' | 'pro'>('flash');

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
    setShowSaveDialog(true);
  };

  // Load prompts from template
  const handleLoadTemplate = (prompts: HackPrompt[]) => {
    const newNodes = prompts.map((prompt, index) => ({
      prompt,
      position: index,
    }));
    setChainNodes(newNodes);
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
      "Design": "rgba(245, 180, 100, 0.6)",
      "Essential": "rgba(6, 182, 212, 0.6)"
    };
    return colors[category as keyof typeof colors] || "rgba(255, 255, 255, 0.3)";
  };

  const { dailyCopiesRemaining, totalPromptsUsed, chainsBuilt, currentLevel, getTimeUntilReset } = useGamification();

  const levelNames = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'];
  const levelColors = ['hsl(var(--level-essential))', 'hsl(var(--level-strategy))', 'hsl(var(--level-advanced))', 'hsl(var(--level-master))', 'hsl(var(--level-ultra))'];
  const copyPercentage = (dailyCopiesRemaining / 5) * 100;

  const InlineProgressPanel = () => (
    <div className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10 animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex-1 min-w-[140px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-white/60">Daily Copies</span>
            <span className="text-xs font-semibold text-white/90">{dailyCopiesRemaining}/5</span>
          </div>
          <Progress value={copyPercentage} className="h-1.5" />
          {dailyCopiesRemaining === 0 && <p className="text-xs text-destructive mt-1">Resets: {getTimeUntilReset()}</p>}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">Level</span>
          <span className="text-xs font-bold" style={{ color: levelColors[currentLevel] }}>{levelNames[currentLevel]}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-white/90">{totalPromptsUsed.size}</p>
            <p className="text-[10px] text-white/40">Used</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white/90">{chainsBuilt}</p>
            <p className="text-[10px] text-white/40">Chains</p>
          </div>
        </div>
      </div>
    </div>
  );

  const InlineModelPanel = ({ selectedModel: model, setSelectedModel: setModel }: { selectedModel: 'flash' | 'pro'; setSelectedModel: (m: 'flash' | 'pro') => void }) => (
    <div className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10 animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => setModel('flash')}
            className={`px-4 py-2 rounded-lg border text-xs font-medium transition-all ${model === 'flash' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
          >
            <Zap className="h-3.5 w-3.5 inline mr-1.5" />Flash
          </button>
          <button
            onClick={() => setModel('pro')}
            className={`px-4 py-2 rounded-lg border text-xs font-medium transition-all ${model === 'pro' ? 'bg-purple-500/20 border-purple-500/40 text-purple-400' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
          >
            <Brain className="h-3.5 w-3.5 inline mr-1.5" />Pro
          </button>
        </div>
        <div className="text-xs text-white/60">
          {model === 'flash' ? 'Low latency, cost-optimized • ~0.3s' : 'Complex reasoning, Socratic depth • ~1.2s'}
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-x-0 bottom-0 z-30 backdrop-blur-xl bg-black/60 border-t border-white/10 transition-all duration-300"
      style={{
        height: isCollapsed ? '48px' : (showProgress || showModel ? '360px' : chainNodes.length > 0 ? '300px' : '200px'),
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-4 h-full flex flex-col">
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
            {isArchitect && (
              <Badge className="bg-[#8B5CF6]/30 border-[#8B5CF6]/50 text-[#C4B5FD] flex items-center gap-1">
                <Wand2 className="h-3 w-3" />
                Architect
              </Badge>
            )}
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
            {/* Gamification tabs - non-architect only */}
            {!isArchitect && (
              <>
                <Tooltip delayDuration={500}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => { setShowProgress(!showProgress); setShowModel(false); }}
                      size="sm"
                      variant="outline"
                      className={`bg-white/5 border-white/20 hover:bg-white/10 ${showProgress ? 'text-emerald-400 border-emerald-500/40' : 'text-white/60'}`}
                    >
                      <Award className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Progress Dashboard</TooltipContent>
                </Tooltip>
                <Tooltip delayDuration={500}>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => { setShowModel(!showModel); setShowProgress(false); }}
                      size="sm"
                      variant="outline"
                      className={`bg-white/5 border-white/20 hover:bg-white/10 ${showModel ? 'text-purple-400 border-purple-500/40' : 'text-white/60'}`}
                    >
                      <Brain className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>LLM Model</TooltipContent>
                </Tooltip>
                <div className="w-px h-6 bg-white/10 mx-1" />
              </>
            )}

            {/* Templates Button */}
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => navigate('/templates')}
                  size="sm"
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                >
                  <FolderOpen className="h-4 w-4 mr-1" />
                  Templates
                </Button>
              </TooltipTrigger>
              <TooltipContent>Browse chain templates</TooltipContent>
            </Tooltip>
            
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleExecuteChain}
                  disabled={chainNodes.length === 0}
                  size="sm"
                  className="bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#8B5CF6] hover:bg-[#8B5CF6]/30"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Execute
                </Button>
              </TooltipTrigger>
              <TooltipContent>Execute the chain</TooltipContent>
            </Tooltip>
            
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent>Save as template</TooltipContent>
            </Tooltip>
            
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleClearChain}
                  disabled={chainNodes.length === 0}
                  size="sm"
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white/60 hover:bg-white/10 hover:text-white/80"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear chain</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Inline Gamification Panels */}
        {!isCollapsed && !isArchitect && showProgress && (
          <InlineProgressPanel />
        )}
        {!isCollapsed && !isArchitect && showModel && (
          <InlineModelPanel selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
        )}

        {/* Canvas */}
        {!isCollapsed && (
          <>
            <div
              ref={canvasRef}
              className="flex-1 overflow-x-auto overflow-y-hidden mt-4 px-2"
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
            <div className="flex items-center gap-4 h-full pb-4 px-2">
              {chainNodes.map((node, index) => (
                <div key={`${node.prompt.id}-${index}`} className="flex items-center gap-3">
                  {/* Chain Node */}
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, node)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`relative backdrop-blur-xl border rounded-2xl p-5 cursor-move transition-all ${
                      dragOverIndex === index
                        ? 'ring-2 ring-white/40 scale-105'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      minWidth: '240px',
                      maxWidth: '240px',
                      height: '150px',
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

        {/* Selected Prompts Staging Area - Unlimited for Architects */}
        {!isCollapsed && selectedPrompts.length > 0 && chainNodes.length < maxNodes && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-white/50 mb-2">
              Click to add to chain{isArchitect ? ' (unlimited)' : ` (${10 - chainNodes.length} remaining)`}:
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
      
      {/* Templates Panel */}
      <ChainTemplatesPanel
        isOpen={showTemplates}
        onClose={() => setShowTemplates(false)}
        onLoadTemplate={handleLoadTemplate}
      />
      
      {/* Save Template Dialog */}
      <SaveTemplateDialog
        isOpen={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        promptIds={chainNodes.map(n => n.prompt.id)}
      />
    </div>
  );
}
