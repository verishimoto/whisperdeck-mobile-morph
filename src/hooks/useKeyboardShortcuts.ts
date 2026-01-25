import { useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';

interface KeyboardShortcutsOptions {
  onSearch?: () => void;
  onShowHelp?: () => void;
  onCategoryChange?: (category: string | null) => void;
  onEscape?: () => void;
}

const categories = ['Advanced', 'Strategy', 'Analysis', 'Creativity', 'Psychology'];

export function useKeyboardShortcuts({
  onSearch,
  onShowHelp,
  onCategoryChange,
  onEscape,
}: KeyboardShortcutsOptions = {}) {
  const { theme, setTheme } = useTheme();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isInputFocused = document.activeElement?.tagName === 'INPUT' || 
                           document.activeElement?.tagName === 'TEXTAREA';

    // Cmd/Ctrl + K - Focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      onSearch?.();
      return;
    }

    // Cmd/Ctrl + / - Show shortcuts help
    if ((e.metaKey || e.ctrlKey) && e.key === '/') {
      e.preventDefault();
      onShowHelp?.();
      return;
    }

    // Don't process other shortcuts if typing in an input
    if (isInputFocused) return;

    // T - Toggle theme
    if (e.key === 't' || e.key === 'T') {
      setTheme(theme === 'dark' ? 'light' : 'dark');
      return;
    }

    // 1-5 - Switch categories
    if (['1', '2', '3', '4', '5'].includes(e.key)) {
      const index = parseInt(e.key) - 1;
      onCategoryChange?.(categories[index] || null);
      return;
    }

    // 0 - All categories
    if (e.key === '0') {
      onCategoryChange?.(null);
      return;
    }

    // Escape - Close expanded card/modal
    if (e.key === 'Escape') {
      onEscape?.();
      return;
    }
  }, [theme, setTheme, onSearch, onShowHelp, onCategoryChange, onEscape]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    shortcuts: [
      { keys: ['⌘', 'K'], description: 'Focus search' },
      { keys: ['⌘', '/'], description: 'Show shortcuts' },
      { keys: ['T'], description: 'Toggle theme' },
      { keys: ['1-5'], description: 'Switch category' },
      { keys: ['0'], description: 'Show all' },
      { keys: ['Esc'], description: 'Close/cancel' },
    ],
  };
}
