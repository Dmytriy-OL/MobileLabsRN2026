import { Platform } from 'react-native';
import { Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

export function TabFeedback(props) {
  return (
    <Pressable
      {...props}
      onPressIn={(ev) => {
        // Вібровідгук тільки для iOS та Android (якщо підтримується)
        if (Platform.OS !== 'web') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}