import { type BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as ExpoHaptics from 'expo-haptics';
import { Platform } from 'react-native';



export const TabFeedbackButton = (props: BottomTabBarButtonProps) => {
  const handlePressIn = (event: any) => {
    if (Platform.OS === 'ios') {
      ExpoHaptics.impactAsync(ExpoHaptics.ImpactFeedbackStyle.Light)
        .catch(() => {  });
    }
    
    props.onPressIn?.(event);
  };

  return (
    <PlatformPressable
      {...props}
      onPressIn={handlePressIn}
    />
  );
};