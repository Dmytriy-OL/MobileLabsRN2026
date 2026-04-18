export const Palette = {
  light: {
    background: '#F8F9FA',
    surface: '#FFFFFF',    
    text: '#212529',       
    subText: '#6C757D',    
    accent: '#4361EE',     
    success: '#38B000',   
    outline: '#DEE2E6',   
  },
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#E9ECEF',
    subText: '#ADB5BD',
    accent: '#4CC9F0',
    success: '#38B000',
    outline: '#333333',
  },
};

export type AppTheme = typeof Palette.light;
export type ThemeMode = 'light' | 'dark';