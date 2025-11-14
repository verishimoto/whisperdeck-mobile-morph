import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { HackPrompt } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface PromptTreeProps {
  prompts: HackPrompt[];
}

const categoryColorMap: Record<string, string> = {
    Advanced: 'level-advanced',
    Strategy: 'level-strategy',
    Analysis: 'level-analysis',
    Creativity: 'level-creativity',
    Psychology: 'level-psychology',
  };

export function PromptTree({ prompts }: PromptTreeProps) {
  const { toast } = useToast();

  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push({
      id: 'root',
      data: { label: 'The Whisperer Deck' },
      position: { x: 400, y: 50 },
      className: 'bg-white/10 border-2 border-white/30 rounded-2xl p-6 text-white text-xl font-bold backdrop-blur-2xl font-display tracking-wider',
      type: 'input',
    });

    const categories = ['Advanced', 'Strategy', 'Analysis', 'Creativity', 'Psychology'];
    const categoryPositions = [
      { x: 100, y: 250 },
      { x: 300, y: 250 },
      { x: 500, y: 250 },
      { x: 700, y: 250 },
      { x: 900, y: 250 },
    ];

    categories.forEach((category, idx) => {
      const categoryPrompts = prompts.filter(p => p.category === category);
      const colorName = categoryColorMap[category] || 'primary';

      nodes.push({
        id: `category-${category}`,
        data: { label: `${category} (${categoryPrompts.length})` },
        position: categoryPositions[idx],
        className: `bg-${colorName}/20 border-2 border-${colorName}/80 rounded-xl p-4 text-white text-base font-semibold backdrop-blur-lg text-center whitespace-pre-line font-sans`,
      });

      edges.push({
        id: `root-${category}`,
        source: 'root',
        target: `category-${category}`,
        type: 'smoothstep',
        animated: true,
        style: { stroke: `hsl(var(--${colorName}))`, strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: `hsl(var(--${colorName}))` },
      });

      categoryPrompts.slice(0, 3).forEach((prompt, pIdx) => {
        const nodeId = `prompt-${prompt.id}`;
        nodes.push({
          id: nodeId,
          data: { label: `#${prompt.id}: ${prompt.title}` },
          position: { x: categoryPositions[idx].x - 50, y: 400 + pIdx * 100 },
          className: `bg-white/5 border border-${colorName}/30 rounded-lg p-3 text-white/90 text-xs font-light backdrop-blur-md text-center whitespace-pre-line w-48 h-20 flex items-center justify-center font-body`,
          type: 'output',
        });

        edges.push({
          id: `${category}-${nodeId}`,
          source: `category-${category}`,
          target: nodeId,
          type: 'smoothstep',
          style: { stroke: `hsl(var(--${colorName}-muted))`, strokeWidth: 1.5, strokeDasharray: '5,5' },
        });
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [prompts]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'output') {
        const prompt = prompts.find(p => `prompt-${p.id}` === node.id);
        if(prompt) {
            navigator.clipboard.writeText(prompt.example);
            toast({ title: "Copied!", description: `"${prompt.title}" copied to clipboard.` });
        }
    }
  }, [prompts, toast]);

  return (
    <div className="w-full h-[800px] rounded-3xl overflow-hidden bg-black/30 backdrop-blur-2xl border border-white/10">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        connectionMode={ConnectionMode.Loose}
        fitView
      >
        <Background color="rgba(255, 255, 255, 0.1)" gap={24} size={1} />
        <Controls className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white" />
        <MiniMap 
            className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-lg"
            nodeColor={(node) => {
                if (node.type === 'input') return 'rgba(255, 255, 255, 0.4)';
                const colorName = categoryColorMap[node.data.label?.split(' ')[0]];
                if (colorName) return `hsl(var(--${colorName}))`;
                return 'rgba(255, 255, 255, 0.2)';
            }}
            nodeStrokeWidth={3}
        />
      </ReactFlow>
    </div>
  );
}
