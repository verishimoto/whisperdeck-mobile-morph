import { createContext, useContext, useState, ReactNode } from 'react';
import { HackPrompt } from '@/types';

interface SelectionContextType {
  selectedPrompts: HackPrompt[];
  togglePrompt: (prompt: HackPrompt) => void;
  clearSelection: () => void;
  isSelected: (id: number) => boolean;
  canSelectMore: boolean;
  copyCount: number;
  incrementCopyCount: () => void;
  canCopy: boolean;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selectedPrompts, setSelectedPrompts] = useState<HackPrompt[]>([]);
  const [copyCount, setCopyCount] = useState(0);
  const MAX_SELECTION = 5;
  const MAX_COPIES = 3;

  const togglePrompt = (prompt: HackPrompt) => {
    setSelectedPrompts(current => {
      const isAlreadySelected = current.some(p => p.id === prompt.id);
      if (isAlreadySelected) {
        return current.filter(p => p.id !== prompt.id);
      }
      if (current.length >= MAX_SELECTION) {
        return current;
      }
      return [...current, prompt];
    });
  };

  const clearSelection = () => setSelectedPrompts([]);
  const isSelected = (id: number) => selectedPrompts.some(p => p.id === id);
  const canSelectMore = selectedPrompts.length < MAX_SELECTION;
  const incrementCopyCount = () => setCopyCount(prev => prev + 1);
  const canCopy = copyCount < MAX_COPIES;

  return (
    <SelectionContext.Provider value={{ selectedPrompts, togglePrompt, clearSelection, isSelected, canSelectMore, copyCount, incrementCopyCount, canCopy }}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) throw new Error('useSelection must be used within SelectionProvider');
  return context;
}
