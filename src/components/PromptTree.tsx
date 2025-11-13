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

const categoryColors = {
  'Advanced': { bg: 'rgba(59, 130, 246, 0.2)', border: '#3B82F6' },
  'Strategy': { bg: 'rgba(16, 185, 129, 0.2)', border: '#10B981' },
  'Analysis': { bg: 'rgba(240, 165, 107, 0.2)', border: '#F0A56B' },
  'Creativity': { bg: 'rgba(200, 156, 232, 0.2)', border: '#C89CE8' },
  'Psychology': { bg: 'rgba(93, 222, 223, 0.2)', border: '#5DDEDF' },
};

export function PromptTree({ prompts }: PromptTreeProps) {
  const { toast } = useToast();

  // Create nodes and edges from prompts
  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Root node
    nodes.push({
      id: 'root',
      data: { 
        label: 'WhisperDeck Prompts',
        type: 'root'
      },
      position: { x: 400, y: 50 },
      style: {
        background: 'rgba(255, 255, 255, 0.1)',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '12px',
        padding: '16px 24px',
        color: 'white',
        fontSize: '18px',
        fontWeight: '700',
        backdropFilter: 'blur(20px)',
      },
    });

    // Category nodes
    const categories = ['Advanced', 'Strategy', 'Analysis', 'Creativity', 'Psychology'];
    const categoryPositions = [
      { x: 100, y: 200 },
      { x: 300, y: 200 },
      { x: 500, y: 200 },
      { x: 700, y: 200 },
      { x: 900, y: 200 },
    ];

    categories.forEach((category, idx) => {
      const categoryPrompts = prompts.filter(p => p.category === category);
      const colors = categoryColors[category as keyof typeof categoryColors];

      nodes.push({
        id: `category-${category}`,
        data: { 
          label: `${category}\n(${categoryPrompts.length} prompts)`,
          type: 'category',
          category,
        },
        position: categoryPositions[idx],
        style: {
          background: colors.bg,
          border: `2px solid ${colors.border}`,
          borderRadius: '10px',
          padding: '12px 20px',
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          backdropFilter: 'blur(16px)',
          whiteSpace: 'pre-line',
          textAlign: 'center',
        },
      });

      edges.push({
        id: `root-${category}`,
        source: 'root',
        target: `category-${category}`,
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: colors.border,
          strokeWidth: 2,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: colors.border,
        },
      });

      // Add top 5 prompts per category
      categoryPrompts.slice(0, 5).forEach((prompt, pIdx) => {
        const nodeId = `prompt-${prompt.id}`;
        const yOffset = 350 + (pIdx * 80);
        const xOffset = categoryPositions[idx].x;

        nodes.push({
          id: nodeId,
          data: { 
            label: `#${prompt.score || prompt.id}\n${prompt.title}`,
            type: 'prompt',
            prompt,
          },
          position: { x: xOffset - 20, y: yOffset },
          style: {
            background: 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${colors.border}`,
            borderRadius: '8px',
            padding: '10px 14px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '11px',
            fontWeight: '400',
            backdropFilter: 'blur(12px)',
            whiteSpace: 'pre-line',
            textAlign: 'center',
            maxWidth: '180px',
          },
        });

        edges.push({
          id: `${category}-${nodeId}`,
          source: `category-${category}`,
          target: nodeId,
          type: 'smoothstep',
          style: { 
            stroke: `${colors.border}40`,
            strokeWidth: 1,
          },
        });
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [prompts]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.data.type === 'prompt') {
      const prompt = node.data.prompt as HackPrompt;
      navigator.clipboard.writeText(prompt.example);
      toast({
        title: "Copied!",
        description: `"${prompt.title}" copied to clipboard`,
      });
    }
  }, [toast]);

  return (
    <div className="w-full h-[800px] rounded-lg overflow-hidden" style={{ 
      background: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        connectionMode={ConnectionMode.Loose}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background 
          color="rgba(255, 255, 255, 0.1)" 
          gap={20}
          size={1}
        />
        <Controls 
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
          }}
        />
        <MiniMap 
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
          }}
          nodeColor={(node) => {
            if (node.data.type === 'root') return 'rgba(255, 255, 255, 0.3)';
            if (node.data.type === 'category') {
              const colors = categoryColors[node.data.category as keyof typeof categoryColors];
              return colors?.border || 'white';
            }
            return 'rgba(255, 255, 255, 0.2)';
          }}
        />
      </ReactFlow>
    </div>
  );
}
