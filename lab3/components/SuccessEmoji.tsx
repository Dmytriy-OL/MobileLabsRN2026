import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  withSpring 
} from 'react-native-reanimated';

export function SuccessEmoji() {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 150 }),
        withTiming(10, { duration: 150 })
      ),
      -1, 
      true 
    );

    scale.value = withRepeat(
      withSpring(1.2),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value }
    ],
  }));

  return (
    <Animated.Text style={[{ fontSize: 32, textAlign: 'center' }, animatedStyle]}>
      🏆
    </Animated.Text>
  );
}