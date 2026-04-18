import React, { createContext, useState, useContext, useCallback } from 'react';


type SortOption = 'name' | 'size' | 'date';

interface ExplorerState {
  viewMode: 'list' | 'grid';
  sortBy: SortOption;
  showHidden: boolean;
  history: string[];
  isDark: boolean;
  
  setSorting: (option: SortOption) => void;
  toggleView: () => void;
  toggleTheme: () => void;
  toggleHidden: () => void;
  addToHistory: (path: string) => void;
  clearHistory: () => void;
}

const ExplorerContext = createContext<ExplorerState | undefined>(undefined);

export const ExplorerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [showHidden, setShowHidden] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(false);

  const setSorting = useCallback((option: SortOption) => setSortBy(option), []);
  const toggleView = useCallback(() => setViewMode(prev => prev === 'list' ? 'grid' : 'list'), []);
  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);
  
  const toggleHidden = useCallback(() => setShowHidden(prev => !prev), []);

  const addToHistory = useCallback((path: string) => {
    setHistory(prev => {
      if (prev[prev.length - 1] === path) return prev;
      return [...prev, path].slice(-10);
    });
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return (
    <ExplorerContext.Provider value={{
      viewMode,
      sortBy,
      showHidden,
      history,
      isDark,
      setSorting,
      toggleView,
      toggleTheme,
      toggleHidden, 
      addToHistory,
      clearHistory
    }}>
      {children}
    </ExplorerContext.Provider>
  );
};

export const useExplorer = () => {
  const context = useContext(ExplorerContext);
  if (!context) {
    throw new Error('useExplorer must be used within an ExplorerProvider');
  }
  return context;
};