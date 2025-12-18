import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ArchitectState {
  isArchitect: boolean;
  showGate: boolean;
  setShowGate: (show: boolean) => void;
  checkPassword: (input: string) => boolean;
  logout: () => void;
}

const ArchitectContext = createContext<ArchitectState | undefined>(undefined);

const ARCHITECT_PASSWORD = "rootsbeforebranches";
const STORAGE_KEY = "whisperdeck_architect";
const LAST_POPUP_KEY = "whisperdeck_last_popup";

export function ArchitectProvider({ children }: { children: ReactNode }) {
  const [isArchitect, setIsArchitect] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });
  
  const [showGate, setShowGate] = useState(() => {
    // Show popup once daily for all users
    const lastPopup = localStorage.getItem(LAST_POPUP_KEY);
    const today = new Date().toDateString();
    
    if (lastPopup === today) {
      return false; // Already shown today
    }
    return true; // Show popup
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, isArchitect.toString());
  }, [isArchitect]);

  useEffect(() => {
    if (!showGate) {
      const today = new Date().toDateString();
      localStorage.setItem(LAST_POPUP_KEY, today);
    }
  }, [showGate]);

  const checkPassword = (input: string): boolean => {
    const isValid = input.toLowerCase().trim() === ARCHITECT_PASSWORD;
    if (isValid) {
      setIsArchitect(true);
    }
    return isValid;
  };

  const logout = () => {
    setIsArchitect(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ArchitectContext.Provider value={{ 
      isArchitect, 
      showGate, 
      setShowGate, 
      checkPassword,
      logout 
    }}>
      {children}
    </ArchitectContext.Provider>
  );
}

export function useArchitect() {
  const context = useContext(ArchitectContext);
  if (context === undefined) {
    throw new Error('useArchitect must be used within an ArchitectProvider');
  }
  return context;
}
