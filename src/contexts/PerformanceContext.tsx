import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type PerformanceMode = "high-quality" | "performance";

interface PerformanceContextType {
  mode: PerformanceMode;
  setMode: (mode: PerformanceMode) => void;
  isPerformanceMode: boolean;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PerformanceMode>(() => {
    const saved = localStorage.getItem("performance-mode");
    return (saved as PerformanceMode) || "high-quality";
  });

  const setMode = (newMode: PerformanceMode) => {
    setModeState(newMode);
    localStorage.setItem("performance-mode", newMode);
  };

  // Apply performance mode class to document
  useEffect(() => {
    if (mode === "performance") {
      document.documentElement.classList.add("performance-mode");
    } else {
      document.documentElement.classList.remove("performance-mode");
    }
  }, [mode]);

  return (
    <PerformanceContext.Provider
      value={{
        mode,
        setMode,
        isPerformanceMode: mode === "performance",
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
