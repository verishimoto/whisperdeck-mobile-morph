import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface ArchitectState {
  isArchitect: boolean;
  isArchitectByEmail: boolean;
  isArchitectByPassword: boolean;
  showGate: boolean;
  setShowGate: (show: boolean) => void;
  checkPassword: (input: string) => Promise<boolean>;
  logout: () => void;
}

const ArchitectContext = createContext<ArchitectState | undefined>(undefined);

// SHA-256 digest of the architect passphrase — no plaintext in source
const ARCHITECT_HASH = "83e3d8885cb4a712c39b6f735bec4896f53299125f32970686253553ed4c9176";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const ARCHITECT_EMAIL = "vg.contato@gmail.com";
const STORAGE_KEY = "whisperdeck_architect";
const SESSION_DATE_KEY = "whisperdeck_architect_date";

export function ArchitectProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  const isArchitectByEmail = user?.email === ARCHITECT_EMAIL;
  
  const [isArchitectByPassword, setIsArchitectByPassword] = useState(() => {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    const storedDate = localStorage.getItem(SESSION_DATE_KEY);
    const today = new Date().toDateString();
    
    if (storedDate !== today) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SESSION_DATE_KEY);
      return false;
    }
    return storedValue === 'true';
  });
  
  const isArchitect = isArchitectByEmail || isArchitectByPassword;
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    if (isArchitectByPassword) {
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem(SESSION_DATE_KEY, new Date().toDateString());
    }
  }, [isArchitectByPassword]);

  const checkPassword = async (input: string): Promise<boolean> => {
    const inputHash = await sha256(input);
    const isValid = inputHash === ARCHITECT_HASH;
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
