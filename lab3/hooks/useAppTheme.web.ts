import { useEffect, useState } from 'react';
import { useAppState } from '@/context/AppStatusContext'; 
import { Palette, AppTheme } from '@/constants/Colors';

export function useAppTheme(): AppTheme {
  const [isReady, setIsReady] = useState(false);
  const { isDark } = useAppState();

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return Palette.light;
  }

  return isDark ? Palette.dark : Palette.light;
}