import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GamificationState {
  dailyCopiesRemaining: number;
  copiesUsedToday: number;
  lastResetTimestamp: string;
  totalPromptsUsed: Set<number>;
  promptUsageCount: Map<number, number>;
  currentLevel: 0 | 1 | 2 | 3 | 4;
  unlockedCategories: Set<string>;
  challengesCompleted: string[];
  chainsBuilt: number;
}

interface GamificationContextType extends GamificationState {
  useCopy: () => boolean;
  usePrompt: (promptId: number) => void;
  completeChallenge: (challengeId: string) => void;
  buildChain: () => void;
  resetIfNeeded: () => void;
  getTimeUntilReset: () => string;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const MAX_DAILY_COPIES = 5;
const STORAGE_KEY = 'whisperdeck_gamification';

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GamificationState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        totalPromptsUsed: new Set(parsed.totalPromptsUsed || []),
        promptUsageCount: new Map(parsed.promptUsageCount || []),
        unlockedCategories: new Set(parsed.unlockedCategories || ['Advanced', 'Strategy', 'Analysis', 'Creativity', 'Psychology']),
      };
    }
    return {
      dailyCopiesRemaining: MAX_DAILY_COPIES,
      copiesUsedToday: 0,
      lastResetTimestamp: new Date().toISOString(),
      totalPromptsUsed: new Set<number>(),
      promptUsageCount: new Map<number, number>(),
      currentLevel: 0,
      unlockedCategories: new Set(['Advanced', 'Strategy', 'Analysis', 'Creativity', 'Psychology']),
      challengesCompleted: [],
      chainsBuilt: 0,
    };
  });

  const resetIfNeeded = () => {
    const now = new Date();
    const lastReset = new Date(state.lastResetTimestamp);
    const hoursSinceReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);

    if (hoursSinceReset >= 24) {
      setState(prev => ({
        ...prev,
        dailyCopiesRemaining: MAX_DAILY_COPIES,
        copiesUsedToday: 0,
        lastResetTimestamp: now.toISOString(),
      }));
    }
  };

  const getTimeUntilReset = (): string => {
    const now = new Date();
    const lastReset = new Date(state.lastResetTimestamp);
    const resetTime = new Date(lastReset.getTime() + 24 * 60 * 60 * 1000);
    const msUntilReset = resetTime.getTime() - now.getTime();

    if (msUntilReset <= 0) return '0h 0m';

    const hours = Math.floor(msUntilReset / (1000 * 60 * 60));
    const minutes = Math.floor((msUntilReset % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const useCopy = (): boolean => {
    if (state.dailyCopiesRemaining <= 0) return false;

    setState(prev => ({
      ...prev,
      dailyCopiesRemaining: prev.dailyCopiesRemaining - 1,
      copiesUsedToday: prev.copiesUsedToday + 1,
    }));
    return true;
  };

  const usePrompt = (promptId: number) => {
    setState(prev => {
      const newUsed = new Set(prev.totalPromptsUsed);
      newUsed.add(promptId);

      const newCount = new Map(prev.promptUsageCount);
      newCount.set(promptId, (newCount.get(promptId) || 0) + 1);

      // Calculate level based on usage
      let newLevel: 0 | 1 | 2 | 3 | 4 = 0;
      const totalUsed = newUsed.size;
      const chains = prev.chainsBuilt;
      const challenges = prev.challengesCompleted.length;

      if (chains >= 10 && challenges >= 5) newLevel = 4;
      else if (challenges >= 3) newLevel = 3;
      else if (chains >= 5) newLevel = 2;
      else if (totalUsed >= 10) newLevel = 1;

      return {
        ...prev,
        totalPromptsUsed: newUsed,
        promptUsageCount: newCount,
        currentLevel: newLevel,
      };
    });
  };

  const completeChallenge = (challengeId: string) => {
    setState(prev => ({
      ...prev,
      challengesCompleted: [...prev.challengesCompleted, challengeId],
    }));
  };

  const buildChain = () => {
    setState(prev => ({
      ...prev,
      chainsBuilt: prev.chainsBuilt + 1,
    }));
  };

  // Persist state to localStorage
  useEffect(() => {
    const toStore = {
      ...state,
      totalPromptsUsed: Array.from(state.totalPromptsUsed),
      promptUsageCount: Array.from(state.promptUsageCount),
      unlockedCategories: Array.from(state.unlockedCategories),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }, [state]);

  // Check for reset on mount and periodically
  useEffect(() => {
    resetIfNeeded();
    const interval = setInterval(resetIfNeeded, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <GamificationContext.Provider
      value={{
        ...state,
        useCopy,
        usePrompt,
        completeChallenge,
        buildChain,
        resetIfNeeded,
        getTimeUntilReset,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within GamificationProvider');
  return context;
}
