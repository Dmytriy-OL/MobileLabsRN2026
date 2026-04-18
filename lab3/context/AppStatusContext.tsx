import React, { createContext, useState, useContext } from 'react';

type AppContextType = {
  points: number;
  progress: {
    clicks: number;
    doubleHits: number;
    isLongPressed: boolean;
    isMoved: boolean;
    isRightSwiped: boolean;
    isLeftSwiped: boolean;
    isScaled: boolean;
  };
  isDark: boolean;
  switchTheme: () => void;
  updatePoints: (amount: number) => void;
  registerAction: (key: keyof AppContextType['progress']) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [progress, setProgress] = useState({
    clicks: 0,
    doubleHits: 0,
    isLongPressed: false,
    isMoved: false,
    isRightSwiped: false,
    isLeftSwiped: false,
    isScaled: false,
  });

  const updatePoints = (amount: number) => setPoints(prev => prev + amount);
  const registerAction = (key: keyof typeof progress) => {
    setProgress(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? true : (prev[key] as number) + 1
    }));
  };

  return (
    <AppContext.Provider value={{
      points, progress, isDark,
      switchTheme: () => setIsDark(!isDark),
      updatePoints,
      registerAction
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppState error');
  return context;
};