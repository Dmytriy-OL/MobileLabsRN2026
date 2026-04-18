import { useAppState } from '@/context/AppStatusContext';
import { Palette, AppTheme } from '@/constants/Colors';


export function useAppTheme(): AppTheme {
  const { isDark } = useAppState();
  
  return isDark ? Palette.dark : Palette.light;
}