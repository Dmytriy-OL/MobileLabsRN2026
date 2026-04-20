// Твоя кастомна палітра кольорів
export const AppPalette = {
  light: {
    screenBg: '#F8F9FA',
    cardBg: '#FFFFFF',
    mainText: '#1A1A1A',
    mutedText: '#707070',
    accent: '#007AFF', // Стандартний iOS синій
    confirm: '#34C759',
    line: '#E5E5EA',
  },
  dark: {
    screenBg: '#000000',
    cardBg: '#1C1C1E',
    mainText: '#FFFFFF',
    mutedText: '#8E8E93',
    accent: '#0A84FF',
    confirm: '#30D158',
    line: '#38383A',
  }
};

// Експортуємо активну тему (для спрощення лаби можна використовувати тільки одну)
export const activeTheme = AppPalette.light;