import { X } from 'lucide-react';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  const { shortcuts } = useKeyboardShortcuts();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="liquid-glass-card w-full max-w-md mx-4 p-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg liquid-glass-button text-foreground/70 hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
            >
              <span className="text-sm text-foreground/70">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd
                    key={keyIndex}
                    className="px-2 py-1 text-xs font-mono rounded bg-foreground/10 border border-foreground/20 text-foreground/80"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-foreground/50 text-center">
          Press <kbd className="px-1.5 py-0.5 rounded bg-foreground/10 border border-foreground/20">Esc</kbd> to close
        </p>
      </div>
    </div>
  );
}
