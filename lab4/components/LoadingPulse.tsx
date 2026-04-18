import React, { useEffect } from 'react';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';


export const LoadingPulse = () => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 400 }),
        withTiming(1, { duration: 400 })
      ),
      -1, 
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: 1.5 - scale.value, 
  }));

  return (
    <Animated.View style={[animatedStyle, { padding: 5 }]}>
      <Animated.Text style={{ fontSize: 24 }}>
        🔍
      </Animated.Text>
    </Animated.View>
  );
};