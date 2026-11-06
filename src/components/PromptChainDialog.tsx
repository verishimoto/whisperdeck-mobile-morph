import { useState } from "react";
import { ArrowDown, ArrowUp, Copy, FolderOpen, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SaveTemplateDialog } from "@/components/SaveTemplateDialog";
import { useToast } from "@/hooks/use-toast";
import { HackPrompt } from "@/types";
import { shortLabel } from "@/lib/category-labels";

interface Props { prompts: HackPrompt[]; onClose: () => void }

export function PromptChainDialog({ prompts, onClose }: Props) {
  const [nodes, setNodes] = useState(prompts);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const move = (index: number, direction: number) => {
    const target = index + direction;
    if (target < 0 || target >= nodes.length) return;
    setNodes(current => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };
  const copy = async () => {
    const text = nodes.map((p, index) => `Step ${index + 1}: #${p.id} ${p.title}\n${p.example}`).join("\n\nUse the preceding step's output as context for the next step.\n\n");
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Prompt chain copied" });
    } catch { toast({ title: "Could not copy", description: "Please allow clipboard access.", variant: "destructive" }); }
  };
  return (
    <>
      <Dialog open={!saving} onOpenChange={open => { if (!open) onClose(); }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Prompt Chains</DialogTitle>
            <DialogDescription>{nodes.length} steps · ~{Math.round(nodes.reduce((sum, p) => sum + p.example.length / 4, 0))} tokens</DialogDescription>
          </DialogHeader>
          <ol className="space-y-3">
            {nodes.map((p, index) => (
              <li key={p.id} data-chain-id={p.id} className="flex items-center gap-3 border border-border rounded-lg p-3 bg-card">
                <span className="text-primary font-mono shrink-0">{index + 1}.</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium break-words">#{p.id} {p.title}</p>
                  <p className="text-xs text-muted-foreground">{shortLabel(p.category)}</p>
                </div>
                <div className="flex shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8" disabled={index === 0} aria-label={`Move step ${index + 1} up`} title="Move up" onClick={() => move(index, -1)}><ArrowUp /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" disabled={index === nodes.length - 1} aria-label={`Move step ${index + 1} down`} title="Move down" onClick={() => move(index, 1)}><ArrowDown /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Remove step ${index + 1}`} title="Remove step" onClick={() => setNodes(current => current.filter(n => n.id !== p.id))}><X /></Button>
                </div>
              </li>
            ))}
          </ol>
          {nodes.length === 0 && <p className="text-sm text-muted-foreground">No steps selected.</p>}
          <div className="flex flex-wrap gap-2">
            <Button disabled={!nodes.length} onClick={copy}><Copy />Copy chain</Button>
            <Button variant="outline" disabled={!nodes.length} onClick={() => setSaving(true)}><Save />Save template</Button>
            <Button variant="outline" onClick={() => navigate("/templates")}><FolderOpen />Templates</Button>
          </div>
        </DialogContent>
      </Dialog>
      <SaveTemplateDialog isOpen={saving} onClose={() => setSaving(false)} promptIds={nodes.map(p => p.id)} />
    </>
  );
}