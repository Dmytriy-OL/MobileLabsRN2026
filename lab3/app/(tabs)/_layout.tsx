import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppState } from '@/context/AppStatusContext';
import { Palette } from '../../constants/Colors';

export default function NavigationLayout() {
  const { isDark } = useAppState();
  const ui = isDark ? Palette.dark : Palette.light;

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: ui.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: ui.outline,
          height: 100,
        },
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 22,
          letterSpacing: 0.5,
          color: ui.text,
        },
        headerTitleAlign: 'center',

        tabBarStyle: {
          backgroundColor: ui.surface,
          borderTopWidth: 1,
          borderTopColor: ui.outline,
          height: 70,
          paddingBottom: 10,
          position: 'absolute',
          bottom: 0,
          elevation: 20,
        },
        tabBarActiveTintColor: ui.accent,
        tabBarInactiveTintColor: ui.subText,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Гра',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="target" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats" 
        options={{
          title: 'Місії',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-check-outline" size={size + 4} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Опції',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tune" size={size + 4} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}