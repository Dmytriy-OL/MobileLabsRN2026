import { useColorScheme } from 'react-native';
import { AppPalette } from '../store/UIConfig';

/**
 * Твій власний хук для отримання кольорів активної теми.
 * Він набагато простіший за дефолтний і працює з твоїм UIConfig.
 */
export function useAppTheme() {
  const systemTheme = useColorScheme() ?? 'light';
  
  // Повертаємо об'єкт кольорів для поточної теми
  return AppPalette[systemTheme];
}