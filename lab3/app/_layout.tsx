import React from 'react';
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider } from "@/context/AppStatusContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <Stack 
          screenOptions={{ 
            headerShown: false,
            animation: 'fade_from_bottom', 
          }} 
        />
      </AppProvider>
    </GestureHandlerRootView>
  );
}