import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface FavoritesContextType {
  favoriteIds: Set<number>;
  toggleFavorite: (promptId: number) => void;
  isFavorite: (promptId: number) => boolean;
  getFavorites: () => number[];
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const STORAGE_KEY = 'whisperdeck_favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return new Set(parsed);
      }
    } catch (e) {
      console.error('Failed to parse favorites from localStorage:', e);
    }
    return new Set();
  });

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favoriteIds]));
    } catch (e) {
      console.error('Failed to save favorites to localStorage:', e);
    }
  }, [favoriteIds]);

  const toggleFavorite = useCallback((promptId: number) => {
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(promptId)) {
        newSet.delete(promptId);
      } else {
        newSet.add(promptId);
      }
      return newSet;
    });
  }, []);

  const isFavorite = useCallback((promptId: number) => {
    return favoriteIds.has(promptId);
  }, [favoriteIds]);

  const getFavorites = useCallback(() => {
    return [...favoriteIds];
  }, [favoriteIds]);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
        getFavorites,
        favoritesCount: favoriteIds.size,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
