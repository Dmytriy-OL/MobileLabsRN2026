import { Palette } from './Colors'; 

type AppThemeType = typeof Palette.light;

declare global {
  namespace ReactNavigation {
    interface Theme {
      dark: boolean;
      colors: AppThemeType;
    }
  }
}

export type { AppThemeType };