import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface ArchitectState {
  isArchitect: boolean;
  isArchitectByEmail: boolean;
  isArchitectByPassword: boolean;
  showGate: boolean;
  setShowGate: (show: boolean) => void;
  checkPassword: (input: string) => boolean;
  logout: () => void;
}

const ArchitectContext = createContext<ArchitectState | undefined>(undefined);

const ARCHITECT_PASSWORD = "rootsbeforebranches";
const ARCHITECT_EMAIL = "vg.contato@gmail.com";
const STORAGE_KEY = "whisperdeck_architect";
const SESSION_DATE_KEY = "whisperdeck_architect_date";

export function ArchitectProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  // Auto-detect architect by email
  const isArchitectByEmail = user?.email === ARCHITECT_EMAIL;
  
  const [isArchitectByPassword, setIsArchitectByPassword] = useState(() => {
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
  
  // Combined architect status - email OR password
  const isArchitect = isArchitectByEmail || isArchitectByPassword;
  
  // Only show gate when manually triggered, never on load
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    if (isArchitectByPassword) {
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem(SESSION_DATE_KEY, new Date().toDateString());
    }
  }, [isArchitectByPassword]);

  const checkPassword = (input: string): boolean => {
    const isValid = input.toLowerCase().trim() === ARCHITECT_PASSWORD;
    if (isValid) {
      setIsArchitectByPassword(true);
    }
    return isValid;
  };

  const logout = () => {
    setIsArchitectByPassword(false);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_DATE_KEY);
  };

  return (
    <ArchitectContext.Provider value={{ 
      isArchitect,
      isArchitectByEmail,
      isArchitectByPassword, 
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
