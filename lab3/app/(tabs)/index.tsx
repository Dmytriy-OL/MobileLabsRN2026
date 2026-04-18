import React from 'react';
import { StyleSheet, View, Text } from 'react-native'; 
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  runOnJS 
} from 'react-native-reanimated';

import { useAppState } from '@/context/AppStatusContext'; 
import { Palette } from '@/constants/Colors';

export default function GamePortal() {
  const { points, updatePoints, registerAction, isDark } = useAppState();
  const theme = isDark ? Palette.dark : Palette.light;

  const deltaX = useSharedValue(0);
  const deltaY = useSharedValue(0);
  const activeScale = useSharedValue(1);


  const singleTap = Gesture.Tap().onEnd(() => {
    runOnJS(updatePoints)(1);
    runOnJS(registerAction)('clicks');
  });

  const doubleTap = Gesture.Tap().numberOfTaps(2).onEnd(() => {
    runOnJS(updatePoints)(5);
    runOnJS(registerAction)('doubleHits');
  });

  const longPress = Gesture.LongPress().minDuration(2500).onEnd(() => {
    runOnJS(updatePoints)(25); 
    runOnJS(registerAction)('isLongPressed');
  });

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      deltaX.value = event.translationX;
      deltaY.value = event.translationY;
    })
    .onEnd(() => {
      deltaX.value = withSpring(0);
      deltaY.value = withSpring(0);
      runOnJS(registerAction)('isMoved');
    });

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      activeScale.value = event.scale;
    })
    .onEnd(() => {
      activeScale.value = withSpring(1);
      runOnJS(registerAction)('isScaled');
    });

  const composedGesture = Gesture.Race(
    Gesture.Simultaneous(pan, pinch),
    Gesture.Exclusive(doubleTap, singleTap, longPress)
  );

  const dynamicStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: deltaX.value },
      { translateY: deltaY.value },
      { scale: activeScale.value },
    ],
  }));

  return (
    <View style={[styles.mainLayout, { backgroundColor: theme.background }]}>
      <View style={[styles.statHeader, { backgroundColor: theme.surface }]}>
        <Text style={[styles.pointsText, { color: theme.accent }]}>{points}</Text>
        <Text style={styles.subTitle}>SCORE</Text>
      </View>
      
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.interactiveNode, { backgroundColor: theme.accent }, dynamicStyles]}>
          <Text style={styles.nodeInput}>TOUCH</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 50,
  },
  statHeader: {
    width: '80%',
    padding: 25,
    borderRadius: 40,
    alignItems: 'center',
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  pointsText: {
    fontSize: 65,
    fontWeight: '800',
  },
  subTitle: {
    fontSize: 14,
    color: '#999',
    letterSpacing: 4,
    fontWeight: 'bold',
  },
  interactiveNode: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  nodeInput: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});