import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { hackPrompts } from "@/data/prompts";
import { callPromptAI } from "@/lib/prompt-ai";

export interface AIMatch { id: number; reason: string }

interface Props {
  open: boolean;
  onClose: () => void;
  onResults: (matches: AIMatch[]) => void;
  initialTask: string;
}

export function AIFinderDialog({ open, onClose, onResults, initialTask }: Props) {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async (query = task) => {
    if (!query.trim()) return;
    setLoading(true); setError("");
    try {
      const cards = hackPrompts.map(({ id, title, category, description }) => ({ id, title, category, description }));
      const data = await callPromptAI<{ matches: AIMatch[] }>({ mode: "find", task: query, cards });
      onResults(data.matches);
      onClose();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    setTask(initialTask);
    setError("");
    if (initialTask.trim()) void run(initialTask);
    // Run once per opening; typing in the dialog must not trigger extra AI calls.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl max-h-[85dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">AI Finder</DialogTitle>
          <DialogDescription>Describe a task or problem. AI picks the best prompts from the library and explains why.</DialogDescription>
        </DialogHeader>
        <Textarea value={task} onChange={(e) => setTask(e.target.value)} maxLength={2000} aria-label="Your task"
          placeholder="e.g. My team keeps missing deadlines and I don't know why" />
        <Button onClick={() => void run()} disabled={loading || !task.trim()} className="self-start">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Finding…" : "Find prompts"}
        </Button>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
