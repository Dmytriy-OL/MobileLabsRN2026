/**
 * Конфігурація ESLint для підтримки стандартів коду в проекті.
 * Базується на пресеті Expo з додаванням кастомних обмежень.
 */

const { defineConfig } = require('eslint/config');
const expoFlatConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoFlatConfig,
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Попереджати про забуті console.log
      'quotes': ['error', 'single'], // Вимагати одинарні лапки (виглядає як твій стиль)
      'prefer-const': 'error', // Вимагати const замість let там, де це можливо
    },
  },
  {
    // Список ігнорування
    ignores: [
      'dist/*', 
      '.expo/*', 
      'node_modules/*',
      'babel.config.js',
      'metro.config.js'
    ],
  },
]);