import React from 'react';
import { Platform } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as ExpoHaptics from 'expo-haptics';


export function TouchFeedbackTab(tabProps: BottomTabBarButtonProps) {
  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <PlatformPressable
      {...tabProps}
      onPressIn={(event) => {
        triggerHaptic();
        tabProps.onPressIn?.(event);
      }}
    />
  );
}