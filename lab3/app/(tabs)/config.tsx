import React from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { useAppState } from '@/context/AppStatusContext';
import { Palette } from '../../constants/Colors';

export default function ConfigurationScreen() {
  const { isDark, switchTheme } = useAppState();
  const theme = isDark ? Palette.dark : Palette.light;

  return (
    <View style={[styles.mainWrapper, { backgroundColor: theme.background }]}>
      <View style={[styles.settingItem, { backgroundColor: theme.surface, borderColor: theme.outline }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.mainTitle, { color: theme.text }]}>Нічний режим</Text>
          <Text style={[styles.subDescription, { color: theme.subText }]}>
            Перемикач візуального оформлення
          </Text>
        </View>
        
        <Switch
          value={isDark}
          onValueChange={switchTheme}
          trackColor={{ false: '#ced4da', true: theme.accent }}
          thumbColor={Platform.OS === 'ios' ? undefined : (isDark ? '#fff' : '#f4f3f4')}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    padding: 24,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subDescription: {
    fontSize: 13,
    fontWeight: '500',
  },
});