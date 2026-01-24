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
const SESSION_DATE_KEY = "whisperdeck_architect_date";
const LAST_POPUP_KEY = "whisperdeck_last_popup";

export function ArchitectProvider({ children }: { children: ReactNode }) {
  const [isArchitect, setIsArchitect] = useState(() => {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    const storedDate = localStorage.getItem(SESSION_DATE_KEY);
    const today = new Date().toDateString();
    
    // Expire architect session if it's a new day
    if (storedDate !== today) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SESSION_DATE_KEY);
      return false;
    }
    return storedValue === 'true';
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
    if (isArchitect) {
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem(SESSION_DATE_KEY, new Date().toDateString());
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SESSION_DATE_KEY);
    }
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
    localStorage.removeItem(SESSION_DATE_KEY);
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
