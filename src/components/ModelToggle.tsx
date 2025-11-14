import { useState } from "react";
import { Zap, Brain, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ModelType = "flash" | "pro";

interface ModelConfig {
  name: string;
  icon: typeof Zap;
  description: string;
  costPerMToken: number;
  latency: string;
  color: string;
}

const models: Record<ModelType, ModelConfig> = {
  flash: {
    name: "Gemini Flash",
    icon: Zap,
    description: "Low latency, cost-optimized for high volume",
    costPerMToken: 0.075,
    latency: "~0.3s",
    color: "text-[#10B981]"
  },
  pro: {
    name: "Gemini Pro",
    icon: Brain,
    description: "Complex reasoning, Socratic depth",
    costPerMToken: 1.25,
    latency: "~1.2s",
    color: "text-[#8B5CF6]"
  }
};

export function ModelToggle() {
  const [selectedModel, setSelectedModel] = useState<ModelType>("flash");
  const [estimatedTokens] = useState(1000); // Placeholder for real token estimation

  const currentModel = models[selectedModel];
  const Icon = currentModel.icon;
  const estimatedCost = (estimatedTokens / 1_000_000) * currentModel.costPerMToken;

  return (
    <div 
      className="fixed bottom-24 right-6 z-20 backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-2xl"
      style={{ 
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-white/90">LLM Model</h3>
          <Badge className="bg-white/10 border-white/20 text-white/80 text-xs">
            Vertex AI
          </Badge>
        </div>

        {/* Model Toggle Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedModel("flash")}
            className={`flex-1 p-3 rounded-xl border transition-all ${
              selectedModel === "flash"
                ? "bg-[#10B981]/20 border-[#10B981]/40 text-[#10B981]"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
            }`}
            style={{ 
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
          >
            <Zap className="h-5 w-5 mx-auto mb-1" />
            <div className="text-xs font-medium">Flash</div>
          </button>

          <button
            onClick={() => setSelectedModel("pro")}
            className={`flex-1 p-3 rounded-xl border transition-all ${
              selectedModel === "pro"
                ? "bg-[#8B5CF6]/20 border-[#8B5CF6]/40 text-[#8B5CF6]"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
            }`}
            style={{ 
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
          >
            <Brain className="h-5 w-5 mx-auto mb-1" />
            <div className="text-xs font-medium">Pro</div>
          </button>
        </div>

        {/* Model Info */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="flex items-start gap-2">
            <Icon className={`h-4 w-4 mt-0.5 ${currentModel.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white/90">{currentModel.name}</p>
              <p className="text-xs text-white/60 leading-relaxed">{currentModel.description}</p>
            </div>
          </div>

          {/* Cost Visualization */}
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-white/60">Est. Cost</span>
              <DollarSign className="h-3 w-3 text-white/40" />
            </div>
            <div className={`text-lg font-semibold ${currentModel.color}`}>
              ${estimatedCost.toFixed(4)}
            </div>
            <div className="text-xs text-white/50 mt-1">
              ~{estimatedTokens.toLocaleString()} tokens • {currentModel.latency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
