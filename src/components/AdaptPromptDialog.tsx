import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { HackPrompt } from "@/types";
import { callPromptAI } from "@/lib/prompt-ai";
import { useToast } from "@/hooks/use-toast";

interface Props {
  prompt: HackPrompt | null;
  onClose: () => void;
}

export function AdaptPromptDialog({ prompt, onClose }: Props) {
  const [goal, setGoal] = useState("");
  const [context, setContext] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const close = () => { setResult(""); setError(""); onClose(); };

  const run = async () => {
    if (!prompt || !goal.trim()) return;
    setLoading(true); setError(""); setResult("");
    try {
      const data = await callPromptAI<{ adapted: string }>({ mode: "adapt", goal, context, prompt });
      setResult(data.adapted);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!prompt} onOpenChange={(o) => !o && close()}>
      <DialogContent className="liquid-glass-card max-w-2xl max-h-[85vh] overflow-y-auto" style={{ height: "auto" }}>
        <DialogHeader>
          <DialogTitle className="font-display">Adapt #{prompt?.id} {prompt?.title}</DialogTitle>
          <DialogDescription>Describe your goal and context. AI turns this technique into a ready-to-use prompt.</DialogDescription>
        </DialogHeader>
        <label className="text-sm font-medium" htmlFor="adapt-goal">Your goal</label>
        <Textarea id="adapt-goal" value={goal} onChange={(e) => setGoal(e.target.value)} maxLength={1500}
          placeholder="e.g. Decide whether to launch our app in Brazil this year" />
        <label className="text-sm font-medium" htmlFor="adapt-context">Context (optional)</label>
        <Textarea id="adapt-context" value={context} onChange={(e) => setContext(e.target.value)} maxLength={3000}
          placeholder="Audience, constraints, data you have…" />
        <Button onClick={run} disabled={loading || !goal.trim()} className="self-start">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Adapting…" : "Adapt prompt"}
        </Button>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        {result && (
          <div className="relative p-3 rounded-xl bg-background/40 border border-border">
            <Button size="sm" variant="ghost" className="absolute top-2 right-2"
              onClick={async () => { await navigator.clipboard.writeText(result); toast({ title: "Adapted prompt copied" }); }}>
              <Copy className="h-4 w-4" />
            </Button>
            <p className="font-mono text-xs whitespace-pre-wrap pr-10" data-testid="adapted-result">{result}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
