import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Універсальний компонент іконок.
 * Замість специфічних SymbolView (тільки для iOS),
 * ми використовуємо Ionicons, які працюють всюди.
 */
export function AppIcon({ 
  name, 
  size = 24, 
  color = '#000', 
  style 
}) {
  // Мапінг імен: якщо в коді друга використовуються назви SF Symbols (з крапками),
  // ми конвертуємо їх у назви Ionicons.
  const iconMap = {
    'chevron.right': 'chevron-forward',
    'house.fill': 'home',
    'paperplane.fill': 'send',
    'lock.fill': 'lock-closed',
    // додай інші, якщо зустрінеш у коді
  };

  const finalName = iconMap[name] || name;

  return (
    <View style={[styles.container, style]}>
      <Ionicons 
        name={finalName} 
        size={size} 
        color={color} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});