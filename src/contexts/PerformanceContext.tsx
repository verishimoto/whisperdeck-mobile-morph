import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useFrameRateDetector, PerformanceLevel } from "@/hooks/useFrameRateDetector";

type PerformanceMode = "high-quality" | "performance";

interface PerformanceContextType {
  mode: PerformanceMode;
  performanceLevel: PerformanceLevel;
  autoDetect: boolean;
  fps: number;
  isStable: boolean;
  setMode: (mode: PerformanceMode) => void;
  setAutoDetect: (enabled: boolean) => void;
  isPerformanceMode: boolean;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

const STORAGE_KEY = "whisperdeck_performance";

interface StoredState {
  mode: PerformanceMode;
  autoDetect: boolean;
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return { mode: "high-quality", autoDetect: true };
      }
    }
    return { mode: "high-quality", autoDetect: true };
  });

  // Only run frame rate detection when autoDetect is enabled
  const { fps, performanceLevel, isStable } = useFrameRateDetector({
    enabled: state.autoDetect,
    sampleInterval: 2000,
    checkInterval: 10000,
    stabilityThreshold: 3,
  });

  // Auto-switch mode based on detected performance
  useEffect(() => {
    if (!state.autoDetect || !isStable) return;

    // Only auto-switch if consistently detecting poor performance
    if (performanceLevel === "critical" || performanceLevel === "low") {
      if (state.mode !== "performance") {
        setState(prev => ({ ...prev, mode: "performance" }));
      }
    }
  }, [performanceLevel, isStable, state.autoDetect, state.mode]);

  // Apply CSS classes based on performance level and mode
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all performance classes first
    root.classList.remove(
      "performance-mode",
      "performance-mode-high",
      "performance-level-high", 
      "performance-level-medium", 
      "performance-level-low", 
      "performance-level-critical"
    );
    
    if (state.mode === "performance") {
      root.classList.add("performance-mode");
      if (performanceLevel === "high") {
        root.classList.add("performance-mode-high");
      }
    }
    
    // Add level-specific class for graduated effects
    root.classList.add(`performance-level-${performanceLevel}`);
  }, [state.mode, performanceLevel]);

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setMode = useCallback((mode: PerformanceMode) => {
    setState(prev => ({ ...prev, mode }));
  }, []);

  const setAutoDetect = useCallback((enabled: boolean) => {
    setState(prev => ({ ...prev, autoDetect: enabled }));
  }, []);

  const isPerformanceMode = state.mode === "performance";

  return (
    <PerformanceContext.Provider
      value={{
        mode: state.mode,
        performanceLevel,
        autoDetect: state.autoDetect,
        fps,
        isStable,
        setMode,
        setAutoDetect,
        isPerformanceMode,
      }}
    >
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error("usePerformance must be used within a PerformanceProvider");
  }
  return context;
}
