import { useColorScheme as _useColorScheme, ColorSchemeName } from 'react-native';

export function useAppTheme(): NonNullable<ColorSchemeName> {
  const theme = _useColorScheme();
  
  return theme ?? 'light';
}