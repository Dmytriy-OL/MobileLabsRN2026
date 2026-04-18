export const appLightTheme = {
  background: '#F8F9FA',
  surface: '#FFFFFF',    
  textMain: '#1A1A1A',   
  textMuted: '#707070',  
  accent: '#007AFF',     
  success: '#34C759',    
  divider: '#E5E5EA',    
};

export const appDarkTheme = {
  background: '#1C1C1E', 
  surface: '#2C2C2E',
  textMain: '#F2F2F7',
  textMuted: '#8E8E93',
  accent: '#0A84FF',
  success: '#30D158',
  divider: '#38383A',
};

export const Colors = {
  light: {
    ...appLightTheme, 
  
    text: appLightTheme.textMain,
    background: appLightTheme.background,
    tint: appLightTheme.accent,
    icon: appLightTheme.textMuted,
    tabIconDefault: '#999',
    tabIconSelected: appLightTheme.accent,
  },
  dark: {
    ...appDarkTheme, 
    text: appDarkTheme.textMain,
    background: appDarkTheme.background,
    tint: appDarkTheme.accent,
    icon: appDarkTheme.textMuted,
    tabIconDefault: '#666',
    tabIconSelected: appDarkTheme.accent,
  },
};