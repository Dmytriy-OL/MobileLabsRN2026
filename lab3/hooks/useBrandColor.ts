import { Palette, AppTheme } from '@/constants/Colors';
// ВИПРАВЛЕНО: Тільки AppStatusContext!
import { useAppState } from '@/context/AppStatusContext'; 

/**
 * Спеціалізований хук для отримання кольорів бренду.
 * Дозволяє перевизначати системні кольори через пропси компонента.
 */
export function useBrandColor(
  overrideProps: { light?: string; dark?: string },
  colorKey: keyof AppTheme
) {
  const { isDark } = useAppState();
  const themeMode = isDark ? 'dark' : 'light';
  
  const customColor = overrideProps[themeMode];

  if (customColor) {
    return customColor;
  }
  
  return Palette[themeMode][colorKey];
}